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

const Dashboard = ({ uid }) => {
  const storeDispatch = useDispatch();

  const { fetchingState, dataDispatch } = useDataFetcher();

  const { loadedConversations } = useSelector((state) => state.ConversationSlice);
  const { currentPage } = useSelector((state) => state.ConversationSlice);

  const { isModalOpen, modalComponent } = useSelector((state) => state.ModalSlice);
  // const [modalShow, setModalShow] = useState(false);

  const dispatchCallbacks = {
    onSuccess: (dispatchType, response) =>
      storeDispatch(updateConversationHistory({ dispatchType, response })),
    onError: (dispatchType, error) => console.log(error),
  };

  useEffect(() => {
    dataDispatch(DISPATCH_TYPE.GET_HISTORY_BY_PAGE, dispatchCallbacks, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSubmit = ({ messageType, message, replyData }) => {
    console.log(messageType, message, replyData);

    if (message === '/setting') {
      storeDispatch(setModalData({ modalTitle: '설정', modalComponent: <SettingModal /> }));
      storeDispatch(openModal());
      storeDispatch(addCommand('modal-show'));
    }
  };

  return (
    <StyledDashboard.Container>
      <ConversationHistory conversations={loadedConversations} />
      <MessageInput onSubmit={handleSubmit} />
      {fetchingState.isLoading && <LoadingIndicator />}
      {isModalOpen && modalComponent}
    </StyledDashboard.Container>
  );
};

export default Dashboard;
