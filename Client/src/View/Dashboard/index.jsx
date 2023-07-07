import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledDashboard } from './styled';

import ConversationHistory from '@Components/ConversationHistory';
import MessageInput from '@Components/MessageInput';
import LoadingIndicator from '@Components/LoadingIndicator';
import SettingModal from '@Components/Modal/SettingModal';

import { updateConversationHistory } from '@Store/ConversationSlice';
import { openModal, setModalData } from '@Store/ModalSlice';

import useDataFetcher, { DISPATCH_TYPE } from '@Hooks/useDataFetcher';
import { addCommand } from '@Store/DashboardStateSlice';

import { EVENT_TYPE, socket } from '@Utils/socket';
import { startLoading, endLoading } from '@Store/LoadingStateSlice';

const Dashboard = ({ uid }) => {
  const storeDispatch = useDispatch();

  // const { fetchingState, dataDispatch } = useDataFetcher();
  const { isLoading } = useSelector((state) => state.LoadingStateSlice);

  const { loadedConversations, currentPage } = useSelector((state) => state.ConversationSlice);
  const { userName, userPassword, userProfile } = useSelector((state) => state.UserAuthSlice);

  const { isModalOpen, modalComponent } = useSelector((state) => state.ModalSlice);

  // const dispatchCallbacks = {
  //   onSuccess: (dispatchType, response) =>
  //     storeDispatch(updateConversationHistory({ dispatchType, response })),
  //   onError: (dispatchType, error) => console.log(error),
  // };

  useEffect(() => {
    const onConnect = () => {
      console.log('내 socket.id: ', socket.id);

      socket.emit(EVENT_TYPE.HISTORY_LOAD, { currentPage });
    };

    const onMessage = (data) => {
      console.log(`${data.userName}(${data.uid})가 보냈다잉: `, data);

      storeDispatch(updateConversationHistory({ dispatchType: 0, response: { comment: data } }));
    };

    const onUserEnter = (userId) => {
      console.log(`${userId}가 들어왔다잉`);
    };

    const onUserLeave = (userId) => {
      console.log(`${userId}가 떠났다잉ㅠ`);
    };

    const onHistoryLoad = (data) => {
      console.log('히스토리가 도착했어요: ', data);

      storeDispatch(
        updateConversationHistory({
          dispatchType: DISPATCH_TYPE.GET_HISTORY_BY_PAGE,
          response: data.comments,
        })
      );

      storeDispatch(endLoading());
    };

    socket.on(EVENT_TYPE.CONNECT, onConnect);
    socket.on(EVENT_TYPE.MESSAGE, onMessage);
    socket.on(EVENT_TYPE.USER_ENTER, onUserEnter);
    socket.on(EVENT_TYPE.USER_LEAVE, onUserLeave);
    socket.on(EVENT_TYPE.HISTORY_LOAD, onHistoryLoad);
  }, []);

  useEffect(() => {
    storeDispatch(startLoading());
    socket.emit(EVENT_TYPE.HISTORY_LOAD, { currentPage });
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

    socket.emit('message', {
      uid,
      userName,
      userPassword,
      userProfile,
      commentType: messageType,
      commentDate: new Date(),
      commentContent: message,
      commentReply: replyData,
    });

    // storeDispatch();
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
