// @flow
import test from 'ava';
import {assign} from 'lodash';
import { channelsActions, channelsReducer, DEFAULT_CHANNELS } from './ChannelsRedux';

test('could make a request to get Channels', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsRequest());
  t.true(state.isFetching);
});

test('could update Channels', (t) => {
  const channelsMock = { isMock: true };
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsSuccess(channelsMock));
  t.deepEqual(state, assign({}, DEFAULT_CHANNELS, {
    items: channelsMock,
    startAt: 11,
  }));
});

test('could update errorMessage', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsFailure());
  t.false(state.isFetching);
  t.is(state.errorMessage, 'error');
});

test('could set contentHeight', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.setContentHeight(100));
  t.is(state.contentHeight, 100);
});
