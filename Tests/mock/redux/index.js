// @flow
import type {TDefaultChannels, TDefaultUser, TUserActions} from '../../../App/types/';
import {channelsStoreWithKeyMock} from '../channel';
import {userMock} from '../user';
import {noop} from '../utils';

export * from './channel';

export const defaultChannelsMock: TDefaultChannels = {
  items: channelsStoreWithKeyMock(),
  isFetching: false,
  errorMessage: '',
  contentHeight: 100,
  startAt: 1,
};

export const defaultUserMock: TDefaultUser = {
  item: userMock,
  isForgotPassword: false,
  isFetching: false,
  errorMessage: '',
};

export const userActionsMock: TUserActions = {
  userRequest: noop,
  userLogin: (email: string, password: string) => {
    console.log('userActionsMock.userLogin');
    console.log(email, password);
  },
  userCreate: (email: string, password: string) => {
    console.log('userActionsMock.userCreate');
    console.log(email, password);
  },
  userSuccess: noop,
  userFailure: noop,
  userUpdateProfile: noop,
  userSendEmailVerification: noop,
  userReload: noop,
  userSwitchForgotPassword: noop,
  userSendPasswordResetEmail: noop,
};
