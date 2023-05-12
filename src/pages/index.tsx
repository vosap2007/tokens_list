import { useSelector } from 'react-redux';
import Meta from '@/components/seo/Meta';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const wallet = useSelector((state: any) => state.wallet);

  const handleSignOut = async () => {
    const selector = await wallet[0].selector?.wallet();
    selector
      ?.signOut()
      .then(() => window.location.reload())
      .catch((err: any) => console.error(err));
  };

  return (
    <Meta title="Home Page">
      <div className={styles.home}>
        <div>Authorization Page</div>
        <button
          className={styles.home__button}
          onClick={() => {
            !wallet[0]?.selector.isSignedIn()
              ? wallet[0]?.modal.show()
              : handleSignOut();
          }}
        >
          {!wallet[0]?.selector.isSignedIn() ? 'Sign In' : 'Sign Out'}
        </button>
      </div>
    </Meta>
  );
};

export default Home;
