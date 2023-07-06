import { createSlice } from '@reduxjs/toolkit';

const LoadingStateSlice = createSlice({
  name: 'LoadingStateSlice',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    endLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default LoadingStateSlice;

export const { startLoading, endLoading } = LoadingStateSlice.actions;
