import test from 'ava'
import nock from 'nock'
import {YouTubeResource, YOUTUBE_RESOURCE_PARAMETER_PART} from './index'
import {API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_CHANNELS} from '../../../constants/'

test('should make a GET request', async t => {
  const CHANNEL_IDS = 'channelID_1, channelID_2, channelID_3'
  const parameters = {
    key: 'YOUTUBE_API_KEY',
    part: YOUTUBE_RESOURCE_PARAMETER_PART,
    id: CHANNEL_IDS
  }
  const youTubeResource = new YouTubeResource()
  nock(API_ENDPOINT_YOUTUBE)
    .get(`${API_ENDPOINT_YOUTUBE_CHANNELS}`)
    .query(parameters)
    .reply(200, {isMock: true})
  const res = await youTubeResource.get(API_ENDPOINT_YOUTUBE_CHANNELS, parameters)
  t.is(res.data.isMock, true)
})
