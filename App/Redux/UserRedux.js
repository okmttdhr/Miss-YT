// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {REHYDRATE} from 'redux-persist/constants';
import type {TDefaultUser, TUserActions} from '../types/';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: null,
  userLogin: ['email', 'password'],
  userCreate: ['email', 'password'],
  userSuccess: ['item'],
  userFailure: ['errorMessage'],
  userUpdateProfile: ['updates'],
  userSendEmailVerification: null,
  userReload: null,
  userSwitchForgotPassword: null,
  userSendPasswordResetEmail: ['email'],
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
  isForgotPassword: false,
  isFetching: false,
  errorMessage: '',
};
export const DEFAULT_USER = Immutable(defaultUser);

/* ------------- Reducers ------------- */

export const userReducer = createReducer(DEFAULT_USER, {
  [Types.USER_REQUEST]: (state: Object) => {
    return state.merge({ isFetching: true, errorMessage: '' });
  },
  [Types.USER_SUCCESS]: (state: Object, { item }: Object) => {
    return state.merge({
      item,
      isFetching: false,
      errorMessage: '',
    });
  },
  [Types.USER_FAILURE]: (state: Object, { errorMessage = '' }: Object) =>
    state.merge({ isFetching: false, errorMessage }),
  [Types.USER_SWITCH_FORGOT_PASSWORD]: (state: Object) => {
    return state.merge({ isForgotPassword: !state.isForgotPassword });
  },
  [REHYDRATE]: (state: Object) => {
    return state.merge({
      isForgotPassword: false,
      isFetching: false,
      errorMessage: '',
    });
  },
});
