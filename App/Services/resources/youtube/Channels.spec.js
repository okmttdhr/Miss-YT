// @flow
import test from 'ava';
import nock from 'nock';
import { ChannelsResource, YOUTUBE_RESOURCE_PARAMETER_PART } from './index';
import { API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_CHANNELS } from '../../../constants/';

test('should make a request with CHANNEL_IDS', async (t) => {
  const CHANNEL_IDS = 'channelID_1, channelID_2, channelID_3';
  const channelsResource = new ChannelsResource();
  nock(API_ENDPOINT_YOUTUBE)
    .get(`${API_ENDPOINT_YOUTUBE_CHANNELS}`)
    .query({
      key: 'YOUTUBE_API_KEY',
      part: YOUTUBE_RESOURCE_PARAMETER_PART,
      id: CHANNEL_IDS,
    })
    .reply(200, { isMock: true });
  const res = await channelsResource.GET(CHANNEL_IDS);
  t.is(res.data.isMock, true);
});
