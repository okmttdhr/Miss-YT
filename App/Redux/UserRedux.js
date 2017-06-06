// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type {TDefaultUser, TUserActions} from '../types/';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: null,
  userLogin: null,
  userCreate: null,
  userSuccess: ['item'],
  userFailure: null,
});
export const userTypes = Types;
export const userActions: TUserActions = Creators;

/* ------------- Initial State ------------- */

const defaultItem = {
  displayName: '',
  email: '',
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: '',
  photoURL: '',
  providerData: [],
  providerId: '',
  refreshToken: '',
  uid: '',
};

export const defaultUser: TDefaultUser = {
  item: defaultItem,
  isFetching: false,
  errorMessage: '',
};
export const DEFAULT_USER = Immutable(defaultUser);

/* ------------- Reducers ------------- */

export const userReducer = createReducer(DEFAULT_USER, {
  [Types.USER_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, errorMessage: '' }),
  [Types.USER_SUCCESS]: (state: Object, { item }: Object) => {
    return state.merge({
      item,
      isFetching: false,
      errorMessage: '',
    });
  },
  [Types.USER_FAILURE]: (state: Object) =>
    state.merge({ isFetching: false, errorMessage: 'error' }),
});
