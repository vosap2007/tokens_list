import { tokensSlice, authorizationSlice, walletSlice } from './tokensSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tokens: tokensSlice.reducer,
    authorization: authorizationSlice.reducer,
    wallet: walletSlice.reducer,
  },
});
