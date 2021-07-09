import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import {
  KeycloakInstance,
  KeycloakProfile,
  KeycloakTokenParsed,
} from 'keycloak-js';
import { AuthUser } from '@/types/models/AuthUser';
import { useKeycloak } from '@react-keycloak/ssr';
import { fetchSuccess, setJWTToken } from '../../redux/actions';
import { AuthType } from '../../shared/constants/AppEnums';
import { AppState } from '../../redux/store';
import {
  UPDATE_AUTH_USER,
  USER_LOADED,
} from '../../types/actions/Auth.actions';

const getUserObject = (
  profile: KeycloakProfile,
  tokenParsed?: KeycloakTokenParsed,
  token = ``,
): AuthUser => ({
  token,
  authType: AuthType.JWT_AUTH,
  displayName: profile.username,
  email: profile.email,
  role: tokenParsed?.realm_access?.roles ?? [],
  uid: profile.id ?? ``,
});

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const { user } = useSelector<AppState, AppState['auth']>(({ auth }) => auth);
  const {
    keycloak: { authenticated, token, tokenParsed, loadUserProfile } = {},
  } = useKeycloak<KeycloakInstance>();

  useEffect(() => {
    dispatch({ type: USER_LOADED });
    if (authenticated)
      loadUserProfile?.().then((profile) => {
        const cookies = new Cookies();
        cookies.set(`token`, token, { path: `/` });
        dispatch(setJWTToken(token ?? ``));
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getUserObject(profile, tokenParsed, token),
        });
        dispatch(fetchSuccess());
        dispatch({ type: USER_LOADED });
      });
  }, [authenticated, dispatch, loadUserProfile, token, tokenParsed]);
  return [user];
};

export const useAuthUser = () => {
  const { user } = useSelector<AppState, AppState['auth']>(({ auth }) => auth);

  if (user) {
    return { id: 1, ...user };
  }
  return null;
};
