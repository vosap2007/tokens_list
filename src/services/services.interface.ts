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
