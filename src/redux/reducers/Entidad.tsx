import { AppActions } from '@/types';
import { Entidad } from '@/types/models/entidades/EntidadApp';
import { GET_ENTIDADES } from '@/types/actions/Entidad.action';

const initialState: {
  entidades: Entidad[];
  entidadCount: number;
} = {
  entidades: [],
  entidadCount: 0,
};

const EntidadReducer = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case GET_ENTIDADES:
      return {
        ...state,
        entidades: action.payload.entidades,
        entidadCount: action.payload.entidadCount,
      };
    default:
      return state;
  }
};
export default EntidadReducer;
