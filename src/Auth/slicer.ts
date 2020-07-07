import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserInfo } from "../types";

export const STORE_KEY = 'USER_INFO';

export const authInitialState = {
  email: '',
  error: null as string | null,
  isFetching: false,
  user: JSON.parse(localStorage.getItem(STORE_KEY) || 'null') as UserInfo | null,
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  initialState: authInitialState,
  name: 'auth',
  reducers: {
    restoreDefault() {
      localStorage.removeItem(STORE_KEY);

      return authInitialState;
    },
    login(state, action: PayloadAction<string>) {
      state.isFetching = true;
      state.email = action.payload;
    },
    receiveUserInfo(state, action: PayloadAction<UserInfo>) {
      state.isFetching = false;
      state.user = action.payload;
      state.user.email = state.email;

      localStorage.setItem(STORE_KEY, JSON.stringify(state.user));
    },
    rejectUserInfo(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload;
    },
    removeError(state) {
      state.error = null;
    },
  },
});
