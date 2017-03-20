// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import {channelsReducer} from './ChannelsRedux'

export default () => {
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    channels: channelsReducer
  })

  return configureStore(rootReducer, rootSaga)
}
