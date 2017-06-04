// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select, fork } from 'redux-saga/effects';

import type {TRootState, APIResponse} from '../types/';
import {firebaseApp, statusCode, isSuccess} from '../Services/';
import {userActions} from '../Redux/';

const createUserWithFirebase = () => {
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

const loginWithFirebase = () => {
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

function* authenticate(authWithFirebase) {
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
