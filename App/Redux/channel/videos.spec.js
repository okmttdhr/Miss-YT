// @flow
import test from 'ava';
import { channelActions, channelReducer, DEFAULT_CHANNEL } from './index';

test('could request for Channel', (t) => {
  const state = channelReducer(
    DEFAULT_CHANNEL,
    channelActions.channelVideosGetRequest('youtubeChannelId'),
  );
  t.true(state.isFetchingVideos);
  t.is(state.errorMessageVideos, '');
});

test('could reset videos array', (t) => {
  const state = channelReducer(
    DEFAULT_CHANNEL.merge({videos: [1, 2, 3]}),
    channelActions.channelVideosGetRequest('youtubeChannelId', true),
  );
  t.deepEqual(state.videos, []);
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
    channelActions.channelVideosGetFailure('errorMessageVideos'),
  );
  t.is(state.errorMessageVideos, 'errorMessageVideos');
});
