// @flow
import type {TDefaultChannels} from '../../../App/types/';
import {channelsStoreMock} from '../index';

export const defaultChannelsMock: TDefaultChannels = {
  items: channelsStoreMock,
  isFetching: false,
  errorMessage: '',
  contentHeight: 100,
  startAt: 1,
};
