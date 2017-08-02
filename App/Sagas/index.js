import { takeLatest } from 'redux-saga';

/* ------------- Types ------------- */

import { channelsTypes, userTypes, likedChannelsTypes } from '../Redux/';
import { StartupTypes } from '../Redux/StartupRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { getChannels } from './channels';
import { getLikedChannels } from './likedChannels';
import { login, createUser, updateProfile, sendEmailVerification, reload, sendPasswordResetEmail } from './UserSagas';

/* ------------- RootSaga ------------- */

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(channelsTypes.CHANNELS_REQUEST, getChannels),
    takeLatest(likedChannelsTypes.LIKED_CHANNELS_REQUEST, getLikedChannels),

    takeLatest(userTypes.USER_LOGIN, login),
    takeLatest(userTypes.USER_CREATE, createUser),
    takeLatest(userTypes.USER_UPDATE_PROFILE, updateProfile),
    takeLatest(userTypes.USER_SEND_EMAIL_VERIFICATION, sendEmailVerification),
    takeLatest(userTypes.USER_RELOAD, reload),
    takeLatest(userTypes.USER_SEND_PASSWORD_RESET_EMAIL, sendPasswordResetEmail),
  ];
}
