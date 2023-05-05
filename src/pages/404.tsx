import Meta from '@/components/seo/Meta';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router.js';
import { useEffect } from 'react';
import styles from '../styles/404.module.scss';

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <Meta title="Not Found">
      <div className={styles.wrapper}>
        <Image src="/404.webp" alt="" width={450} height={433} />
      </div>
    </Meta>
  );
};

export default Error;
