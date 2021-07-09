import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { KeycloakInstance } from 'keycloak-js';
import { useKeycloak } from '@react-keycloak/ssr';
import Loader from '../../core/Loader';
import { AppState } from '../../../redux/store';

// eslint-disable-next-line react/display-name
const withData = (ComposedComponent: any) => (props: any) => {
  const { user, loading } = useSelector<AppState, AppState['auth']>(
    ({ auth }) => auth,
  );
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if (
      !user &&
      !loading &&
      keycloak &&
      !keycloak.authenticated &&
      !asPath.includes(`session_state`)
    ) {
      window.location.href = keycloak.createLoginUrl();
    }
  }, [user, loading, keycloak, asPath]);
  if (!user || loading) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
