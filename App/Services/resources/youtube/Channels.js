// @flow
import Secrets from 'react-native-config'
import {API_ENDPOINT_YOUTUBE_CHANNELS} from '../../../constants/'
import {YouTubeResource} from './Resource'

export const YOUTUBE_RESOURCE_PARAMETER_PART = 'snippet, brandingSettings, statistics'

export class ChannelsResource extends YouTubeResource {
  get (channelIDs: string) {
    return super.get(API_ENDPOINT_YOUTUBE_CHANNELS, {
      key: Secrets.YOUTUBE_API_KEY,
      part: YOUTUBE_RESOURCE_PARAMETER_PART,
      id: channelIDs
    })
  }
}
