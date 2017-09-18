// @flow
import Immutable from 'seamless-immutable';
import {findLastKey} from 'lodash';
import type {TChannelStoreWithKey, TChannelStore} from '../types/';

/* ------------- Types and Action Creators ------------- */

export const likesPostActions = (type: string) => {
  return {
    [`${type}LikesPostRequest`]: ['channel'],
    likesPostSuccess: ['item'],
    likesPostFailure: ['channelId', 'errorMessage'],
    [`${type}LikesPostIncrease`]: ['item'],
  };
};

/* ------------- Reducers ------------- */

export const likesPostReducer = (TYPE: string) => {
  return {
    [`${TYPE}_LIKES_POST_REQUEST`]: (state: Object, { channel }: {channel: TChannelStore}) => {
      const update = {[channel.id]: {isFetching: true, errorMessage: ''}};
      return state.merge({
        items: update,
      }, {deep: true});
    },
    LIKES_POST_SUCCESS: (state: Object, { item }: {item: TChannelStoreWithKey}) => {
      const key = item[findLastKey(item)].id;
      const update = {[key]: {isFetching: false, errorMessage: ''}};
      return state.merge({
        items: Immutable(item).merge(update, {deep: true}),
      }, {deep: true});
    },
    LIKES_POST_FAILURE: (state: Object, { channelId, errorMessage }: Object) => {
      const update = {[channelId]: {isFetching: false, errorMessage}};
      return state.merge({
        items: update,
      }, {deep: true});
    },
    [`${TYPE}_LIKES_POST_INCREASE`]: (state: Object, { channelId }: Object) => {
      const increasedlikeCount = state.items[channelId].likeCount + 1;
      const update = {[channelId]: {likeCount: increasedlikeCount}};
      return state.merge({
        items: update,
      }, {deep: true});
    },
  };
};
