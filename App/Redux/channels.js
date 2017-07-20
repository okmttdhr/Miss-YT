// @flow
import {REHYDRATE} from 'redux-persist/constants';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {PER_PAGE} from '../constants';
import type {TDefaultChannels, TChannelsActions, TChannel} from '../types/';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelsRequest: ['startAt'],
  channelsSuccess: ['items'],
  channelsFailure: null,
  channelsChanged: ['item'],
  channelsRemoved: ['item'],
  setContentHeight: ['contentHeight'],
});
export const channelsTypes = Types;
export const channelsActions: TChannelsActions = Creators;

/* ------------- Initial State ------------- */

const defaultChannels: TDefaultChannels = {
  items: {},
  isFetching: false,
  errorMessage: '',
  contentHeight: 0,
  startAt: 1,
};
export const DEFAULT_CHANNELS = Immutable(defaultChannels);

/* ------------- Reducers ------------- */

export const channelsReducer = createReducer(DEFAULT_CHANNELS, {
  [Types.CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, errorMessage: '' }),
  [Types.CHANNELS_SUCCESS]: (state: Object, { items }: Object) => {
    const newItem = state.items.merge(items);
    return state.merge({
      isFetching: false,
      errorMessage: '',
      items: newItem,
      startAt: state.startAt + PER_PAGE,
    });
  },
  [Types.CHANNELS_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error' }),
  [Types.CHANNELS_CHANGED]: (state: Object, { item }: {item: TChannel}) => {
    return state.merge({items: {[item.id]: item}}, {deep: true});
  },
  [Types.CHANNELS_REMOVED]: (state: Object, { item }: {item: TChannel}) => {
    const newItem = state.items.without(item.id);
    return state.merge({items: newItem});
  },
  [Types.SET_CONTENT_HEIGHT]: (state: Object, {contentHeight}: Object) =>
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
