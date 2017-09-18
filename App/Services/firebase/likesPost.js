// @flow
import type {TLike} from '../../types/';
import {isSuccess, isNotFound, firebaseServiceResponse, handleServerError} from '../index';
import {likesRef, channelsRef} from './ref';

export const getLikeWithChannelId = (uid: string = 'uid', channelId: string) => {
  return likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value');
};

const hasCreatedLike = async (channelId: string, count: number, uid: string) => {
  const likeResponse = await firebaseServiceResponse(getLikeWithChannelId(uid, channelId));
  if (isNotFound(likeResponse)) {
    const promise = await handleServerError(
      likesRef.child(uid)
        .push({channelId, rank: 0, count})
        .then(() => {
          return {status: 200, message: '', snapshot: null};
        }),
    );
    return promise;
  }
  if (!isSuccess(likeResponse)) {
    return likeResponse;
  }
  return likeResponse;
};

export const likesPostToFirebase = {
  likesIncrease: async (channelId: string, count: number, uid: string) => {
    const likeResponse = await hasCreatedLike(channelId, count, uid);
    console.log('likeResponse@likesIncrease', likeResponse);
    if (!likeResponse.snapshot || !isSuccess(likeResponse)) {
      return likeResponse;
    }
    const likeKey: string = likeResponse.snapshot.key;
    return firebaseServiceResponse(likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count));
  },
  likesSync: async (channelId: string, count: number, uid: string) => {
    const likeResponse = await hasCreatedLike(channelId, count, uid);
    if (!likeResponse.snapshot || !isSuccess(likeResponse)) {
      return likeResponse;
    }
    const likeKey: string = likeResponse.snapshot.key;
    const like: TLike = likeResponse.snapshot.val();
    const isDiff = count > like.count;
    if (isDiff) {
      return firebaseServiceResponse(
        likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + (count - c)),
      );
    }
    return {status: 200, message: ''};
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
