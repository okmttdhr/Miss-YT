// @flow
import Promise from 'bluebird';
import { call, put, fork } from 'redux-saga/effects';

import type {APIResponse, TUserUpdateProfileAction} from '../../types/';
import {firebaseApp, statusCode, isSuccess, convertUserFromFirebaseToStore} from '../../Services/';
import {userActions} from '../../Redux/';

export const updateProfileToFirebase = (
  updates: {displayName: string, photoURL: string},
): Promise<APIResponse> => {
  const user = firebaseApp.auth().currentUser;
  return user.updateProfile(updates)
    .then(() => {
      return {
        status: statusCode.Ok,
        message: '',
        user,
      };
    })
    .catch((error) => {
      return {
        status: statusCode.InternalError,
        message: error.code,
        user: null,
      };
    });
};

export function* update<T>(
  action: TUserUpdateProfileAction,
): Generator<T, any, any> {
  yield put(userActions.userRequest());
  const responce: APIResponse = yield call(updateProfileToFirebase, action.updates);
  if (!isSuccess(responce)) {
    yield put(userActions.userFailure(responce.message));
    return;
  }
  yield put(userActions.userSuccess(convertUserFromFirebaseToStore(responce.user)));
}

export function* updateProfile<T>(action: TUserUpdateProfileAction): Generator<T, any, any> {
  yield fork(update, action);
}
