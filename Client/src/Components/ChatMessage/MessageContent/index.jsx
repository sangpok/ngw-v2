import React from 'react';

import { StyledMessageContent } from './styled';

const { TextContent, ImageContent, YoutubeContent, CoolSayingContent } = StyledMessageContent;

const MessageContent = ({ type, content, name }) => {
  switch (Number(type)) {
    case 3:
      return <TextContent>{content}</TextContent>;
    case 2:
      return <ImageContent src={content} alt="" />;
    case 1:
      return <YoutubeContent url={content} />;
    case 0:
      return <CoolSayingContent saying={content} name={name} />;
    default:
      return <TextContent>{content}</TextContent>;
  }
};

export default MessageContent;
