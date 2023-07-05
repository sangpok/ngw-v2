import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledConversationHistory } from './styled.jsx';

import ChatMessage from '@/Components/ChatMessage/';

import { closeHoverMenu, removeCommand, setReplyData } from '@Store/DashboardStateSlice.js';
import { closeModal } from '@Store/ModalSlice.js';

const { Container, NoConversation, NoConversationWrapper } = StyledConversationHistory;

const ConversationHistory = ({ conversations }) => {
  const storeDispatch = useDispatch();

  const { currentHoverMessageId, hoverSubMenuOpened, lastCommands } = useSelector(
    (state) => state.DashboardStateSlice
  );

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.code === 'Escape') {
        const lastCommand = lastCommands.at(-1);

        if (lastCommand === 'hover-submenu-clicked') {
          storeDispatch(closeHoverMenu());
          storeDispatch(removeCommand('hover-submenu-clicked'));
        }

        if (lastCommand === 'reply') {
          storeDispatch(setReplyData(null));
          storeDispatch(removeCommand('reply'));
        }

        if (lastCommand === 'modal-show') {
          storeDispatch(closeModal());
          storeDispatch(removeCommand('modal-show'));
        }
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [lastCommands]);

  const handleClick = (e) => {
    const clickedComponent = e.target.closest('[data-component-name]');

    // 만약 모바일이면 message일 때 띄우기

    const canBeClosed =
      clickedComponent?.dataset.componentName === 'message' &&
      (clickedComponent.dataset.messageId !== currentHoverMessageId || hoverSubMenuOpened);

    if (!clickedComponent || canBeClosed) {
      storeDispatch(closeHoverMenu());
      storeDispatch(removeCommand('hover-submenu-clicked'));
    }
  };

  if (conversations.length !== 0) {
    return (
      <Container onClick={handleClick}>
        {conversations.map((conversation) => (
          <ChatMessage key={conversation._id} conversation={conversation} />
        ))}
      </Container>
    );
  }

  return (
    <Container onClick={handleClick}>
      <NoConversationWrapper>
        <NoConversation>첫 번째 방명록을 남겨보세요! 🥳</NoConversation>
      </NoConversationWrapper>
    </Container>
  );
};

export default ConversationHistory;
