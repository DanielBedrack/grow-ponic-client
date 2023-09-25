import { createSlice } from '@reduxjs/toolkit';

const plantSlice = createSlice({
  name: 'plant',
  initialState: [],
  reducers: {
    addPlantToCycle: (state, action) => {
      // Add a new plant to the current cycle
      state.push(action.payload);
    },
  },
});

export const { addPlantToCycle } = plantSlice.actions;

export default plantSlice.reducer;
