import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { trackingInitialState } from './trackingReducer';

export const fetchCycles = createAsyncThunk('fetchCycles', async (systemId) => {
  try {
    console.log(systemId)
    const response = await axios.get(
      `http://localhost:5000/api/v1/tracking/cycles/${systemId}`
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
});

const cycleTrackingSlice = createSlice({
  name: 'cycles',
  initialState: trackingInitialState.data,
  reducers: {
    addCycleTracking: (state, action) => {
      state.cycles.push(action.payload);
    },
    deleteCycleTracking: (state, action) => {
      state.cycles = state.cycles.filter(
        (cycleTracking) => cycleTracking._id !== action.payload
      );
    },
    updateCycleTracking: (state, action) => {
      const index = state.cycles.findIndex(
        (cycleTracking) => cycleTracking._id === action.payload._id
      );
      if (index !== -1) {
        state.cycles[index] = action.payload;
      }
    },
    setCycleTrackings: (state, action) => {
      state.cycles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCycles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCycles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cycles = action.payload;
      })
      .addCase(fetchCycles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
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
