import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  audioIsPlaying: false,
  isMoving: false,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialAuthState,
  reducers: {
    playAudio(state) {
      state.audioIsPlaying = true;
    },
    pauseAudio(state) {
      state.audioIsPlaying = false;
    },
    startMove(state) {
      state.isMoving = true;
    },
    stopMove(state) {
      state.isMoving = false;
    },
  },
});

export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
