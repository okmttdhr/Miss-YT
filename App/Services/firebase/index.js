// @flow
import type {TUser} from '../../types/';

export * from './init';
export * from './ref';
export * from './subscribe';

export const convertUserFromFirebaseToStore = (firebaseUser: TUser) => {
  return {
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    isAnonymous: firebaseUser.isAnonymous,
    phoneNumber: firebaseUser.phoneNumber,
    photoURL: firebaseUser.photoURL,
    providerData: firebaseUser.providerData,
    providerId: firebaseUser.providerId,
    refreshToken: firebaseUser.refreshToken,
    uid: firebaseUser.uid,
  };
};
