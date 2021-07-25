import { Dispatch } from 'redux';
import { AppActions } from '@/types';
import { GET_ENTIDADES } from '@/types/actions/Entidad.action';
import client from '@/apollo-client';
import { gql } from '@apollo/client';
import { fetchError, fetchStart, fetchSuccess } from './Common';

const GET_ENTIDADES_QUERY = gql`
  query GetEntidades {
    entidades {
      id
      nombre
    }
  }
`;

const CREATE_ENTIDAD = gql`
  mutation CreateEntidad($nombre: String!) {
    createEntidad(input: { nombre: $nombre }) {
      id
      nombre
    }
  }
`;

export const getEntidades = () => (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  client
    .query({ query: GET_ENTIDADES_QUERY })
    .then(({ data, error }) => {
      if (!error) {
        dispatch(fetchSuccess());
        dispatch({ type: GET_ENTIDADES, payload: data });
      } else {
        dispatch(fetchError(`Something went wrong, Please try again!`));
      }
    })
    .catch((error) => {
      dispatch(fetchError(error.message));
    });
};

export const createEntidad =
  (input: { nombre: string }) => (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    client
      .mutate({
        mutation: CREATE_ENTIDAD,
        variables: {
          ...input,
        },
      })
      .then((result) => {
        const { errors } = result;
        if (!errors) {
          dispatch(fetchSuccess());
          // dispatch({ type: GET_ENTIDADES, payload: data });
        } else {
          dispatch(fetchError(`Something went wrong, Please try again!`));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
