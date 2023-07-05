import { closeModal } from '@Store/ModalSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '..';

import { StyledProfileModal } from './styled';

const { Container, Image } = StyledProfileModal;

const ProfileModal = ({ profileSrc }) => {
  const storeDispatch = useDispatch();

  const { modalTitle } = useSelector((state) => state.ModalSlice);

  const handleSubmit = () => {
    storeDispatch(closeModal());
  };

  const handleCancel = () => {
    storeDispatch(closeModal());
  };

  return (
    <Modal title={modalTitle} onCancel={handleCancel} onSubmit={handleSubmit}>
      <Container>
        <Image src={profileSrc} />
      </Container>
    </Modal>
  );
};

export default ProfileModal;
