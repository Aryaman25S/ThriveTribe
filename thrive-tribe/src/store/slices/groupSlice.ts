import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupState {
  groupName: string;
  members: string[];
}

const initialState: GroupState = {
  groupName: '',
  members: [],
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<{ groupName: string; members: string[] }>) => {
      state.groupName = action.payload.groupName;
      state.members = action.payload.members;
    },
  },
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;