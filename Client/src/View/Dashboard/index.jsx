import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledDashboard } from './styled';

import ConversationHistory from '@Components/ConversationHistory';
import LoadingIndicator from '@Components/LoadingIndicator';
import MessageInput from '@Components/MessageInput';
import SettingModal from '@Components/Modal/SettingModal';

import { openModal, setModalData } from '@Store/ModalSlice';

import { addCommand } from '@Store/DashboardStateSlice';

import { usePacket } from '@Hooks/usePacket';
import { UPDATE_TYPE, updateConversations } from '@Store/ConversationSlice';
import { endLoading, startLoading } from '@Store/LoadingStateSlice';
import { EVENT_TYPE, socket } from '@Utils/socket';

const Dashboard = ({ uid }) => {
  const storeDispatch = useDispatch();

  // const { fetchingState, dataDispatch } = useDataFetcher();
  const { alwaysOn, onceOn, sendPacket } = usePacket();
  const { isLoading } = useSelector((state) => state.LoadingStateSlice);

  const { loadedConversations, currentPage } = useSelector((state) => state.ConversationSlice);
  const { userName, userPassword, userProfile } = useSelector((state) => state.UserAuthSlice);

  const { isModalOpen, modalComponent } = useSelector((state) => state.ModalSlice);

  const addedMessageCount = useRef(0);

  const updateConversation = (type, data) =>
    storeDispatch(updateConversations({ updateType: type, messageData: data }));

  const onMessage = (data) => {
    console.log(`${data.userName}(${data.uid})가 보냈다잉: `, data);

    updateConversation(UPDATE_TYPE.MESSAGE_ADDED, data);
    addedMessageCount.current++;
  };

  const onMessageDelete = (message) => {
    console.log('메시지 삭제: ', message);
    updateConversation(UPDATE_TYPE.MESSAGE_DELETED, message._id);
    addedMessageCount.current--;
  };

  const onMessageUpdate = (message) => {
    console.log('리액션 추가', message);
    updateConversation(UPDATE_TYPE.REACTION_UPDATED, message);
  };

  const onConnect = () => {
    console.log('내 socket.id: ', socket.id);

    onceOn(EVENT_TYPE.HISTORY_LOAD, { currentPage });
  };

  const onUserEnter = (userId) => {
    console.log(`${userId}가 들어왔다잉`);
  };

  const onUserLeave = (userId) => {
    console.log(`${userId}가 떠났다잉ㅠ`);
  };

  const onHistoryLoad = (result) => {
    console.log('히스토리가 도착했어요: ', result);

    updateConversation(UPDATE_TYPE.HISTORY_LOADED, result);
    storeDispatch(endLoading());
  };

  useEffect(() => {
    alwaysOn(EVENT_TYPE.CONNECT, onConnect);
    alwaysOn(EVENT_TYPE.MESSAGE, onMessage);
    alwaysOn(EVENT_TYPE.MESSAGE_DELETE, onMessageDelete);
    alwaysOn(EVENT_TYPE.MESSAGE_UPDATE, onMessageUpdate);
    alwaysOn(EVENT_TYPE.USER_ENTER, onUserEnter);
    alwaysOn(EVENT_TYPE.USER_LEAVE, onUserLeave);
  }, []);

  useEffect(() => {
    storeDispatch(startLoading());

    onceOn(
      EVENT_TYPE.HISTORY_LOAD,
      { currentPage, newCount: addedMessageCount.current },
      onHistoryLoad
    );

    // dataDispatch(DISPATCH_TYPE.GET_HISTORY_BY_PAGE, dispatchCallbacks, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSubmit = ({ messageType, message, replyData }) => {
    console.log(messageType, message, replyData);

    if (message === '/setting') {
      storeDispatch(setModalData({ modalTitle: '설정', modalComponent: <SettingModal /> }));
      storeDispatch(openModal());
      storeDispatch(addCommand('modal-show'));

      return;
    }

    const messagePacket = {
      uid,
      userName,
      userPassword,
      userProfile,
      commentType: messageType,
      commentDate: new Date(),
      commentContent: message,
      commentReply: replyData,
    };

    sendPacket(EVENT_TYPE.MESSAGE, messagePacket);
  };

  return (
    <StyledDashboard.Container>
      <ConversationHistory conversations={loadedConversations} />
      <MessageInput onSubmit={handleSubmit} />
      {/* {fetchingState.isLoading && <LoadingIndicator />} */}
      {isLoading && <LoadingIndicator />}
      {isModalOpen && modalComponent}
    </StyledDashboard.Container>
  );
};

export default Dashboard;
