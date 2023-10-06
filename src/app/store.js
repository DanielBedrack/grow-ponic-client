import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../reducers-redux/dataReducer'; // Adjust the import path
import trackingReducer from '../reducers-redux/tracking/trackingReducer';
import userReducer from '../reducers-redux/userReducer';
import systemReducer from '../reducers-redux/tracking/systemReducer';
import cycleReducer from '../reducers-redux/tracking/cycleReducer';
import plantReducer from '../reducers-redux/tracking/plantReducer';

const store = configureStore({
  reducer: {
    dataService: dataReducer,
    trackingService: trackingReducer,
    user: userReducer,
    system: systemReducer,
    cycle: cycleReducer,
    plants:plantReducer
  },
});

export default store;
