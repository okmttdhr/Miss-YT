// @flow
import type {TDefaultChannels, TDefaultUser} from '../../../App/types/';
import {channelsStoreWithKeyMock} from '../channel';
import {userMock} from '../user';

export const defaultChannelsMock: TDefaultChannels = {
  items: channelsStoreWithKeyMock(),
  isFetching: false,
  errorMessage: '',
  contentHeight: 100,
  startAt: 1,
};

export const defaultUserMock: TDefaultUser = {
  item: userMock,
  isFetching: false,
  errorMessage: '',
};
