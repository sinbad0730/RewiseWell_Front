// store/activitySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActivityState {
  isActive: boolean;
  time?: number;
}

const initialState: ActivityState = {
  isActive: false,
  time: 0,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<{ isActive: boolean, time?: number }>) {
      state.isActive = action.payload.isActive;
      if (action.payload.time) {
        state.time = action.payload.time;
      }
    },
  },
});

export const { setActive } = activitySlice.actions;
export default activitySlice.reducer;
