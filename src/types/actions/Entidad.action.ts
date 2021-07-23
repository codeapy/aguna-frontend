import { Entidad } from '../models/entidades/EntidadApp';

export const GET_ENTIDADES = `GET_ENTIDADES`;

export interface GetEntidadesAction {
  type: typeof GET_ENTIDADES;
  payload: {
    entidades: Entidad[];
    entidadCount: number;
  };
}

export type EntidadesActionTypes = GetEntidadesAction;
