import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false, userInfo: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
