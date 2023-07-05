import React, { useEffect, useState } from 'react';

import { StyledMessageType } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { addCommand, removeCommand } from '@Store/DashboardStateSlice';

/** 방명록 타입 맵 */
const CommentTypeInfo = [
  {
    id: 0,
    icon: '🤵',
    text: '명언',
  },
  {
    id: 1,
    icon: '🎥',
    text: '유튜브',
  },
  {
    id: 2,
    icon: '🖼',
    text: '사진',
  },
  {
    id: 3,
    icon: '📃',
    text: '텍스트',
  },
];

const { Container, Icon, OpenIcon, TypeBox, TypeItem } = StyledMessageType;

const MessageType = ({ selectedTypeId, onSelectedTypeId }) => {
  const storeDispatch = useDispatch();

  const { lastCommands } = useSelector((state) => state.DashboardStateSlice);

  const [typeBoxOpen, setTypeBox] = useState(false);

  useEffect(() => {
    const handleKeyUp = (e) => {
      const lastCommand = lastCommands.at(-1);

      if (e.code === 'Escape' && lastCommand === 'message-typebox-open') {
        setTypeBox(false);
        storeDispatch(removeCommand('message-typebox-open'));
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [lastCommands]);

  const handleTypeClick = (e) => {
    const componentName = e.target.closest('[data-component-name]').dataset.componentName;

    if (componentName === 'message-type') {
      setTypeBox(!typeBoxOpen);
      storeDispatch(
        !typeBoxOpen ? addCommand('message-typebox-open') : removeCommand('message-typebox-open')
      );
      return;
    }

    onSelectedTypeId(+e.target.closest('[data-type-id]').dataset.typeId);
    setTypeBox(false);

    storeDispatch(removeCommand('message-typebox-open'));
  };

  return (
    <Container data-component-name="message-type" onClick={handleTypeClick}>
      <Icon>{CommentTypeInfo[selectedTypeId].icon}</Icon>
      {CommentTypeInfo[selectedTypeId].text}
      <OpenIcon isOpened={typeBoxOpen} />
      {typeBoxOpen && (
        <TypeBox data-component-name="message-type-box">
          {CommentTypeInfo.map((typeInfo) => (
            <TypeItem key={typeInfo.id} data-type-id={typeInfo.id}>
              <Icon>{typeInfo.icon}</Icon>
              {typeInfo.text}
            </TypeItem>
          ))}
        </TypeBox>
      )}
    </Container>
  );
};

export default MessageType;
