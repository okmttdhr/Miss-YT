// @flow
import {range} from 'lodash';

export * from './firebase';
export * from './channel';
export * from './like';
export * from './user';
export * from './utils';
export * from './response';
export * from './redux';

export const youtubeListResponseMock = (items: Array<any>, i: number = 0) => {
  return {
    nextPageToken: `NEXTPAGETOKEN${i}`,
    prevPageToken: `PREVPAGETOKEN${i}`,
    pageInfo: {
      totalResults: i,
      resultsPerPage: i,
    },
    items,
  };
};

export const youtubeSearchResponseMock = (i: number = 0) => {
  return {
    id: {
      kind: `KIND${i}`,
      videoId: `VIDEOID${i}`,
      channelId: `CHANNELID${i}`,
      playlistId: `PLAYLISTID${i}`,
    },
    snippet: {
      publishedAt: `PUBLISHEDAT${i}`,
      channelId: `CHANNELID${i}`,
      title: `TITLE${i}`,
      description: `DESCRIPTION${i}`,
      thumbnails: {
        default: {
          url: `URL${i}`,
          width: i,
          height: i,
        },
      },
      channelTitle: `channelTitle${i}`,
    },
  };
};

export const youtubeSearchResponseArrayMock = range(10).map((i) => {
  return youtubeSearchResponseMock(i);
});
