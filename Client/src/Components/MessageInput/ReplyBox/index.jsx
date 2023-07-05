import React, { useEffect } from 'react';

import { StyledReplyBox } from './styled';

const { Container, UserProfile, Name, TextContent, ReplyIcon, CancelButton, Group } =
  StyledReplyBox;

const getTypedComment = (type, content) => {
  switch (type) {
    case '0':
      return `[명언] ${content}`;

    case '1':
      return `[유튜브]`;

    case '2':
      return `[사진]`;

    case '3':
      return content;

    default:
      return content;
  }
};

const ReplyBox = ({ replyData, onReplyCancel }) => {
  const { userProfile, userName, commentType, commentContent } = replyData;

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  const handleKeyUp = (e) => {
    // if (e.code === 'Escape') {
    //   onReplyCancel();
    // }
  };

  const handleClick = () => {
    onReplyCancel();
  };

  return (
    <Container>
      <ReplyIcon />
      <Group full gap={2}>
        <UserProfile src={userProfile} />
        <Group col gap={1}>
          <Name>{userName}</Name>
          <TextContent>{getTypedComment(commentType, commentContent)}</TextContent>
        </Group>
      </Group>
      <CancelButton onClick={handleClick}>❌</CancelButton>
    </Container>
  );
};

export default ReplyBox;
