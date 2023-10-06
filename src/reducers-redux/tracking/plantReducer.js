import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { trackingInitialState } from './trackingReducer';

export const fetchPlants = createAsyncThunk('fetchPlants', async (cycleId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/tracking/plants/${cycleId}`
    );
    if(response.status === 404){
      return null;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
});

const plantSlice = createSlice({
  name: 'plants',
  initialState: trackingInitialState.data,
  reducers: {
    addPlantToCycle: (state, action) => {
      // Add a new plant to the current cycle
      state.plants.push(action.payload);
    },
    deletePlantFromCycle: (state, action) => {
      state.plants = state.plants.filter(
        (plant) => plant._id !== action.payload
      );
    },
    updatePlantsInCycle: (state, action) => {
      const index = state.plants.findIndex(
        (plant) => plant._id === action.payload._id
      );
      if (index !== -1) {
        state.plants[index] = action.payload;
      }
    },
    setPlants: (state, action) => {
      state.plants = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cycles = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addPlantToCycle,
  deletePlantFromCycle,
  updatePlantsInCycle,
  setPlants,
} = plantSlice.actions;

export default plantSlice.reducer;
