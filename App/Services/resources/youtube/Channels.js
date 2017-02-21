// @flow
import Secrets from 'react-native-config'
import {API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_CHANNELS} from '../../../constants/'
import {Resource} from '../index'

export const YOUTUBE_RESOURCE_PARAMETER_PART = 'snippet, brandingSettings, statistics'

export class ChannelsResource extends Resource {
  constructor () {
    super(API_ENDPOINT_YOUTUBE)
  }
  get (channelIDs: string): Promise<any> {
    return super.get(API_ENDPOINT_YOUTUBE_CHANNELS, {
      key: Secrets.YOUTUBE_API_KEY,
      part: YOUTUBE_RESOURCE_PARAMETER_PART,
      id: channelIDs
    })
  }
}
