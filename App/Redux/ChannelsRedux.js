// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {PER_PAGE} from '../constants';
import type {TDefaultChannels, TChannelsActions} from '../types/Redux/ChannelsRedux';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelsRequest: ['startAt'],
  channelsSuccess: ['items'],
  channelsFailure: null,
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
  [Types.SET_CONTENT_HEIGHT]: (state: Object, {contentHeight}: Object) =>
    state.merge({ contentHeight }),
});
