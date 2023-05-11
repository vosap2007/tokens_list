import { useSelector, useDispatch } from 'react-redux';
import Meta from '@/components/seo/Meta';
import { fetchUserById, getAuthorization } from '@/redux/tokensSlice';
import styles from '../styles/Home.module.scss';
import { useEffect } from 'react';

const Home = () => {
  const isAuthorization = useSelector(
    (state: any) => state.authorization.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById());
  }, []);

  return (
    <Meta title="Home Page">
      <div className={styles.home}>
        <div>Authorization Page</div>
        <button
          className={styles.home__button}
          onClick={() => {
            dispatch(getAuthorization());
          }}
        >
          {isAuthorization ? 'Sign In' : 'Sign Out'}
        </button>
      </div>
    </Meta>
  );
};

export default Home;
