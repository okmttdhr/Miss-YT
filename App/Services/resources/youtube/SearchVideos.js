// @flow
import Secrets from 'react-native-config';
import {API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_SEARCH} from '../../../constants/';
import {Resource} from '../index';

export class SearchVideosResource extends Resource {
  constructor() {
    super(API_ENDPOINT_YOUTUBE);
  }
  GET(channelId: string): Promise<any> {
    return super.get(API_ENDPOINT_YOUTUBE_SEARCH, {
      key: Secrets.YOUTUBE_API_KEY,
      part: 'snippet, id',
      type: 'videos',
      channelId,
    });
  }
}
