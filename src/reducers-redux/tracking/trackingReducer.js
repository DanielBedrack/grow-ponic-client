import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import {
//   clearSystemRegistrationData,
//   updateSystemRegistrationField,
// } from './systemReducer';

export const fetchSystems = createAsyncThunk(
  'fetchSystems',
  async (userEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/tracking/systems/${userEmail}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const data = {
  systems: [],
  cycles: [],
  plants: [],
  averages: [],
};

export const trackingInitialState = {
  data: data, // Initialize with an empty array or the appropriate initial value
  isLoading: false,
  error: null,
};

// Create a slice
export const trackingSlice = createSlice({
  name: 'tracking',
  initialState: trackingInitialState, // Use initialState here, not trackingInitialState
  reducers: {
    //cycleReducer,

    // Define the addSystem reducer
    addSystem: (state, action) => {
      state.data.systems.push(action.payload);
    },
    deactivateSystem: (state, action) => {
      // Find the system by its ID and update its isActive property to false
      const systemToUpdate = state.data.systems.find(
        (system) => system.id === action.payload
      );
      if (systemToUpdate) {
        systemToUpdate.isActive = false;
      }
    },
    // Define the updateSystemData reducer
    updateSystemData: (state, action) => {
      const { systemId, updatedSystemData } = action.payload;

      // Find the index of the system with the matching systemId
      const systemIndex = state.data.systems.findIndex(
        (system) => system.systemId === systemId
      );

      if (systemIndex !== -1) {
        // Update the EC, PPM, and Temp data for the specific system
        state.data.systems[systemIndex] = {
          ...state.data.systems[systemIndex],
          ...updatedSystemData,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSystems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSystems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    //   .addCase(updateSystemRegistrationField, (state, action) => {
    //     // Handle updates to system registration fields here if needed
    //     const { field, value } = action.payload;
    //     // For example, you can update the corresponding field in tracking data
    //     if (field in state.data) {
    //       state.data[field] = value;
    //     }
    //   })
    //   .addCase(clearSystemRegistrationData, (state) => {
    //     // Handle clearing system registration data if needed
    //     // You can reset the data to its initial state
    //     state.data = data;
    //   });
  },
});

export default trackingSlice.reducer;
