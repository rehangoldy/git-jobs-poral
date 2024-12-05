import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobReducer from './jobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;