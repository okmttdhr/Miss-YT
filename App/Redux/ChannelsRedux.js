// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type {TDefaultChannels} from '../types/Redux/ChannelsRedux';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelsRequest: null,
  channelsSuccess: ['items'],
  channelsFailure: null,
});
export const channelsTypes = Types;
export const channelsActions = Creators;

/* ------------- Initial State ------------- */

const defaultChannels: TDefaultChannels = {
  items: {},
  isFetching: false,
  errorMessage: '',
};
export const DEFAULT_CHANNELS = Immutable(defaultChannels);

/* ------------- Reducers ------------- */

export const channelsReducer = createReducer(DEFAULT_CHANNELS, {
  [Types.CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, items: {} }),
  [Types.CHANNELS_SUCCESS]: (state: Object, { items }: Object) => state.merge({ isFetching: false, errorMessage: '', items }),
  [Types.CHANNELS_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error', items: {} }),
});
