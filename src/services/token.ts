import { useState, useEffect } from 'react';
import getConfig from '@/config';
import { providers } from 'near-api-js';
import circle_near_logo from '../../public/circle_near_logo.svg';

declare type BlockHash = string;
declare type BlockHeight = number;
export interface QueryResponseKind {
  block_height: BlockHeight;
  block_hash: BlockHash;
}
export interface CodeResult extends QueryResponseKind {
  result: number[];
  logs: string[];
}
export interface PembViewFunctionOptions {
  methodName: string;
  args?: object;
}
export interface TokenInfo {
  account_balance: string;
  total_supply: string;
  total_borrowed: string;
  lend_shares: string;
  debt_shares: string;
  debt_rate?: string;
  debt_apy?: string;
  lend_apy?: string;
  borrowable: string;
  last_accrue_time: string;
  lend_reward_rate_per_week: string;
  debt_reward_rate_per_week: string;
  id?: string;
  refPrice?: number;
  metadata?: any;
}
export interface TokenMetadata {
  id: string | number | any;
  name: string;
  symbol: string;
  decimals: number;
  icon: string | undefined;
  ref?: number | string;
  near?: number | string;
  total?: number;
  amountLabel?: string;
  amount?: number;
  nearNonVisible?: number | string;
  price?: string;
}
export interface TokenWithMetadata extends TokenInfo {
  id: string;
  metadata: TokenMetadata;
  refPrice?: string | object[] | any;
  price?: number;
}
export interface TokensObject {
  [id: string]: TokenInfo;
}
export const nearMetadata: TokenMetadata = {
  id: 'NEAR',
  name: 'NEAR',
  symbol: 'NEAR',
  decimals: 24,
  icon: circle_near_logo,
};

const icons: { [tokenId: string]: string } = {
  'wrap.near': 'https://i.postimg.cc/DZfHgngm/w-NEAR-no-border.png',
  'wrap.testnet': 'https://i.postimg.cc/DZfHgngm/w-NEAR-no-border.png',
  'wrap.pembrock.testnet':
    'https://dev.d3ogjq7i3lnd08.amplifyapp.com/pembrock.72d9a6d0.svg',
  'token1.pembrock.testnet':
    'https://cdn.coinranking.com/HBBEvzjqz/test-token.svg?size=144x144',
  'token2.pembrock.testnet':
    'https://upload.wikimedia.org/wikipedia/commons/4/46/Istanbul_Line_Symbol_T2.png',
};

const config = getConfig();
const PEMB_ROCK_CONTRACT_ID = config.PEMB_ROCK_CONTRACT_ID;

export const getProvider = () => {
  const networkNodeUrl = config.nodeUrl;
  return new providers.JsonRpcProvider({ url: networkNodeUrl });
};

export const providerViewFunction = async (
  contractId: string,
  { methodName, args }: PembViewFunctionOptions
) => {
  const provider = getProvider();
  return await provider
    .query<CodeResult>({
      request_type: 'call_function',
      account_id: contractId,
      method_name: methodName,
      args_base64: window.btoa(JSON.stringify(args)),
      finality: 'final',
    })
    .then((res) => {
      return JSON.parse(Buffer.from(res.result).toString());
    })
    .catch((e) =>
      console.log(
        `Error getting data - contract: ${contractId}, method_name: ${methodName}`
      )
    );
};

export const ftGetTokenMetadata = async (
  id: string
): Promise<TokenMetadata> => {
  try {
    if (id === 'NEAR') {
      return nearMetadata;
    }
    const metadata = await providerViewFunction(id, {
      methodName: 'ft_metadata',
    });
    if (!metadata.icon) {
      metadata.icon = icons[id];
    }
    return {
      id,
      ...metadata,
    };
  } catch (err) {
    return {
      id,
      name: id,
      symbol: id?.split('.')[0].slice(0, 8),
      decimals: 6,
      icon: undefined,
    };
  }
};

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

export const useTokensWithMetadata = () => {
  const [tokens, setTokens] = useState<TokenWithMetadata[]>();

  useEffect(() => {
    getTokens()
      .then(async (tokenList: TokensObject) => {
        const tokenMetadataPromise = Promise.all(
          Object.keys(tokenList).map((tokenId) => ftGetTokenMetadata(tokenId))
        );
        const nearPrice = getNearPrice();

        const priceTokens = getTokenPriceList();

        return await Promise.all([
          tokenList,
          tokenMetadataPromise,
          ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          nearPrice,
          priceTokens,
        ]);
      })
      .then((data) => {
        const arr: TokenWithMetadata[] = [];
        data[1].forEach((item, index) => {
          item.near = data[2][index];
          arr.push({
            ...data[0][item.id],
            metadata: item,
            id: item.id,
            refPrice:
              item.id === 'NEAR'
                ? data[3]
                : (data[4] && data[4][item.id]?.price) || '0',
          });
        });
        const updatedArr = arr.filter(
          (item) =>
            item.id !==
            'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near'
        );
        setTokens(updatedArr);
      })
      .catch((e) => {
        console.log('Error:', e);
        setTokens([]);
      });
  }, []);

  return tokens;
};
