// @flow
import { call } from 'redux-saga/effects';
import type {TLikeWithKey} from '../../../types/';
import {isSuccess,
  isNotFound,
  firebaseTxServiceResponse,
  likesRef,
  getLikeWithChannelId,
} from '../../../Services/';
import {_new} from './new';

export const increaseOnFirebase = (uid: string, likeKey: string, count: number) => {
  return firebaseTxServiceResponse(
    likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count),
  );
};

export function* increase<T>(
  channelId: string, count: number, uid: string,
): Generator<T, any, any> {
  console.log('increase');
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
  yield call(increaseOnFirebase, uid, likeKey, count);
}
