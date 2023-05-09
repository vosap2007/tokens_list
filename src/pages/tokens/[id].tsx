import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Meta from '@/components/seo/Meta';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TokenInfo } from '@/services/token';
import styles from '../../styles/Token.module.scss';

const TokenPage: NextPage = () => {
  const [token, setToken] = useState<TokenInfo>();
  const { push, query } = useRouter();
  const tokens = useSelector((state: any) => state.tokens.value);

  useEffect(() => {
    tokens.map((token: TokenInfo) => {
      if (token.id === query.id) {
        setToken(token);
      }
    });
  }, []);

  return (
    <Meta title="Token Page">
      <div className={styles.token}>
        <button className={styles.token_button} onClick={() => push('/tokens')}>
          &#8592; GO BACK
        </button>
        {token && (
          <>
            <div className={styles.token__title_block}>
              <h1>Token: {token.metadata.symbol}</h1>
              <img
                src={token.metadata.icon}
                alt="icon"
                width={35}
                height={35}
              />
            </div>
            <h2>Price: {token.refPrice} $</h2>
          </>
        )}
      </div>
    </Meta>
  );
};

export default TokenPage;
