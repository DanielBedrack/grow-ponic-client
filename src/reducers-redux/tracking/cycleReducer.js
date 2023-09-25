import { createSlice } from '@reduxjs/toolkit';

const cycleTrackingSlice = createSlice({
  name: 'cycleTracking',
  initialState: { cycleTrackings: [] },
  reducers: {
    addCycleTracking: (state, action) => {
      state.cycleTrackings.push(action.payload);
    },
    deleteCycleTracking: (state, action) => {
      state.cycleTrackings = state.cycleTrackings.filter(
        (cycleTracking) => cycleTracking._id !== action.payload
      );
    },
    updateCycleTracking: (state, action) => {
      const index = state.cycleTrackings.findIndex(
        (cycleTracking) => cycleTracking._id === action.payload._id
      );
      if (index !== -1) {
        state.cycleTrackings[index] = action.payload;
      }
    },
    setCycleTrackings: (state, action) => {
      state.cycleTrackings = action.payload;
    },
    addPlantToCycleTracking: (state, action) => {
      const index = state.cycleTrackings.findIndex(
        (cycleTracking) => cycleTracking._id === action.payload.cycleId
      );
      if (index !== -1) {
        state.cycleTrackings[index].plants.push(action.payload.plant);
      }
    },
    removePlantFromCycleTracking: (state, action) => {
      const index = state.cycleTrackings.findIndex(
        (cycleTracking) => cycleTracking._id === action.payload.cycleId
      );
      if (index !== -1) {
        state.cycleTrackings[index].plants = state.cycleTrackings[
          index
        ].plants.filter((plant) => plant._id !== action.payload.plantId);
      }
    },
  },
});

export const {
  addCycleTracking,
  deleteCycleTracking,
  updateCycleTracking,
  setCycleTrackings,
  addPlantToCycleTracking,
  removePlantFromCycleTracking,
} = cycleTrackingSlice.actions;
export default cycleTrackingSlice.reducer;
