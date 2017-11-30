// @flow
import Secrets from 'react-native-config';
import type {APIResponse, TYouTubeListResponse, TYouTubeSearchResponse, TVideo} from '../../../types';
import {API_ENDPOINT_YOUTUBE, API_ENDPOINT_YOUTUBE_SEARCH} from '../../../constants/';
import {Resource} from '../index';
import {handleServerError} from '../../response';

export class SearchVideosResource extends Resource {
  constructor() {
    super(API_ENDPOINT_YOUTUBE);
  }
  GET(channelId: string, pageToken?: string = ''): Promise<APIResponse> {
    console.log('pageToken', pageToken);
    return handleServerError(
      super.get(API_ENDPOINT_YOUTUBE_SEARCH, {
        key: Secrets.YOUTUBE_API_KEY,
        part: 'snippet, id',
        type: 'video',
        maxResults: 10,
        channelId,
        pageToken,
      })
      .then((response: {data: TYouTubeListResponse<TYouTubeSearchResponse>}) => {
        return {
          status: 200,
          message: '',
          videos: response.data.items.map((item): TVideo => {
            return {
              videoId: item.id.videoId,
              channelId: item.id.channelId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.medium.url,
            };
          }),
          nextPageToken: response.data.nextPageToken,
        };
      }),
    );
  }
}
