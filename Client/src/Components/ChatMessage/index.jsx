import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledChatMessage } from './styled';

import HoverMenu from '@Components/HoverMenu';
import ReactionBadge from '@Components/ReactionBadge';
import MessageContent from './MessageContent';
import ReplyContent from './ReplyContent';

import { addCommand, setCurrentHoverMessageId } from '@Store/DashboardStateSlice';

import { currentRelativeTime } from '@Utils';
import { openModal, setModalData } from '@Store/ModalSlice';
import ProfileModal from '@Components/Modal/ProfileModal';

const { UserProfile, MessageWrapper, InfoWrapper, Group, Name, ChatDate, ReactionBadgeWrapper } =
  StyledChatMessage;

const ChatMessage = ({ conversation }) => {
  const {
    _id,
    commentReply,
    commentContent,
    commentType,
    commentDate,
    userName,
    userProfile,
    commentReactions,
  } = conversation;

  const { currentHoverMessageId, hoverSubMenuOpened } = useSelector(
    (state) => state.DashboardStateSlice
  );

  const storeDispatch = useDispatch();

  const handleMouseOver = () => {
    if (!hoverSubMenuOpened && currentHoverMessageId !== _id) {
      storeDispatch(setCurrentHoverMessageId(_id));
    }
  };

  const handleMouseLeave = () => {
    if (!hoverSubMenuOpened && currentHoverMessageId) {
      storeDispatch(setCurrentHoverMessageId(null));
    }
  };

  const handleProfileClick = () => {
    storeDispatch(
      setModalData({
        modalTitle: `${userName}님의 프로필 사진`,
        modalComponent: <ProfileModal profileSrc={userProfile} />,
      })
    );
    storeDispatch(openModal());
    storeDispatch(addCommand('modal-show'));
  };

  return (
    <MessageWrapper
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      data-message-id={_id}
    >
      <UserProfile src={userProfile} onClick={handleProfileClick} />
      <InfoWrapper>
        <Group>
          <Name>{userName}</Name>
          <ChatDate>{currentRelativeTime(commentDate)}</ChatDate>
        </Group>

        {commentReply && <ReplyContent replyData={commentReply} />}

        <MessageContent type={commentType} content={commentContent} name={userName} />

        {commentReactions && commentReactions.length !== 0 && (
          <ReactionBadgeWrapper>
            {commentReactions.map((reaction) => (
              <ReactionBadge key={reaction._id} reaction={reaction} />
            ))}
          </ReactionBadgeWrapper>
        )}
      </InfoWrapper>

      {currentHoverMessageId === _id && <HoverMenu messageId={_id} />}
    </MessageWrapper>
  );
};

export default React.memo(ChatMessage);
