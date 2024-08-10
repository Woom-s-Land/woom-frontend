import { createSlice } from '@reduxjs/toolkit';

const initialGroupState = {
  groupInfo: {},
};

const groupSlice = createSlice({
  name: 'group',
  initialState: initialGroupState,
  reducers: {
    join(state) {
      state.groupInfo = initialGroupState.groupInfo;
    },
    exit(state) {
      state.groupInfo = {};
    },
    setGroupInfo(state, action) {
      state.groupInfo = action.payload;
    },
  },
});

export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
