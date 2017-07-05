// @flow
import Promise from 'bluebird';
import { call, put, fork } from 'redux-saga/effects';

import type {APIResponse, TUserAuthenticateAction} from '../../types/';
import {firebaseApp, statusCode, isSuccess} from '../../Services/';
import {userActions} from '../../Redux/';

export * from './updateProfile';

const errorCodeToMessage = (code: string) => {
  let message: string = '';
  // TODO: add Firebase definition
  switch (code) {
    case 'auth/email-already-in-use':
      message = 'そのメールアドレスは既に使用されています。';
      break;
    case 'auth/invalid-email':
      message = '正しいメールアドレスを入力してください。';
      break;
    case 'auth/weak-password':
      message = '6文字以上の英数を使用したパスワードを入力してください。';
      break;
    case 'auth/user-not-found':
      message = 'メールアドレスが見つかりません。';
      break;
    case 'auth/wrong-password':
      message = 'パスワードが間違っています。';
      break;
    // no default
  }
  return message;
};

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
        message: errorCodeToMessage(error.code),
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
  const responce: APIResponse = yield call(authWithFirebase, action);
  if (!isSuccess(responce)) {
    yield put(userActions.userFailure(responce.message));
  }
}

export function* login<T>(action: TUserAuthenticateAction): Generator<T, any, any> {
  yield fork(authenticate, loginWithFirebase, action);
}

export function* createUser<T>(action: TUserAuthenticateAction): Generator<T, any, any> {
  yield fork(authenticate, createUserWithFirebase, action);
}
