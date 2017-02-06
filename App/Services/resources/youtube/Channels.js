// @flow
import {YouTubeResource} from './Resource'
import {API_ENDPOINT_YOUTUBE_CHANNELS} from '../../../constants/'
import Secrets from 'react-native-config'

export class ChannelsResource extends YouTubeResource {
  get (channelIDs: string) {
    return super.get(API_ENDPOINT_YOUTUBE_CHANNELS, {
      key: Secrets.YOUTUBE_API_KEY,
      part: 'snippet, brandingSettings, statistics',
      id: channelIDs
    })
  }
}
