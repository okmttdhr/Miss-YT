// @flow
export const API_TIMEOUT = 10000;

export const API_ENDPOINT_YOUTUBE = 'https://www.googleapis.com/youtube/v3';
export const API_ENDPOINT_YOUTUBE_CHANNELS = '/channels';
export const API_ENDPOINT_YOUTUBE_SEARCH = '/search';

export const COLOR_RED = '#ED4956';
export const PER_PAGE = 10;

type IAsyncConstants = {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
};

type IRESTConstants = {
  GET: IAsyncConstants;
  POST: IAsyncConstants;
  PUT: IAsyncConstants;
  DELETE: IAsyncConstants;
};

const createAsyncConstants = (constant: string): IAsyncConstants => (
  {
    REQUEST: `${constant}_REQUEST`,
    SUCCESS: `${constant}_SUCCESS`,
    FAILURE: `${constant}_FAILURE`,
  }
);

export const createRESTConstants = (constant: string): IRESTConstants => (
  {
    GET: createAsyncConstants(`${constant}_GET`),
    POST: createAsyncConstants(`${constant}_POST`),
    PUT: createAsyncConstants(`${constant}_PUT`),
    DELETE: createAsyncConstants(`${constant}_DELETE`),
  }
);

export const CHANNEL_MY_INFO = createRESTConstants('CHANNEL_MY_INFO');
export const CHANNEL_VIDEOS = createRESTConstants('CHANNEL_VIDEOS');
