import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TokensState {
  value: [] | any;
}

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

export const { getTokens } = tokensSlice.actions;
