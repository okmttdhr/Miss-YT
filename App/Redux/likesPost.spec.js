// @flow
import Immutable from 'seamless-immutable';
import test from 'ava';
import {merge} from 'lodash';
import { channelsActions, channelsReducer, DEFAULT_CHANNELS } from './channels';
import {channelsStoreWithKeyMock, channelStoreWithKeyMock, channelStoreMock} from '../../Tests/mock/';

test('could make a request to get Channels', (t) => {
  const state = channelsReducer(
    Immutable(DEFAULT_CHANNELS.merge({
      items: channelsStoreWithKeyMock(),
    })),
    channelsActions.channelsLikesPostRequest(channelStoreMock()),
  );
  t.is(state.items.ID0.isFetching, true);
  t.is(state.items.ID0.errorMessage, '');
});

test('could update Channels', (t) => {
  const itemMock = merge({}, channelStoreWithKeyMock(), {ID0: {likeCount: 10}});
  const state = channelsReducer(
    Immutable(DEFAULT_CHANNELS.merge({
      items: channelsStoreWithKeyMock(),
    })),
    channelsActions.likesPostSuccess(itemMock),
  );
  t.is(state.items.ID0.likeCount, 10);
  t.is(state.items.ID0.isFetching, false);
  t.is(state.items.ID0.errorMessage, '');
  t.deepEqual(state, DEFAULT_CHANNELS.merge([
    {items: channelsStoreWithKeyMock()},
    {items: itemMock},
  ], {deep: true}));
});

test('could update errorMessage', (t) => {
  const state = channelsReducer(
    Immutable(DEFAULT_CHANNELS.merge({
      items: channelsStoreWithKeyMock(),
    })),
    channelsActions.likesPostFailure('ID0', 'errorMessage'),
  );
  t.is(state.items.ID0.isFetching, false);
  t.is(state.items.ID0.errorMessage, 'errorMessage');
});
