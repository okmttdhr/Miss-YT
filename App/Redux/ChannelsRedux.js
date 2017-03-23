// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  channelsRequest: null,
  channelsSuccess: ['items'],
  channelsFailure: null
})

export const channelsTypes = Types
export const channelsActions = Creators

/* ------------- Initial State ------------- */

export const DEFAULT_CHANNELS = Immutable({
  items: {},
  isFetching: null,
  errorMessage: null
})

/* ------------- Reducers ------------- */

export const channelsReducer = createReducer(DEFAULT_CHANNELS, {
  [Types.CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, items: {} }),
  [Types.CHANNELS_SUCCESS]: (state: Object, { items }: Object) => {
    console.log(items)
    return state.merge({ isFetching: false, errorMessage: null, items })
  },
  [Types.CHANNELS_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error', items: {} })
})
