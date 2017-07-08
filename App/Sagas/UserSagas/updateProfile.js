// @flow
import Promise from 'bluebird';
import { fork } from 'redux-saga/effects';

import type {APIResponse, TUserUpdateProfileAction} from '../../types/';
import {firebaseApp, statusCode} from '../../Services/';
import {withUpdateUser} from './index';

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
        // TODO codeの型しらべとく
        message: error.code,
        user: null,
      };
    });
};

export function* updateProfile<T>(
  action: TUserUpdateProfileAction,
): Generator<T, any, any> {
  yield fork(withUpdateUser, updateProfileToFirebase, [action.updates]);
}
