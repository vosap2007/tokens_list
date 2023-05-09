import { tokensSlice, authorizationSlice } from './tokensSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tokens: tokensSlice.reducer,
    authorization: authorizationSlice.reducer,
  },
});
