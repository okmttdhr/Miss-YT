// @flow
import { call, put } from 'redux-saga/effects';

import type {APIResponse} from '../../types/';
import {isSuccess, convertUserFromFirebaseToStore} from '../../Services/';
import {userActions} from '../../Redux/';

export * from './authenticate';
export * from './updateProfile';
export * from './sendEmailVerification';

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
