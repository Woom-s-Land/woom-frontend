import { createSlice } from '@reduxjs/toolkit';

const initialAlertState = {
  show: false,
  message: '',
  type: 'SUCCESS', // 'SUCCESS' | 'ERROR'
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    showAlert(state, action) {
      const { message, type } = action.payload;
      state.show = true;
      state.message = message;
      state.type = type;
    },
    hideAlert(state) {
      state.show = false;
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
