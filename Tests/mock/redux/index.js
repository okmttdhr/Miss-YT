// @flow
import type {TDefaultChannels} from '../../../App/types/';
import {channelsStoreWithKeyMock} from '../index';

export const defaultChannelsMock: TDefaultChannels = {
  items: channelsStoreWithKeyMock(),
  isFetching: false,
  errorMessage: '',
  contentHeight: 100,
  startAt: 1,
};
