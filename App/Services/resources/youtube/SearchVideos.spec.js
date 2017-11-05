// @flow
import test from 'ava';
import nock from 'nock';
import { SearchVideosResource } from './SearchVideos';
import { API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_SEARCH } from '../../../constants/';

test('could make a request with channelId', async (t) => {
  const searchVideosResource = new SearchVideosResource();
  nock(API_ENDPOINT_YOUTUBE)
    .get(API_ENDPOINT_YOUTUBE_SEARCH)
    .query({
      key: 'YOUTUBE_API_KEY',
      part: 'snippet, id',
      type: 'videos',
      channelId: 'channelID',
    })
    .reply(200, { isMock: true });
  const res = await searchVideosResource.GET('channelID');
  t.is(res.data.isMock, true);
});
