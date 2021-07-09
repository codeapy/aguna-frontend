import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { initialUrl } from '../../../shared/constants/AppConst';
import Loader from '../../core/Loader';
import { AppState } from '../../../redux/store';

// eslint-disable-next-line react/display-name
const withData = (ComposedComponent: any) => (props: any) => {
  const { user, loading } = useSelector<AppState, AppState['auth']>(
    ({ auth }) => auth,
  );
  const { asPath } = useRouter();
  const queryParams = asPath.split(`?`)[1];
  useEffect(() => {
    if (user) {
      Router.push(initialUrl + (queryParams ? `?${queryParams}` : ``));
    }
  }, [user]);
  if (loading) return <Loader />;
  if (user) return <Loader />;

  return <ComposedComponent {...props} />;
};
export default withData;
