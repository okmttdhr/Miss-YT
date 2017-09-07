// @flow
import type {TUser, TLike, TChannel} from '../../types/';
import {isSuccess, firebaseServiceResponse, handleServerError} from '../index';
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

export const likesPostToFirebase = async (channelId: string, uid: string, count: number) => {
  const likeExist = await firebaseServiceResponse(likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value'));
  if (isSuccess(likeExist)) {
    const like: TLike = likeExist.snapshot.val();
    const likeKey: string = likeExist.snapshot.key;
    handleServerError(likesRefUpdate(channelId, {[`/${likeKey}/count`]: like.count + count}));
  } else {
    handleServerError(likesRef.push({
      channelId,
      rank: 0,
      count,
    }));
  }

  const channelResponse = await firebaseServiceResponse(channelsRef.orderByChild('id').equalTo(channelId).once('value'));
  const channel: TChannel = channelResponse.snapshot.val();
  handleServerError(channelsRefUpdate(channelId, {[`/${channelId}/likeCount`]: channel.likeCount + count}));
};
