// @flow
import Promise from 'bluebird';
import { call, put, fork } from 'redux-saga/effects';

import type {APIResponse, TUserAuthenticateAction} from '../../types/';
import {
  firebaseApp,
  statusCode,
  isSuccess,
  sendEmailVerificationWithFirebase,
  authErrorToMessage,
} from '../../Services/';
import {userActions} from '../../Redux/';

const authenticationResult = (promise: Promise<any>): Promise<APIResponse> => {
  return promise
    .then(() => {
      return {
        status: statusCode.Ok,
        message: '',
      };
    })
    .catch((error) => {
      return {
        status: statusCode.InternalError,
        message: authErrorToMessage(error.code),
      };
    });
};

export const createUserWithFirebase = ({email, password}: TUserAuthenticateAction) => {
  return authenticationResult(firebaseApp.auth().createUserWithEmailAndPassword(email, password));
};

export const loginWithFirebase = ({email, password}: any) => {
  return authenticationResult(firebaseApp.auth().signInWithEmailAndPassword(email, password));
};

export function* authenticate<T>(
  authWithFirebase: () => Promise<APIResponse>,
  action: TUserAuthenticateAction,
): Generator<T, any, any> {
  yield put(userActions.userRequest());
  const response: APIResponse = yield call(authWithFirebase, action);
  if (!isSuccess(response)) {
    yield put(userActions.userFailure(response.message));
    return;
  }
  yield call(sendEmailVerificationWithFirebase);
}

export function* login<T>(action: TUserAuthenticateAction): Generator<T, any, any> {
  yield fork(authenticate, loginWithFirebase, action);
}

export function* createUser<T>(action: TUserAuthenticateAction): Generator<T, any, any> {
  yield fork(authenticate, createUserWithFirebase, action);
}
