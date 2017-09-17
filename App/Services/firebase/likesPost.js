// @flow
import type {TLike} from '../../types/';
import {isSuccess, isNotFound, firebaseServiceResponse, handleServerError} from '../index';
import {likesRef, channelsRef} from './ref';

const hasCreatedLike = async (channelId: string, count: number, uid: string) => {
  const likeResponse = await firebaseServiceResponse(likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value'));
  if (isNotFound(likeResponse)) {
    const promise = await handleServerError(
      likesRef
        .push({
          channelId,
          rank: 0,
          count,
        }).then(() => {
          return {
            status: 200,
            message: '',
          };
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
  likes: async (channelId: string, count: number, uid: string) => {
    const created = await hasCreatedLike(channelId, count, uid);
    if (!isSuccess(created)) {
      return created;
    }
    const likeResponse = created;
    const likeKey: string = likeResponse.snapshot.key;
    return firebaseServiceResponse(likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count));
  },
  likesSync: async (channelId: string, count: number, uid: string) => {
    const created = await hasCreatedLike(channelId, count, uid);
    if (!isSuccess(created)) {
      return created;
    }
    const likeResponse = created;
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
