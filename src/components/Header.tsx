import { FC } from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.scss';
import { useRouter } from 'next/router';

const Header: FC = () => {
  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <Link href="/" className={pathname === '/' ? styles.active : ''}>
        Authorization
      </Link>
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
