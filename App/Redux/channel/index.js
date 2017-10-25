// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type {TDefaultChannel, TChannelActions, TChannelStore} from '../../types/';
// import {defaultChannelVideos, channelVideosActions, channelVideosReducer} from './channelVideos';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelSelect: ['item'],
  // ...channelVideosActions,
});
export const channelTypes = Types;
export const channelActions: TChannelActions = Creators;

/* ------------- Initial State ------------- */

const defaultItem = {
  id: '',
  createdAt: 0,
  modifiedAt: 0,
  rank: 0,
  score: 0,
  likeCount: 0,
  status: 'inactive',
  youtube: {
    id: '',
    name: '',
    description: '',
    thumbnail: '',
    banner: '',
    subscriberCount: 0,
    viewCount: 0,
  },
  isLiked: false,
  isFetching: false,
  errorMessage: '',
};

const defaultChannel: TDefaultChannel = {
  item: defaultItem,
  isFetching: false,
  errorMessage: '',
  // ...defaultChannelVideos,
};
export const DEFAULT_CHANNEL = Immutable(defaultChannel);

/* ------------- Reducers ------------- */

export const channelReducer = createReducer(DEFAULT_CHANNEL, {
  [Types.CHANNEL_SELECT]: (state: Object, { item }: {item: TChannelStore}) => {
    return state.merge({
      isFetching: false,
      errorMessage: '',
      item,
    });
  },
  // ...channelVideosReducer,
});
