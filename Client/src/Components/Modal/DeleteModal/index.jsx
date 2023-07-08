import React, { useState } from 'react';
import Modal from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@Store/ModalSlice';

import { StyledDeleteModal } from './styled';

import { EVENT_TYPE, socket } from '@Utils/socket';
import { usePacket } from '@Hooks/usePacket';

const { PropertyName, Group, Input, Describe } = StyledDeleteModal;

const DeleteModal = ({ messageId }) => {
  const storeDispatch = useDispatch();
  const { onceOn, sendPacket } = usePacket();

  const { modalTitle } = useSelector((state) => state.ModalSlice);

  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const onPasswordCompare = ({ compare }) => {
    if (!compare) {
      setErrorMessage('비밀번호가 다릅니다');
      return;
    }

    // onceOn(EVENT_TYPE.MESSAGE_DELETE, messageId, onMessageDeleted);
    sendPacket(EVENT_TYPE.MESSAGE_DELETE, messageId);
    storeDispatch(closeModal());
  };

  const handleCancel = () => {
    storeDispatch(closeModal());
  };

  const handleSubmit = () => {
    onceOn(EVENT_TYPE.PASSWORD_COMPARE, { messageId, inputPassword }, onPasswordCompare);
  };

  return (
    <Modal title={modalTitle} onCancel={handleCancel} onSubmit={handleSubmit}>
      해당 방명록을 삭제하시려면 방명록을 남기실 때 등록한 비밀번호를 입력해주세요!
      <Group>
        <PropertyName>비밀번호</PropertyName>
        <Input
          type="password"
          placeholder="****"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        {/* <Describe></Describe> */}
        {errorMessage && <div>{errorMessage}</div>}
      </Group>
    </Modal>
  );
};

export default DeleteModal;
