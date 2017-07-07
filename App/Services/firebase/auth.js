// @flow
import {firebaseApp, statusCode} from '../../Services/';
import type {APIResponse} from '../../types/';

export const sendEmailVerificationWithFirebase = (): APIResponse => {
  const user = firebaseApp.auth().currentUser;
  return user.sendEmailVerification()
    // TODO userを返すパターンで共通化…
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

export const currentUserReload = () => {
  const user = firebaseApp.auth().currentUser;
  return user.reload()
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
