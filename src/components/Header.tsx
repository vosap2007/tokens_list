import { FC } from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.scss';
import { useRouter } from 'next/router';
import { Wallet } from '@/utils/walletSelector/wallet';

const Header: FC = () => {
  const { pathname } = useRouter();
  //   const { modal, accounts, accountId }: any = Wallet();

  console.log('Wallet()', Wallet()?.modal.show());

  return (
    <header className={styles.header}>
      {/* <Link href="/" className={pathname === '/' ? styles.active : ''}>
        Authorization
      </Link> */}
      {/* <button onClick={() => modal.show()}>Connect Wallet</button> */}

      <Link
        href="/tokens"
        className={pathname === '/tokens' ? styles.active : ''}
      >
        Tokens Page
      </Link>
    </header>
  );
};

export default Header;
