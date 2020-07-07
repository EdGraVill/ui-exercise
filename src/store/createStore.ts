import {
  configureStore,
  getDefaultMiddleware,
  StateFromReducersMapObject,
  combineReducers,
  EnhancedStore,
  CombinedState,
  AnyAction,
  Middleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { authReducer, authSagas } from '../Auth';
import { mailReducer, mailSagas } from '../Mail';

const mapReducer = {
  auth: authReducer,
  mail: mailReducer,
};

export type State = StateFromReducersMapObject<typeof mapReducer>;
export type Store = EnhancedStore<CombinedState<State>, AnyAction, Middleware<SagaMiddleware>[]>

export const createStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: combineReducers(mapReducer),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
  });

  sagaMiddleware.run(authSagas);
  sagaMiddleware.run(mailSagas);

  return store;
}
