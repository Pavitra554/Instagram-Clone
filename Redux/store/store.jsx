import { configureStore } from '@reduxjs/toolkit';
import ModelReducer from '../actions/ModelSlice';
export const store = configureStore({
  reducer: {
      Model:ModelReducer,
  },
})