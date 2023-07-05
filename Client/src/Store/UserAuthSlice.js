import { createSlice } from '@reduxjs/toolkit';

import { v4 as UUID } from 'uuid';

const USER_AUTH_KEY = 'notion-guest-book-user-auth';

const initialValue = {
  uid: null,
  userName: null,
  userPassword: null,
  userProfile: null,
};

const jsonValue = JSON.parse(localStorage.getItem(USER_AUTH_KEY)) || { ...initialValue };

const saveUserAuth = (state) => {
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(state));
};

const UserAuthSlice = createSlice({
  name: 'UserAuthSlice',
  initialState: {
    uid: jsonValue.uid,
    userName: jsonValue.userName,
    userPassword: jsonValue.userPassword,
    userProfile: jsonValue.userProfile,
  },
  reducers: {
    createUid(state, action) {
      state.uid = UUID();
      saveUserAuth(state);
    },
    setUserData(state, action) {
      const { userName, userPassword, userProfile } = action.payload;

      state.userName = userName;
      state.userPassword = userPassword;
      state.userProfile = userProfile;

      saveUserAuth(state);
    },
  },
});

export default UserAuthSlice;

export const { createUid, setUserData } = UserAuthSlice.actions;
