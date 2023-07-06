import React, { useState } from 'react';
import Modal from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@Store/ModalSlice';

import { StyledDeleteModal } from './styled';

import { EVENT_TYPE, socket } from '@Utils/socket';

const { PropertyName, Group, Input, Describe } = StyledDeleteModal;

const DeleteModal = ({ messageId }) => {
  const storeDispatch = useDispatch();

  const { modalTitle } = useSelector((state) => state.ModalSlice);

  const [inputPassword, setInputPassword] = useState('');

  const onPasswordCompare = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    storeDispatch(closeModal());
  };

  const handleSubmit = () => {
    // TODO: 비밀번호 삭제 진행
    socket.once(EVENT_TYPE.PASSWORD_COMPARE, onPasswordCompare);
    socket.emit(EVENT_TYPE.PASSWORD_COMPARE, { messageId, inputPassword });
    storeDispatch(closeModal());
  };

  return (
    <Modal title={modalTitle} onCancel={handleCancel} onSubmit={handleSubmit}>
      해당 방명록을 삭제하시려면 방명록을 남기실 때 등록한 비밀번호를 입력해주세요!
      <Group>
        <Describe></Describe>
        <PropertyName>비밀번호</PropertyName>
        <Input
          type="password"
          placeholder="****"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </Group>
    </Modal>
  );
};

export default DeleteModal;
