import { providerViewFunction } from './../token';
import { TokensObject } from './../services.interface';
import getConfig from '@/config';

const config = getConfig();
const PEMB_ROCK_CONTRACT_ID = config.PEMB_ROCK_CONTRACT_ID;

export const getNearPrice = async (): Promise<string> => {
  return fetch(config.helperUrl + '/fiat', {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((res) => res.json())
    .then((price) => {
      return price.near.usd.toString();
    })
    .catch(() => []);
};

export const getTokenPriceList = async (): Promise<object[] | any> => {
  return fetch(config.indexerUrl + '/list-token-price', {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((res) => res.json())
    .then((list) => list)
    .catch((e) => {
      console.log('Error fetching price:', e);
      return [];
    });
};

export const getTokens = (): Promise<TokensObject> => {
  const args = {
    from_index: 0,
    limit: 100,
  };
  return providerViewFunction(PEMB_ROCK_CONTRACT_ID, {
    methodName: 'get_tokens',
    args,
  });
};
