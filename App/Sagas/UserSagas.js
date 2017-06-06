// @flow
import Promise from 'bluebird';
import { call, put, fork } from 'redux-saga/effects';

import type {APIResponse} from '../types/';
import {firebaseApp, statusCode, isSuccess} from '../Services/';
import {userActions} from '../Redux/';

export const createUserWithFirebase = () => {
  return firebaseApp.auth().createUserWithEmailAndPassword('@gmail.com', 'password')
    .then(() => {
      return {
        status: statusCode.Ok,
        message: '',
      };
    })
    .catch(() => {
      return {
        status: statusCode.InternalError,
        message: '',
      };
    });
};

export const loginWithFirebase = () => {
  return firebaseApp.auth().signInWithEmailAndPassword('@gmail.com', 'password')
    .then(() => {
      return {
        status: statusCode.Ok,
        message: '',
      };
    })
    .catch(() => {
      return {
        status: statusCode.InternalError,
        message: '',
      };
    });
};

export function* authenticate<T>(
  authWithFirebase: () => Promise<APIResponse>,
): Generator<T, any, any> {
  yield put(userActions.userRequest());
  const responce: APIResponse = yield call(authWithFirebase);
  if (!isSuccess(responce)) {
    yield put(userActions.userFailure());
  }
}

export function* login<T>(): Generator<T, any, any> {
  yield fork(authenticate, loginWithFirebase);
}

export function* createUser<T>(): Generator<T, any, any> {
  yield fork(authenticate, createUserWithFirebase);
}
