import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {not, contains} from 'ramda';

import Config from '../Config/DebugSettings';
import ReduxPersist from '../Config/ReduxPersist';
import RehydrationServices from '../Services/RehydrationServices';
import {subscribeFirebase} from '../Sagas/subscribe';

export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  /* ------------- Logger Middleware ------------- */

  const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];
  if (__DEV__) {
    const USE_LOGGING = Config.reduxLogging;
    const logger = createLogger({
      predicate: (getState, { type }) => {
        return USE_LOGGING && not(contains(type, SAGA_LOGGING_BLACKLIST));
      },
    });
    middleware.push(logger);
  }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /* ------------- AutoRehydrate Enhancer ------------- */

  if (ReduxPersist.active) {
    console.log('autoRehydrate');
    enhancers.push(autoRehydrate({log: true}));
  }

  const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store);
  }

  sagaMiddleware.run(rootSaga);
  subscribeFirebase(store);

  return store;
};
