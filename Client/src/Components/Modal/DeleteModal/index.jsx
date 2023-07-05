import React from 'react';
import Modal from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@Store/ModalSlice';

import { StyledDeleteModal } from './styled';

const { PropertyName, Group, Input, Describe } = StyledDeleteModal;

const DeleteModal = ({ messageId }) => {
  const storeDispatch = useDispatch();

  const { modalTitle } = useSelector((state) => state.ModalSlice);

  const handleCancel = () => {
    storeDispatch(closeModal());
  };

  const handleSubmit = () => {
    // TODO: 비밀번호 삭제 진행
    storeDispatch(closeModal());
  };

  return (
    <Modal title={modalTitle} onCancel={handleCancel} onSubmit={handleSubmit}>
      해당 방명록을 삭제하시려면 방명록을 남기실 때 등록한 비밀번호를 입력해주세요!
      <Group>
        <Describe></Describe>
        <PropertyName>비밀번호</PropertyName>
        <Input type="password" placeholder="****" />
      </Group>
    </Modal>
  );
};

export default DeleteModal;
