import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  audioIsPlaying: false,
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
  },
});

export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
