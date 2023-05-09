import { tokensSlice } from './tokensSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tokens: tokensSlice.reducer,
  },
});
