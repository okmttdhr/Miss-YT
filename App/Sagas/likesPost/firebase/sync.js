// @flow
import { call } from 'redux-saga/effects';
import type {TLikeWithKey} from '../../../types/';
import {isSuccess,
  isNotFound,
  getLikeWithChannelId,
  firebaseTxServiceResponse,
  likesRef,
} from '../../../Services/';
import {_new} from './new';

export const syncOnFirebase = (uid: string, likeKey: string, count: number) => {
  return firebaseTxServiceResponse(
    likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + (count - c)),
  );
};

export function* sync<T>(
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
}
