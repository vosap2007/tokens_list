import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TokensState } from './redux.interface';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import getConfig from '@/config';

const config = getConfig();
const PEMB_ROCK_CONTRACT_ID = config.PEMB_ROCK_CONTRACT_ID;

const initialSt: TokensState = {
  value: [],
};

export const fetchUserById = createAsyncThunk('user/fetchWallet', async () => {
  const selector = await setupWalletSelector({
    network: 'mainnet',
    modules: [setupNearWallet()],
  });

  const modal = setupModal(selector, {
    contractId: PEMB_ROCK_CONTRACT_ID,
    theme: 'dark',
  });

  return { selector: selector, modal: modal };
});

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: [],
  extraReducers: (builder: any) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState: initialSt,
  reducers: {
    getTokens: (state, action: PayloadAction<[] | any>) => {
      state.value = [...action.payload];
    },
  },
});

export const { getTokens } = tokensSlice.actions;
export default walletSlice.reducer;
