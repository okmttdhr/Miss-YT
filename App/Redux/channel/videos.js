// @flow
import {uniqBy} from 'lodash';
import type {TDefaultChannelVideos} from '../../types/';
import {CHANNEL_VIDEOS} from '../../constants';

/* ------------- Types and Action Creators ------------- */

export const channelVideosActions = {
  channelVideosGetRequest: ['youtubeChannelId', 'initial'],
  channelVideosGetSuccess: ['videos', 'nextPageTokenVideos'],
  channelVideosGetFailure: ['errorMessageVideos'],
  channelVideosSetContentHeight: ['contentHeightVideos'],
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
  [CHANNEL_VIDEOS.GET.REQUEST]: (state, {initial}) => {
    const updates = {
      isFetchingVideos: true,
      errorMessageVideos: '',
    };
    if (initial) {
      return state.merge([updates, {videos: []}]);
    }
    return state.merge(updates);
  },
  [CHANNEL_VIDEOS.GET.SUCCESS]: (state, {videos, nextPageTokenVideos}) => {
    const newVideos = uniqBy(state.videos.concat(videos), 'videoId');
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
  CHANNEL_VIDEOS_SET_CONTENT_HEIGHT: (
    state: Object,
    {contentHeightVideos}: {contentHeightVideos: string},
  ) => {
    return state.merge({ contentHeightVideos });
  },
};
