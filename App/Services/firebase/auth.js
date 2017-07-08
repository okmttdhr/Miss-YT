// @flow
import Promise from 'bluebird';
import {firebaseApp, statusCode, authErrorToMessage} from '../../Services/';
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
        message: authErrorToMessage(error.code),
        user: null,
      };
    });
};

export const sendEmailVerificationWithFirebase = (): APIResponse => {
  const user = firebaseApp.auth().currentUser;
  if (user.emailVerified) {
    return {
      status: statusCode.Ok,
      message: '',
      user,
    };
  }
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
