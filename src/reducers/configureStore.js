/* global __DEV__ */
import { Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './index';

connect()(Router);
let middleware;

if (__DEV__) {
  const logger = createLogger();
   middleware = [thunk, ReduxPromise, logger];
  //middleware = [thunk, ReduxPromise];
} else {
  middleware = [thunk, ReduxPromise];
}

export function configureStore() {
  const store = compose(applyMiddleware(...middleware))(
    createStore
  )(reducers);

  const persistor = persistStore(store);

  return { persistor, store };
}

export const { persistor, store } = configureStore();
