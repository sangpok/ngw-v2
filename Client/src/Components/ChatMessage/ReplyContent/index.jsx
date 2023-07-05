import React from 'react';

import { StyledReplyContent } from './styled';

const { Container, Bold, Name, TextContent, ReplyIcon, Group } = StyledReplyContent;

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

const ReplyContent = ({ replyData }) => {
  const { userName, commentType, commentContent } = replyData;

  return (
    <Container>
      <Group full gap={0.5}>
        <ReplyIcon />
        <Group col gap={2}>
          <Name>
            <Bold>{userName}</Bold>님께 답장
          </Name>
          <TextContent>{getTypedComment(commentType, commentContent)}</TextContent>
        </Group>
      </Group>
    </Container>
  );
};

export default ReplyContent;
