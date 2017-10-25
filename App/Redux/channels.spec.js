// @flow
import test from 'ava';
import Immutable from 'seamless-immutable';
import {assign} from 'lodash';
import { channelsActions, channelsReducer, DEFAULT_CHANNELS } from './channels';
import {defaultChannelsMock, firebaseChannelMock, channelsStoreWithKeyMock} from '../../Tests/mock/';

test('could make a request to get Channels', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsRequest());
  t.true(state.isFetching);
});

test('could update Channels', (t) => {
  const state = channelsReducer(
    DEFAULT_CHANNELS,
    channelsActions.channelsSuccess(channelsStoreWithKeyMock()),
  );
  t.deepEqual(state, assign({}, DEFAULT_CHANNELS, {
    items: channelsStoreWithKeyMock(),
    startAt: 11,
  }));
});

test('could update errorMessage', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsFailure('error'));
  t.false(state.isFetching);
  t.is(state.errorMessage, 'error');
});

test('could update Channels with CHANGED event', (t) => {
  const DEFAULT_CHANNELS_MOCK = Immutable(defaultChannelsMock);
  const channelMock = firebaseChannelMock(1);
  const state = channelsReducer(
    DEFAULT_CHANNELS_MOCK,
    channelsActions.channelsChanged(channelMock),
  );
  t.deepEqual(
    state,
    DEFAULT_CHANNELS_MOCK.merge({items: {[channelMock.id]: channelMock}}, {deep: true}),
  );
});

test('could remove Channels with REMOVED event', (t) => {
  const DEFAULT_CHANNELS_MOCK = Immutable(defaultChannelsMock);
  const channelMock = firebaseChannelMock(1);
  const state = channelsReducer(
    DEFAULT_CHANNELS_MOCK,
    channelsActions.channelsRemoved(channelMock),
  );
  const newItem = DEFAULT_CHANNELS_MOCK.items.without(channelMock.id);
  t.deepEqual(state, DEFAULT_CHANNELS_MOCK.merge({items: newItem}));
});

test('could set contentHeight', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.setContentHeight(100));
  t.is(state.contentHeight, 100);
});
