import { tokensSlice, walletSlice } from './tokensSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tokens: tokensSlice.reducer,
    wallet: walletSlice.reducer,
  },
});
