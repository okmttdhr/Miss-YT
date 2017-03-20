// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelsRequest: null,
  channelsSuccess: ['channels'],
  channelsFailure: null
})

export const channelsTypes = Types
export const channelsActions = Creators

/* ------------- Initial State ------------- */

export const DEFAULT_CHANNELS = Immutable({
  channels: {},
  isFetching: null,
  errorMessage: null
})

/* ------------- Reducers ------------- */

export const channelsReducer = createReducer(DEFAULT_CHANNELS, {
  [Types.CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, channels: null }),
  [Types.CHANNELS_SUCCESS]: (state: Object, { channels }: Object) => {
    return state.merge({ isFetching: false, errorMessage: null, channels })
  },
  [Types.CHANNELS_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error', channels: null })
})
