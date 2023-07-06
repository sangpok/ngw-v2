import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledConversationHistory } from './styled.jsx';

import ChatMessage from '@/Components/ChatMessage/';

import { nextPage } from '@Store/ConversationSlice.js';
import { closeHoverMenu, removeCommand, setReplyData } from '@Store/DashboardStateSlice.js';
import { closeModal } from '@Store/ModalSlice.js';
import { startLoading } from '@Store/LoadingStateSlice.js';

const { Container, NoConversation, NoConversationWrapper } = StyledConversationHistory;

const ConversationHistory = ({ conversations }) => {
  const storeDispatch = useDispatch();

  const { uid } = useSelector((state) => state.UserAuthSlice);
  const { isLoading } = useSelector((state) => state.LoadingStateSlice);

  const lastMessageId = useRef(null);
  const prevConversations = useRef([]);
  const fetchLoading = useRef(false);
  const containerRef = useRef(null);

  const { currentHoverMessageId, hoverSubMenuOpened, lastCommands } = useSelector(
    (state) => state.DashboardStateSlice
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    fetchLoading.current = false;

    if (!prevConversations.current || !prevConversations.current.length) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      prevConversations.current = conversations;
      lastMessageId.current = conversations[0]._id;
      return;
    }

    if (conversations.length - prevConversations.current.length === 1) {
      if (conversations.at(-1).uid === uid) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      } else {
        // 남이 보낸 거
      }

      prevConversations.current = conversations;
      lastMessageId.current = conversations[0]._id;
      return;
    }

    // 히스토리 불러온 케이스
    const savTop = parent.document.documentElement.scrollTop;
    // document.getElementById('elementID').scrollIntoView();
    document.querySelector(`[data-message-id='${lastMessageId.current}']`).scrollIntoView();
    parent.document.documentElement.scrollTop = savTop;

    lastMessageId.current = conversations[0]._id;
    prevConversations.current = conversations;
  }, [conversations]);

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

  const handleWheel = (event) => {
    let scrollPos = containerRef.current.scrollTop;

    if (scrollPos === 0 && !fetchLoading.current) {
      fetchLoading.current = true;
      storeDispatch(startLoading());
      storeDispatch(nextPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

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
      <Container onClick={handleClick} ref={containerRef}>
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
