// @flow
import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import { channelsReducer } from './channels';
import { likedChannelsReducer } from './likedChannels';
import { userReducer } from './UserRedux';

export const createStore = () => {
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    search: require('./SearchRedux').reducer,
    channels: channelsReducer,
    likedChannels: likedChannelsReducer,
    user: userReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
