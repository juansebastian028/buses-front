import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';
import { busRoutesReducer } from './busRoutesReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  busRoute: busRoutesReducer
});
