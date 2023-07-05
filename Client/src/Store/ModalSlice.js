import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'ModalSlice',
  initialState: {
    isModalOpen: false,
    modalComponent: null,
    modalTitle: null,
    onCancel: null,
    onSubmit: null,
  },
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
    },
    closeModal(state, action) {
      state.isModalOpen = false;
    },
    setModalData(state, action) {
      const { modalComponent, modalTitle } = action.payload;

      state.modalComponent = modalComponent;
      state.modalTitle = modalTitle;
    },
  },
});

export default ModalSlice;

export const { openModal, closeModal, setModalData } = ModalSlice.actions;
