// @flow
import {REHYDRATE} from 'redux-persist/constants';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {PER_PAGE} from '../constants';
import type {TDefaultLikedChannels, TLikedChannelsActions, TChannel} from '../types/';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  likedChannelsRequest: ['startAt'],
  likedChannelsSuccess: ['items'],
  likedChannelsFailure: null,
  likedChannelsChanged: ['item'],
  likedChannelsRemoved: ['item'],
  likedChannelsSetContentHeight: ['contentHeight'],
});
export const likedChannelsTypes = Types;
export const likedChannelsActions: TLikedChannelsActions = Creators;

/* ------------- Initial State ------------- */

const defaultLikedChannels: TDefaultLikedChannels = {
  items: {},
  isFetching: false,
  errorMessage: '',
  contentHeight: 0,
  startAt: 1,
};
export const DEFAULT_LIKED_CHANNELS = Immutable(defaultLikedChannels);

/* ------------- Reducers ------------- */

export const likedChannelsReducer = createReducer(DEFAULT_LIKED_CHANNELS, {
  [Types.LIKED_CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, errorMessage: '' }),
  [Types.LIKED_CHANNELS_SUCCESS]: (state: Object, { items }: Object) => {
    const newItem = state.items.merge(items);
    return state.merge({
      isFetching: false,
      errorMessage: '',
      items: newItem,
      startAt: state.startAt + PER_PAGE,
    });
  },
  [Types.LIKED_CHANNELS_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error' }),
  [Types.LIKED_CHANNELS_CHANGED]: (state: Object, { item }: {item: TChannel}) => {
    return state.merge({items: {[item.id]: item}}, {deep: true});
  },
  [Types.LIKED_CHANNELS_REMOVED]: (state: Object, { item }: {item: TChannel}) => {
    const newItem = state.items.without(item.id);
    return state.merge({items: newItem});
  },
  [Types.LIKED_CHANNELS_SET_CONTENT_HEIGHT]: (state: Object, {contentHeight}: Object) =>
    state.merge({ contentHeight }),
  [REHYDRATE]: (state: Object) => {
    return state.merge({
      isFetching: false,
      errorMessage: '',
      contentHeight: 0,
      startAt: 1,
    });
  },
});
