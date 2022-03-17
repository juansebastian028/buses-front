import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';
import { busRoutesReducer } from './busRoutesReducer';
import { mapReducer } from './mapReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  busRoute: busRoutesReducer,
  map: mapReducer,
});
