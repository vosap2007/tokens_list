import { fetchUserById } from '@/redux/tokensSlice';
import { getTokens } from '@/redux/tokensSlice';
import { useTokensWithMetadata } from '@/services/token';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Header';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const dispatch = useDispatch();
  const lendList = useTokensWithMetadata();

  useEffect(() => {
    lendList && dispatch(getTokens(lendList));
  }, [lendList]);

  useEffect(() => {
    dispatch(fetchUserById());
  }, []);

  return (
    <div>
      <Header />
      <main> {children}</main>
    </div>
  );
};

export default Layout;
