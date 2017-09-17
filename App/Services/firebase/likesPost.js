// @flow
import type {TLike} from '../../types/';
import {isSuccess, isNotFound, firebaseServiceResponse, handleServerError} from '../index';
import {likesRef, channelsRef} from './ref';

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
    return firebaseServiceResponse(likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count));
  },
  likesNew: async (channelId: string, count: number, uid: string) => {
    const likeResponse = await firebaseServiceResponse(
      likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value'),
    );
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


// const upvotesRef = ref('/fireblog/likes/-JRHTHaIs-jNPLXOQivY/upvotes');
// upvotesRef.transaction((currentValue) => {
//   if (localValue < currentValue) {
//     return;
//   }
//   const count = localValue - currentValue
//   return currentValue + count;
// });
