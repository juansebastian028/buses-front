import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas/rootSaga';
import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers = (typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
