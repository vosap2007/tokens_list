import React, { useCallback, useEffect, useState } from 'react';
import { map, distinctUntilChanged } from 'rxjs';
import { Network, setupWalletSelector } from '@near-wallet-selector/core';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';

import getConfig, { defaultEnv } from '@/config';
const config = getConfig();

const PEMB_ROCK_CONTRACT_ID = config.PEMB_ROCK_CONTRACT_ID;

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

export const Wallet = () => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: {
        networkId: config.networkId,
        nodeUrl: config.nodeUrl,
      } as Network,
      debug: defaultEnv !== 'mainnet',
      modules: [setupNearWallet(), setupMyNearWallet()],
    });
    const _modal = setupModal(_selector, {
      contractId: PEMB_ROCK_CONTRACT_ID,
      theme: 'dark',
    });
    const state = _selector.store.getState();
    setAccounts(state.accounts);
    window.selector = _selector;
    window.modal = _modal;
    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert('Failed to initialise wallet selector');
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }
    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector]);

  if (!selector || !modal) {
    return null;
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  const wallet = {
    selector,
    modal,
    accounts,
    accountId,
  };

  console.log('wallet', wallet);

  return wallet;
};
