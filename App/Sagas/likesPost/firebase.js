// @flow
import { call } from 'redux-saga/effects';
import type {TLike, TLikeWithKey} from '../../types/';
import {isSuccess,
  isNotFound,
  firebaseServiceResponse,
  firebaseTxServiceResponse,
  handleServerError,
  likesRef,
  channelsRef,
  getLikeWithChannelId,
} from '../../Services/';

const test2 = (uid, likeKey, count) => {
  return firebaseTxServiceResponse(
    likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count),
  );
};

export const likesPostToFirebase = {
  likesNew: async (channelId: string, count: number, uid: string) => {
    const promise = await handleServerError(
      likesRef.child(uid)
        .push({channelId, rank: 0, count})
        .then(() => {
          return {status: 200, message: '', snapshot: null};
        }),
    );
    return promise;
  },
  likesIncrease: function* test<T>(
    channelId: string, count: number, uid: string,
  ): Generator<T, any, any> {
    console.log('likesIncrease');
    const isLikeOnServer = yield call(getLikeWithChannelId, uid, channelId);
    if (isNotFound(isLikeOnServer)) {
      yield call(likesPostToFirebase.likesNew, channelId, count, uid);
      return;
    }
    if (!isSuccess(isLikeOnServer)) {
      yield isLikeOnServer;
      return;
    }
    const like: TLike = isLikeOnServer.snapshot.val();
    const likeKey: string = Object.keys(like)[0];
    yield call(test2, uid, likeKey, count);
  },
  likesSync: async (channelId: string, count: number, uid: string) => {
    console.log('likesSync');
    const likeResponse = await getLikeWithChannelId(uid, channelId);
    if (isNotFound(likeResponse)) {
      return likesPostToFirebase.likesNew(channelId, count, uid);
    }
    if (!isSuccess(likeResponse)) {
      return likeResponse;
    }
    const like: TLikeWithKey = likeResponse.snapshot.val();
    const likeKey: string = Object.keys(like)[0];
    const isDiff = count > like[likeKey].count;
    if (isDiff) {
      const tx = await firebaseTxServiceResponse(likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + (count - c)));
      return tx;
    }
    return {status: 200, message: ''};
  },
  channels: async (channelId: string, count: number) => {
    return firebaseTxServiceResponse(channelsRef.child(`${channelId}/likeCount`).transaction((c) => {
      if (!c && c !== 0) {
        return undefined;
      }
      return c + count;
    }));
  },
};
