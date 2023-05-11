import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TokensState } from './redux.interface';

const initialState: TokensState = {
  value: [],
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    getTokens: (state, action: PayloadAction<[] | any>) => {
      state.value = [...action.payload];
    },
  },
});

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    value: false,
  },
  reducers: {
    getAuthorization: (state) => {
      state.value = !state.value;
    },
  },
});

export const { getTokens } = tokensSlice.actions;
export const { getAuthorization } = authorizationSlice.actions;
