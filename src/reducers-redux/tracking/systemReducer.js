import { createSlice } from '@reduxjs/toolkit';

const storedSystems = localStorage.getItem('systems')
  ? JSON.parse(localStorage.getItem('systems'))
  : [];

const storedUser = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  systems: storedSystems,
  userInfo: storedUser,
};

const systemWithCyclesSlice = createSlice({
  name: 'systemWithCycles',
  initialState,
  reducers: {
    addSystem: (state, action) => {
      state.systems.push(action.payload);
    },

    deleteSystem: (state, action) => {
      const systemIdToDelete = action.payload;
      state.systems = state.systems.filter(
        (system) => system._id !== systemIdToDelete
      );
    },

    updateSystem: (state, action) => {
      const updatedSystem = action.payload;
      const index = state.systems.findIndex(
        (system) => system._id === updatedSystem._id
      );
      if (index !== -1) {
        state.systems[index] = updatedSystem;
      }
    },

    addCycle: (state, action) => {
      const { systemId, cycle } = action.payload;
      const system = state.systems.find((s) => s._id === systemId);
      if (system) {
        system.cycles.push(cycle);
        console.log(system);
      }
    },

    endCycle: (state, action) => {
      const { systemId, cycleId } = action.payload;
      const system = state.systems.find((s) => s._id === systemId);
      if (system) {
        const cycle = system.cycles.find((c) => c._id === cycleId);
        if (cycle) {
          cycle.isActive = false;
        }
      }
    },

    addPlantToCycle: (state, action) => {
      const { systemId, cycleId, plant } = action.payload;
      const system = state.systems.find((s) => s._id === systemId);
      if (system) {
        const cycle = system.cycles.find((c) => c._id === cycleId);
        if (cycle) {
          cycle.plants.push(plant);
        }
      }
    },

    deletePlantFromCycle: (state, action) => {
      const { systemId, cycleId, plantId } = action.payload;
      const system = state.systems.find((s) => s._id === systemId);
      if (system) {
        const cycle = system.cycles.find((c) => c._id === cycleId);
        if (cycle) {
          cycle.plants = cycle.plants.filter((plant) => plant._id !== plantId);
        }
      }
    },

    updatePlantInCycle: (state, action) => {
      const { systemId, cycleId, updatedPlant } = action.payload;
      const system = state.systems.find((s) => s._id === systemId);
      if (system) {
        const cycle = system.cycles.find((c) => c._id === cycleId);
        if (cycle) {
          const index = cycle.plants.findIndex(
            (plant) => plant._id === updatedPlant._id
          );
          if (index !== -1) {
            cycle.plants[index] = updatedPlant;
          }
        }
      }
    },
  },
});

// Export actions and reducer
export const {
  addSystem,
  deleteSystem,
  updateSystem,
  addCycle,
  endCycle,
  addPlantToCycle,
  deletePlantFromCycle,
  updatePlantInCycle,
} = systemWithCyclesSlice.actions;

export default systemWithCyclesSlice.reducer;
