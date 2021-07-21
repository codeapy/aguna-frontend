import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { KeycloakInstance } from 'keycloak-js';
import { useKeycloak } from '@react-keycloak/ssr';
import { initialUrl } from '@/shared/constants/AppConst';
import { AppState } from '@/redux/store';
import Loader from '../../core/Loader';

const withData = (ComposedComponent: any) =>
  function ComponentWithData(props: any) {
    const { user, loading } = useSelector<AppState, AppState['auth']>(
      ({ auth }) => auth,
    );
    const { keycloak: { authenticated } = {} } =
      useKeycloak<KeycloakInstance>();

    const { asPath } = useRouter();
    const queryParams = asPath.split(`?`)[1];
    useEffect(() => {
      if (authenticated) {
        Router.push(initialUrl + (queryParams ? `?${queryParams}` : ``));
      }
    }, [authenticated, queryParams]);
    if (loading) return <Loader />;
    if (user) return <Loader />;

    return <ComposedComponent {...props} />;
  };
export default withData;
