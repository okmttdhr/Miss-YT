// @flow
import type {TUser} from '../../types/';
import {isSuccess, isNotFound, firebaseServiceResponse, handleServerError} from '../index';
import {likesRef, channelsRef} from './ref';

export * from './auth';
export * from './authErrorToMessage';
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

export const likesPostToFirebase = {
  likes: async (channelId: string, count: number, uid: string) => {
    const likeResponse = await firebaseServiceResponse(likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value'));
    if (isNotFound(likeResponse)) {
      return handleServerError(likesRef.push({
        channelId,
        rank: 0,
        count,
      }));
    }
    if (!isSuccess(likeResponse)) {
      return likeResponse;
    }
    const likeKey: string = likeResponse.snapshot.key;
    return firebaseServiceResponse(likesRef.child(`${likeKey}/count`).transaction(c => c + count));
  },
  channels: async (channelId: string, count: number) => {
    return firebaseServiceResponse(channelsRef.child(`${channelId}/likeCount`).transaction((c) => {
      if (!c) {
        return undefined;
      }
      return c + count;
    }));
  },
};


// const upvotesRef = ref('/fireblog/likes/-JRHTHaIs-jNPLXOQivY/upvotes');
// upvotesRef.transaction((currentValue) => {
//   if (localValue < currentValue) {
//     return;
//   }
//   const count = localValue - currentValue
//   return currentValue + count;
// });
