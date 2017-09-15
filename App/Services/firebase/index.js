// @flow
import type {TUser, TLike, TChannel} from '../../types/';
import {isSuccess, isNotFound, firebaseServiceResponse, handleServerError} from '../index';
import {likesRef, channelsRef, likesRefUpdate, channelsRefUpdate} from './ref';

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
    const like: TLike = likeResponse.snapshot.val();
    const likeKey: string = likeResponse.snapshot.key;
    return handleServerError(likesRefUpdate(channelId, {[`/${likeKey}/count`]: like.count + count}));
  },
  channels: async (channelId: string, count: number) => {
    const channelResponse = await firebaseServiceResponse(channelsRef.orderByChild('id').equalTo(channelId).once('value'));
    if (!isSuccess(channelResponse)) {
      return channelResponse;
    }
    const channel: TChannel = channelResponse.snapshot.val();
    return handleServerError(channelsRefUpdate(channelId, {[`/${channelId}/likeCount`]: channel.likeCount + count}));
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
