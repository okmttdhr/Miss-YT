// @flow
import Secrets from 'react-native-config'
import {API_ENDPOINT_YOUTUBE_CHANNELS} from '../../../constants/'
import {YouTubeResource} from './Resource'

export class ChannelsResource extends YouTubeResource {
  get (channelIDs: string) {
    return super.get(API_ENDPOINT_YOUTUBE_CHANNELS, {
      key: Secrets.YOUTUBE_API_KEY,
      part: 'snippet, brandingSettings, statistics',
      id: channelIDs
    })
  }
}
