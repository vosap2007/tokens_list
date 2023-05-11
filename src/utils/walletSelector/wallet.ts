import { useEffect, useState } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';

import getConfig from '@/config';
const config = getConfig();

const PEMB_ROCK_CONTRACT_ID = config.PEMB_ROCK_CONTRACT_ID;

export const useWalletSelector = () => {
  const [selector, setSelector] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    getWalletSelector()
      .then((response) => {
        setSelector(response[0]);
        setModal(response[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  const result = {
    selector,
    modal,
  };

  return result;
};

export const getWalletSelector = async (): Promise<any[]> => {
  const selector = await setupWalletSelector({
    network: 'mainnet',
    modules: [setupNearWallet()],
  });

  const modal = setupModal(selector, {
    contractId: PEMB_ROCK_CONTRACT_ID,
    theme: 'dark',
  });

  const result = Promise.all([selector, modal]);
  return result;
};
