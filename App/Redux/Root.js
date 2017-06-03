// @flow
import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import { channelsReducer } from './ChannelsRedux';
import { userReducer } from './UserRedux';

export const createStore = () => {
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    channels: channelsReducer,
    user: userReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
