/** Redux Toolkit 관련 Import */
import { configureStore } from '@reduxjs/toolkit';

/** Slice */
import ConversationSlice from './ConversationSlice';
import FetchingStateSlice from './FetchingStateSlice';
import DashboardStateSlice from './DashboardStateSlice';
import UserAuthSlice from './UserAuthSlice';
import ModalSlice from './ModalSlice';
import LoadingStateSlice from './LoadingStateSlice';

const store = configureStore({
  reducer: {
    ConversationSlice: ConversationSlice.reducer,
    FetchingStateSlice: FetchingStateSlice.reducer,
    DashboardStateSlice: DashboardStateSlice.reducer,
    UserAuthSlice: UserAuthSlice.reducer,
    ModalSlice: ModalSlice.reducer,
    LoadingStateSlice: LoadingStateSlice.reducer,
  },
  middleware: [],
  devTools: true,
});

export { store };

export {
  ConversationSlice,
  FetchingStateSlice,
  DashboardStateSlice,
  UserAuthSlice,
  ModalSlice,
  LoadingStateSlice,
};
