import { combineReducers } from 'redux';
import EntidadReducer from '@/redux/reducers/Entidad';
import Settings from './Setting';
import Common from './CommonReducer';
import Auth from './Auth';

const rootReducer = combineReducers({
  settings: Settings,
  auth: Auth,
  common: Common,
  entidad: EntidadReducer,
});

export default rootReducer;
