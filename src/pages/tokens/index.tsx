import Meta from '@/components/seo/Meta';
import { useTokensWithMetadata } from '@/services/token';
import BigNumber from 'bignumber.js';
import { NextPage } from 'next';
import Link from 'next/link';
import styles from '../../styles/Tokens.module.scss';

const TokensPage: NextPage = () => {
  const lendList = useTokensWithMetadata();
  return (
    <Meta title="Tokens Page" description="There is all information to tokens.">
      <div className={styles.tokens}>
        <h1 className={styles.tokens_title}>Tokens Page</h1>
        <ul className={styles.tokens_list}>
          {lendList?.map(({ metadata, refPrice, id }: any) => {
            const { icon, name, symbol } = metadata;

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
    </Meta>
  );
};

export default TokensPage;
