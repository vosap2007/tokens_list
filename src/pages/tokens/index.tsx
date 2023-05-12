import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import Link from 'next/link';
import Meta from '@/components/seo/Meta';
import BigNumber from 'bignumber.js';
import styles from '../../styles/Tokens.module.scss';

const TokensPage: NextPage = () => {
  const tokens = useSelector((state: any) => state.tokens.value);
  const wallet = useSelector((state: any) => state.wallet);

  return (
    <Meta title="Tokens Page" description="There is all information to tokens.">
      {wallet[0]?.selector.isSignedIn() ? (
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
