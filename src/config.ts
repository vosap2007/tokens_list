export const defaultEnv = process.env.NEAR_ENV || 'tech-mainnet';
export const GAS_FEES_RESERVATION = 0.5;

export default function getConfig(env: string = defaultEnv) {
  switch (env) {
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        indexerUrl: 'https://indexer.ref.finance',
        explorerUrl: 'https://explorer.mainnet.near.org',
        statsUrl: 'https://api.stats.ref.finance',
        tvlUrl: 'https://api.llama.fi/tvl/pembrock-finance',
        TOKEN_CONTRACT_ID: 'token.pembrock.near',
        PEMB_ROCK_CONTRACT_ID: 'v1.pembrock.near',
        PEMB_ROCK_REWARD_ID: 'rewards.v1.pembrock.near',
        REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
        STAKING_CONTRACT_ID: 'staking.v1.pembrock.near',
        VOTING_CONTRACTS: [
          {
            name: 'lend',
            contractId: 'voting-lend.v1.pembrock.near',
          },
          {
            name: 'borrow',
            contractId: 'voting-borrow.v1.pembrock.near',
          },
        ],
        REF_FARM_CONTRACT_ID: 'boostfarm.ref-labs.near',
        WRAP_NEAR_CONTRACT_ID: 'wrap.near',
        nearBlocksUrl: 'https://nearblocks.io',
        EXCLUDE_FARM: [] as number[],
        ORDER_FARM: [
          3449, 3471, 3688, 3514, 3515, 1207, 974, 2734, 3, 4, 79, 3667,
        ],
        ORDER_LEND: [
          'token.pembrock.near',
          'wrap.near',
          'meta-pool.near',
          'linear-protocol.near',
          'v2-nearx.stader-labs.near',
          'token.v2.ref-finance.near',
          'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
          'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near',
          'token.sweat',
          'aurora',
          '2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near',
          'usn',
        ],
        WBTC_TOKEN_ID:
          '2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near',
        ETH_TOKEN_ID: 'aurora',
        headers: {},
      };
    case 'tech-mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        indexerUrl: 'https://indexer.ref.finance',
        explorerUrl: 'https://explorer.mainnet.near.org',
        statsUrl: 'https://api.stats.ref.finance',
        tvlUrl: 'https://api.llama.fi/tvl/pembrock-finance',
        TOKEN_CONTRACT_ID: 'token.pembrock.near',
        PEMB_ROCK_CONTRACT_ID: 'v1.pembrock.near',
        VOTING_CONTRACT_ID: '',
        PEMB_ROCK_REWARD_ID: 'rewards.v1.pembrock.near',
        REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
        STAKING_CONTRACT_ID: 'staking.v1.pembrock.near',
        VOTING_CONTRACTS: [
          {
            name: 'lend',
            contractId: 'voting-lend.v1.pembrock.near',
          },
          {
            name: 'borrow',
            contractId: 'voting-borrow.v1.pembrock.near',
          },
        ],
        REF_FARM_CONTRACT_ID: 'boostfarm.ref-labs.near',
        WRAP_NEAR_CONTRACT_ID: 'wrap.near',
        nearBlocksUrl: 'https://nearblocks.io',
        EXCLUDE_FARM: [] as number[],
        ORDER_FARM: [
          3449, 3471, 3688, 3514, 3515, 1207, 974, 2734, 3, 4, 79, 3667,
        ],
        ORDER_LEND: [
          'token.pembrock.near',
          'wrap.near',
          'meta-pool.near',
          'linear-protocol.near',
          'v2-nearx.stader-labs.near',
          'token.v2.ref-finance.near',
          'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
          'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near',
          'token.sweat',
          'aurora',
          '2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near',
          'usn',
        ],
        WBTC_TOKEN_ID:
          '2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near',
        ETH_TOKEN_ID: 'aurora',
        headers: {},
      };
    case 'old-testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        indexerUrl: 'https://indexer.ref.finance',
        explorerUrl: 'https://explorer.testnet.near.org',
        statsUrl: 'https://api.stats.ref.finance',
        tvlUrl: 'https://api.llama.fi/tvl/pembrock-finance',
        PEMB_ROCK_CONTRACT_ID: 'v0.pembrock.testnet',
        VOTING_CONTRACTS: [
          {
            name: 'lend',
            contractId: 'dev-1663161509891-48160374735673',
          },
          {
            name: 'borrow',
            contractId: 'dev-1663162213752-39349639300572',
          },
        ],
        TOKEN_CONTRACT_ID: 'token.pembrock.testnet',
        REF_FI_CONTRACT_ID: 'ref-finance-101.testnet',
        STAKING_CONTRACT_ID: 'staking.slovko.testnet',
        REF_FARM_CONTRACT_ID: 'v2.ref-farming.testnet',
        WRAP_NEAR_CONTRACT_ID: 'wrap.testnet',
        nearBlocksUrl: 'https://testnet.nearblocks.io',
        EXCLUDE_FARM: [] as number[],
        ORDER_FARM: [461],
        ORDER_LEND: ['token.pembrock.testnet'],
        WBTC_TOKEN_ID: 'wbtc.fakes.testnet',
        ETH_TOKEN_ID: 'aurora',
        headers: {},
      };
    default:
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        indexerUrl: 'https://testnet-indexer.ref-finance.com',
        explorerUrl: 'https://explorer.testnet.near.org',
        statsUrl: 'https://api.stats.ref.finance',
        tvlUrl: 'https://api.llama.fi/tvl/pembrock-finance',
        TOKEN_CONTRACT_ID: 'token.pembrock.testnet',
        PEMB_ROCK_CONTRACT_ID: 'contract.testnet-v1-1.pembrock.testnet',
        VOTING_CONTRACTS: [
          {
            name: 'lend',
            contractId: 'voting-lend.testnet-v1-1.pembrock.testnet',
          },
          {
            name: 'borrow',
            contractId: 'voting-borrow.testnet-v1-1.pembrock.testnet',
          },
        ],
        PEMB_ROCK_REWARD_ID: 'reward.testnet-v1-1.pembrock.testnet',
        REF_FI_CONTRACT_ID: 'ref-finance-101.testnet',
        STAKING_CONTRACT_ID: 'staking.testnet-v1-1.pembrock.testnet',
        REF_FARM_CONTRACT_ID: 'boostfarm.ref-finance.testnet',
        WRAP_NEAR_CONTRACT_ID: 'wrap.testnet',
        nearBlocksUrl: 'https://testnet.nearblocks.io',
        EXCLUDE_FARM: [] as number[],
        ORDER_FARM: [461],
        ORDER_LEND: ['token.pembrock.testnet'],
        WBTC_TOKEN_ID: 'wbtc.fakes.testnet',
        ETH_TOKEN_ID: 'aurora',
        headers: {},
      };
  }
}
