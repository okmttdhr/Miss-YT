// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type {TDefaultChannels, TChannelsActions} from '../types/Redux/ChannelsRedux';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelsRequest: ['startAt'],
  channelsSuccess: ['items'],
  channelsFailure: null,
  setContentHeight: ['height'],
});
export const channelsTypes = Types;
export const channelsActions: TChannelsActions = Creators;

/* ------------- Initial State ------------- */

const defaultChannels: TDefaultChannels = {
  items: {},
  isFetching: false,
  errorMessage: '',
  contentHeight: 0,
};
export const DEFAULT_CHANNELS = Immutable(defaultChannels);

/* ------------- Reducers ------------- */

export const channelsReducer = createReducer(DEFAULT_CHANNELS, {
  [Types.CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, errorMessage: '' }),
  [Types.CHANNELS_SUCCESS]: (state: Object, { items }: Object) =>
    state.merge({ isFetching: false, errorMessage: '', items }),
  [Types.CHANNELS_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error', items: {} }),
  [Types.SET_CONTENT_HEIGHT]: (state: Object, {height}: Object) =>
    state.merge({ contentHeight: height }),
});
