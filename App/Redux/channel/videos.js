// @flow
import type {TDefaultChannelVideos} from '../../types/';
import {CHANNEL_VIDEOS} from '../../constants';

/* ------------- Types and Action Creators ------------- */

export const channelVideosActions = {
  channelVideosGetRequest: ['youtubeChannelId'],
  channelVideosGetSuccess: ['videos', 'nextPageTokenVideos'],
  channelVideosGetFailure: ['errorMessageVideos'],
};

/* ------------- Initial State ------------- */

export const defaultChannelVideos: TDefaultChannelVideos = {
  videos: [],
  isFetchingVideos: false,
  errorMessageVideos: '',
  contentHeightVideos: 0,
  nextPageTokenVideos: '',
};

/* ------------- Reducers ------------- */

export const channelVideosReducer = {
  [CHANNEL_VIDEOS.GET.REQUEST]: (state) => {
    return state.merge({
      isFetchingVideos: true,
      errorMessageVideos: '',
    });
  },
  [CHANNEL_VIDEOS.GET.SUCCESS]: (state, {videos, nextPageTokenVideos}) => {
    const newVideos = state.videos.concat(videos);
    return state.merge({
      videos: newVideos,
      nextPageTokenVideos,
      isFetchingVideos: false,
      errorMessageVideos: '',
    });
  },
  [CHANNEL_VIDEOS.GET.FAILURE]: (state, {errorMessageVideos}: {errorMessageVideos: string}) => {
    return state.merge({
      isFetchingVideos: false,
      errorMessageVideos,
    });
  },
};
