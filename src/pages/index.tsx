import Meta from '@/components/seo/Meta';

const Home = () => {
  return (
    <Meta title="Home Page">
      <div>Authorization Page</div>
      <button
        onClick={() => {
          console.log('WalletSelector ');
        }}
      >
        Sign In
      </button>
    </Meta>
  );
};

export default Home;
