// @flow
import test from 'ava';
import nock from 'nock';
import {youtubeSearchResponseArrayMock, youtubeListResponseMock} from '../../../../Tests/mock';
import { API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_SEARCH } from '../../../constants/';
import { SearchVideosResource } from './SearchVideos';

test('could make a request with channelId', async (t) => {
  const searchVideosResource = new SearchVideosResource();
  nock(API_ENDPOINT_YOUTUBE)
    .get(API_ENDPOINT_YOUTUBE_SEARCH)
    .query({
      key: 'YOUTUBE_API_KEY',
      part: 'snippet, id',
      type: 'video',
      maxResults: 10,
      channelId: 'channelID',
      pageToken: '',
    })
    .reply(200, youtubeListResponseMock(youtubeSearchResponseArrayMock));
  const res = await searchVideosResource.GET('channelID');
  t.is(res.status, 200);
  t.is(res.nextPageToken, 'NEXTPAGETOKEN0');
  t.is(res.videos.length, 10);
  t.deepEqual(res.videos[0], {
    videoId: 'VIDEOID0',
    channelId: 'CHANNELID0',
    title: 'TITLE0',
    thumbnail: 'URL0',
  });
});
