import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTokens } from '@/redux/tokensSlice';
import { NextPage } from 'next';
import Link from 'next/link';
import { useTokensWithMetadata } from '@/services/token';
import Meta from '@/components/seo/Meta';
import BigNumber from 'bignumber.js';
import styles from '../../styles/Tokens.module.scss';

const TokensPage: NextPage = () => {
  const tokens = useSelector((state: any) => state.tokens.value);
  const wallet = useSelector((state: any) => state.wallet);
  const isAuthorization = useSelector(
    (state: any) => state.authorization.value
  );
  const dispatch = useDispatch();
  const lendList = useTokensWithMetadata();

  console.log('wallet', wallet[0].modal.show());

  useEffect(() => {
    lendList && dispatch(getTokens(lendList));
  }, [lendList]);

  return (
    <Meta title="Tokens Page" description="There is all information to tokens.">
      {isAuthorization ? (
        <div className={styles.tokens}>
          <h1 className={styles.tokens_title}>Tokens Page</h1>
          <ul className={styles.tokens_list}>
            {tokens?.map(({ metadata, refPrice, id }: any) => {
              const { icon, symbol } = metadata;

              return (
                <li key={id}>
                  <Link className={styles.tokens_li} href={`/tokens/${id}`}>
                    <div className={styles.tokens_left}>
                      <img src={icon} alt="icon" width={35} height={35} />
                      <p> {symbol}</p>
                    </div>

                    <p>{new BigNumber(refPrice.toString()).toFixed(5)} $</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className={styles.tokens}>Log in to view tokens</div>
      )}
    </Meta>
  );
};

export default TokensPage;
