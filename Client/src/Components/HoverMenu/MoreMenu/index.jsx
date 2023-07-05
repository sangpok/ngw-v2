import React from 'react';

import { StyledMoreMenu } from './styled';

const { Container, ItemList, Item, Icon } = StyledMoreMenu;

const MoreMenu = ({ onSelect }) => {
  const handleClick = (e) => {
    const eventType = e.target.dataset.eventType;

    onSelect({
      type: 'MoreMenu',
      data: {
        eventType,
      },
    });
  };

  return (
    <Container>
      <ItemList onClick={handleClick}>
        <Item data-event-type="Reply">
          <Icon>💬</Icon> 댓글 답장하기
        </Item>
        <Item data-event-type="Delete" red>
          <Icon>❌</Icon> 댓글 삭제하기
        </Item>
      </ItemList>
    </Container>
  );
};

export default MoreMenu;
