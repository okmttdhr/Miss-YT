// @flow
import Immutable from 'seamless-immutable';
import {findLastKey} from 'lodash';
import type {TChannelStoreWithKey} from '../types/';

/* ------------- Types and Action Creators ------------- */

export const likesPostActions = {
  likesPostRequest: ['channelId'],
  likesPostSuccess: ['item'],
  likesPostFailure: ['channelId', 'errorMessage'],
  likesPostIncrease: ['item'],
};

/* ------------- Reducers ------------- */

export const likesPostReducer = {
  LIKES_POST_REQUEST: (state: Object, { channelId }: {channelId: string}) => {
    const update = {[channelId]: {isFetching: true, errorMessage: ''}};
    return state.merge({
      items: update,
    }, {deep: true});
  },
  LIKES_POST_SUCCESS: (state: Object, { item }: TChannelStoreWithKey) => {
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
  LIKES_POST_INCREASE: (state: Object, { channelId }: Object) => {
    const increasedlikeCount = state.items[channelId].likeCount + 1;
    const update = {[channelId]: {likeCount: increasedlikeCount}};
    return state.merge({
      items: update,
    }, {deep: true});
  },
};
