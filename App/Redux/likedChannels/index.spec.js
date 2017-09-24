// @flow
import test from 'ava';
import Immutable from 'seamless-immutable';
import {assign} from 'lodash';
import { likedChannelsActions, likedChannelsReducer, DEFAULT_LIKED_CHANNELS } from '../likedChannels';
import {defaultChannelsMock, firebaseChannelMock, channelsStoreWithKeyMock, likeMock} from '../../../Tests/mock/';

test('could make a request to get liked Channels', (t) => {
  const state = likedChannelsReducer(
    DEFAULT_LIKED_CHANNELS,
    likedChannelsActions.likedChannelsRequest(),
  );
  t.true(state.isFetching);
});

test('could update liked Channels', (t) => {
  const state = likedChannelsReducer(
    DEFAULT_LIKED_CHANNELS,
    likedChannelsActions.likedChannelsSuccess(channelsStoreWithKeyMock()),
  );
  t.deepEqual(state, assign({}, DEFAULT_LIKED_CHANNELS, {
    items: channelsStoreWithKeyMock(),
    startAt: 1,
  }));
});

test('could update where next page startAt', (t) => {
  const state = likedChannelsReducer(
    DEFAULT_LIKED_CHANNELS,
    likedChannelsActions.likedChannelsPaginate(),
  );
  t.deepEqual(state, assign({}, DEFAULT_LIKED_CHANNELS, {
    startAt: 11,
  }));
});

test('could update errorMessage', (t) => {
  const state = likedChannelsReducer(
    DEFAULT_LIKED_CHANNELS,
    likedChannelsActions.likedChannelsFailure(),
  );
  t.false(state.isFetching);
  t.is(state.errorMessage, 'error');
});

test('could update liked Channels with CHANGED event', (t) => {
  const DEFAULT_CHANNELS_MOCK = Immutable(defaultChannelsMock);
  const channelMock = firebaseChannelMock(2);
  const state = likedChannelsReducer(
    DEFAULT_CHANNELS_MOCK,
    likedChannelsActions.likedChannelsChanged(channelMock),
  );
  t.deepEqual(
    state,
    DEFAULT_CHANNELS_MOCK.merge({items: {[channelMock.id]: channelMock}}, {deep: true}),
  );
});

test('could remove liked Channels with REMOVED event', (t) => {
  const DEFAULT_CHANNELS_MOCK = Immutable(defaultChannelsMock);
  const channelMock = firebaseChannelMock(2);
  const state = likedChannelsReducer(
    DEFAULT_CHANNELS_MOCK,
    likedChannelsActions.likedChannelsRemoved(channelMock),
  );
  const newItem = DEFAULT_CHANNELS_MOCK.items.without(channelMock.id);
  t.deepEqual(state, DEFAULT_CHANNELS_MOCK.merge({items: newItem}));
});

test("could update liked Channels with likes' CHANGED event", (t) => {
  const DEFAULT_CHANNELS_MOCK = Immutable(defaultChannelsMock);
  const state = likedChannelsReducer(
    DEFAULT_CHANNELS_MOCK,
    likedChannelsActions.likesChanged(likeMock()),
  );
  t.deepEqual(state, DEFAULT_CHANNELS_MOCK.merge({items: {CHANNELID0: {
    rank: 0,
    likeCount: 0,
  }}}, {deep: true}));
});

test('could set contentHeight', (t) => {
  const state = likedChannelsReducer(
    DEFAULT_LIKED_CHANNELS,
    likedChannelsActions.likedChannelsSetContentHeight(100),
  );
  t.is(state.contentHeight, 100);
});
