import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { fetchStart, fetchSuccess, setJWTToken } from '../../redux/actions';
import { AuthType } from '../../shared/constants/AppEnums';
import { defaultUser } from '../../shared/constants/AppConst';
import jwtAxios from '../services/auth/jwt-auth/jwt-api';
import { AppState } from '../../redux/store';
import {
  UPDATE_AUTH_USER,
  USER_LOADED,
} from '../../types/actions/Auth.actions';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector<AppState, AppState['auth']>(({ auth }) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      dispatch(fetchStart());
      const cookies = new Cookies();
      const token = cookies.get(`token`);
      if (!token) {
        dispatch(fetchSuccess());
        dispatch({ type: USER_LOADED });
        return;
      }
      dispatch(setJWTToken(token));
      try {
        const res = await jwtAxios.get(`/auth`);
        dispatch(fetchSuccess());
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: {
            authType: AuthType.JWT_AUTH,
            displayName: res.data.name,
            email: res.data.email,
            role: defaultUser.role,
            token: res.data._id,
            photoURL: res.data.avatar,
          },
        });
        return;
      } catch (err) {
        dispatch(fetchSuccess());
      }
    };

    const checkAuth = () => {
      Promise.all([validateAuth()]).then(() => {
        setLoading(false);
        dispatch({ type: USER_LOADED });
      });
    };
    checkAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = () => {
  const { user } = useSelector<AppState, AppState['auth']>(({ auth }) => auth);

  if (user) {
    return { id: 1, ...user };
  }
  return null;
};