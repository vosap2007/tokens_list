import Meta from '@/components/seo/Meta';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const TokenPage: NextPage = () => {
  const { push } = useRouter();

  return (
    <Meta title="Token Page">
      <h1>Token Page</h1>
      <button onClick={() => push('/tokens')}>Go tokens list</button>
    </Meta>
  );
};

export default TokenPage;
