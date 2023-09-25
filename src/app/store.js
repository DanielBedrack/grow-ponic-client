import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../reducers-redux/dataReducer'; // Adjust the import path
import trackingReducer from '../reducers-redux/tracking/trackingReducer';
import userReducer from '../reducers-redux/userReducer';
import systemReducer from '../reducers-redux/tracking/systemReducer';

const store = configureStore({
  reducer: {
    dataService: dataReducer,
    trackingService: trackingReducer,
    user: userReducer,
    system: systemReducer
  },
});

export default store;
