// @flow
import test from 'ava';
import { channelActions, channelReducer, DEFAULT_CHANNEL } from './index';

test('could request for Channel', (t) => {
  const state = channelReducer(
    DEFAULT_CHANNEL,
    channelActions.channelMyInfoGetRequest('channelId'),
  );
  t.true(state.isFetchingMyInfo);
  t.is(state.errorMessageMyInfo, '');
  t.deepEqual(state.itemMyInfo, {
    rank: 0,
    likeCount: 0,
  });
});

test('could update Channel', (t) => {
  const state = channelReducer(
    DEFAULT_CHANNEL,
    channelActions.channelMyInfoGetSuccess({rank: 1, likeCount: 1}),
  );
  t.deepEqual(state.itemMyInfo, {rank: 1, likeCount: 1});
});

test('could update errorMessage', (t) => {
  const state = channelReducer(
    DEFAULT_CHANNEL,
    channelActions.channelMyInfoGetFailure('errorMessageMyInfo'),
  );
  t.is(state.errorMessageMyInfo, 'errorMessageMyInfo');
});
