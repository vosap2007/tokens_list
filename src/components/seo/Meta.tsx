import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { IMeta } from './meta.interface';

const getTitle = (title: string) => `${title} | TOKENS LIST`;

const Meta: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        {description ? (
          <>
            <meta name="description" content={description} />
            <meta name="og:title" content={getTitle(title)} />
            <meta name="og:description" content={description} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
