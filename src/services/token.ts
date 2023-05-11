import { useState, useEffect } from 'react';
import getConfig from '@/config';
import { providers } from 'near-api-js';
import circle_near_logo from '../../public/circle_near_logo.svg';
import {
  TokenMetadata,
  PembViewFunctionOptions,
  CodeResult,
  TokensObject,
  TokenWithMetadata,
} from './services.interface';
import { getNearPrice, getTokenPriceList, getTokens } from './api/api';

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
