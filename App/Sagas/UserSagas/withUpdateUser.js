// @flow
import { call, put, fork } from 'redux-saga/effects';

import type {APIResponse, TUserUpdateProfileAction} from '../../types/';
import {
  isSuccess,
  convertUserFromFirebaseToStore,
  sendEmailVerificationWithFirebase,
  updateProfileToFirebase,
  currentUserReload,
} from '../../Services/';
import {userActions} from '../../Redux/';

export function* withUpdateUser<T>(
  effect: (...args: any) => any,
  args: Array<any> = [],
): Generator<T, any, any> {
  yield put(userActions.userRequest());
  const responce: APIResponse = yield call(effect, ...args);
  if (!isSuccess(responce)) {
    yield put(userActions.userFailure(responce.message));
    return;
  }
  yield put(userActions.userSuccess(convertUserFromFirebaseToStore(responce.user)));
}

export function* sendEmailVerification<T>(): Generator<T, any, any> {
  yield fork(withUpdateUser, sendEmailVerificationWithFirebase);
}

export function* reload<T>(): Generator<T, any, any> {
  yield fork(withUpdateUser, currentUserReload);
}

export function* updateProfile<T>(action: TUserUpdateProfileAction): Generator<T, any, any> {
  yield fork(withUpdateUser, updateProfileToFirebase, [action.updates]);
}
