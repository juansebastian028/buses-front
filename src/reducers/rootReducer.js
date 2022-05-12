import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';
import { busRoutesReducer } from './busRoutesReducer';
import { mapReducer } from './mapReducer';
import { authReducer } from './authReducer';
import { postReducer } from './postReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  busRoute: busRoutesReducer,
  map: mapReducer,
  auth: authReducer,
  post: postReducer,
});
