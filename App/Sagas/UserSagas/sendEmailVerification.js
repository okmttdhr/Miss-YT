// @flow
import { call, put } from 'redux-saga/effects';

import type {APIResponse} from '../../types/';
import {sendEmailVerificationWithFirebase, isSuccess, convertUserFromFirebaseToStore} from '../../Services/';
import {userActions} from '../../Redux/';

// TODO userのメソッド投げる時のパターンで共通化…
export function* sendEmailVerification<T>(): Generator<T, any, any> {
  yield put(userActions.userRequest());
  const responce: APIResponse = yield call(sendEmailVerificationWithFirebase);
  if (!isSuccess(responce)) {
    yield put(userActions.userFailure(responce.message));
    return;
  }
  yield put(userActions.userSuccess(convertUserFromFirebaseToStore(responce.user)));
}
