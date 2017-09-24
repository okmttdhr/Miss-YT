// @flow
import { call } from 'redux-saga/effects';
import type {TLikeWithKey} from '../../../types/';
import {isSuccess,
  isNotFound,
  firebaseTxServiceResponse,
  likesRef,
  channelsRef,
  getLikeWithChannelId,
} from '../../../Services/';
import {increase} from './increase';
import {_new} from './new';

export const syncOnFirebase = (uid: string, likeKey: string, count: number) => {
  return firebaseTxServiceResponse(
    likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + (count - c)),
  );
};

export const likesPostToFirebase = {
  increase,
  sync: function* test<T>(
    channelId: string, count: number, uid: string,
  ): Generator<T, any, any> {
    console.log('sync');
    const isLikeOnServer = yield call(getLikeWithChannelId, uid, channelId);
    if (isNotFound(isLikeOnServer)) {
      yield call(_new, channelId, count, uid);
      return;
    }
    if (!isSuccess(isLikeOnServer)) {
      yield isLikeOnServer;
      return;
    }
    const like: TLikeWithKey = isLikeOnServer.snapshot.val();
    const likeKey: string = Object.keys(like)[0];
    const isDiff = count > like[likeKey].count;
    if (isDiff) {
      yield call(syncOnFirebase, uid, likeKey, count);
      return;
    }
    yield isLikeOnServer;
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
