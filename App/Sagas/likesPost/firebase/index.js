// @flow
import { call } from 'redux-saga/effects';
import type {TLikeWithKey} from '../../../types/';
import {isSuccess,
  isNotFound,
  firebaseTxServiceResponse,
  handleServerError,
  likesRef,
  channelsRef,
  getLikeWithChannelId,
} from '../../../Services/';

export const increaseOnFirebase = (uid: string, likeKey: string, count: number) => {
  return firebaseTxServiceResponse(
    likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count),
  );
};

export const likesPostToFirebase = {
  // TODO add tests and rename
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
  increase: function* increase<T>(
    channelId: string, count: number, uid: string,
  ): Generator<T, any, any> {
    console.log('increase');
    const isLikeOnServer = yield call(getLikeWithChannelId, uid, channelId);
    if (isNotFound(isLikeOnServer)) {
      yield call(likesPostToFirebase.likesNew, channelId, count, uid);
      return;
    }
    if (!isSuccess(isLikeOnServer)) {
      yield isLikeOnServer;
      return;
    }
    const like: TLikeWithKey = isLikeOnServer.snapshot.val();
    const likeKey: string = Object.keys(like)[0];
    yield call(increaseOnFirebase, uid, likeKey, count);
  },
  // TODO add tests and rename
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
