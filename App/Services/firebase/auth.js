// @flow
import Promise from 'bluebird';
import {firebaseApp, statusCode} from '../../Services/';
import type {APIResponse} from '../../types/';

const updateUserResult = (promise: Promise<any>): Promise<APIResponse> => {
  const user = firebaseApp.auth().currentUser;
  return promise
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

export const sendEmailVerificationWithFirebase = (): APIResponse => {
  const user = firebaseApp.auth().currentUser;
  return updateUserResult(user.sendEmailVerification());
};

export const currentUserReload = () => {
  const user = firebaseApp.auth().currentUser;
  return updateUserResult(user.reload());
};

export const updateProfileToFirebase = (
  updates: {displayName: string, photoURL: string},
): Promise<APIResponse> => {
  const user = firebaseApp.auth().currentUser;
  return updateUserResult(user.updateProfile(updates));
};
