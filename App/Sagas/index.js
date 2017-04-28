import { takeLatest } from 'redux-saga';

/* ------------- Types ------------- */

import { channelsTypes } from '../Redux/';
import { StartupTypes } from '../Redux/StartupRedux';
import { LoginTypes } from '../Redux/LoginRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { login } from './LoginSagas';
import { getChannels } from './ChannelsSagas';

/* ------------- RootSaga ------------- */

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(channelsTypes.CHANNELS_REQUEST, getChannels),
  ];
}
