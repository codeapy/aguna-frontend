import { Dispatch } from 'redux';
import { AppActions } from '@/types';
import { GET_ENTIDADES } from '@/types/actions/Entidad.action';
import Api from '../../@crema/services/ApiConfig';
import { fetchError, fetchStart, fetchSuccess } from './Common';

export const getEntidades =
  (search: string, page: number) => (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    Api.get(`/api/entidades`, {
      params: { search, page },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ENTIDADES, payload: data.data });
        } else {
          dispatch(fetchError(`Something went wrong, Please try again!`));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
