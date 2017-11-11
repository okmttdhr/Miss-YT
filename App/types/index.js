// @flow
export * from './Redux';
export * from './channel';
export * from './like';
export * from './User';
export * from './video';
export * from './APIResponse';

export type TYouTubeListResponse<T> = {
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<T>;
}

export type TYouTubeSearchResponse = {
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      }
    };
    channelTitle: string;
  }
}
