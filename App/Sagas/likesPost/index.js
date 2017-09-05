// @flow
import { call, select } from 'redux-saga/effects';

import type {TChannel, TLike} from '../../types/';
import {likedChannelsActions, channelsActions} from '../../Redux/';
import {likesRef,
  channelsRef,
  isSuccess,
  firebaseServiceResponse,
  likesRefUpdate,
  channelsRefUpdate,
  handleServerError,
} from '../../Services/';
import {uidSelector} from '../selector';

export const updateOnFirebase = async (channelId: string, uid: string) => {
  const likeExist = await firebaseServiceResponse(likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value'));
  if (isSuccess(likeExist)) {
    const like: TLike = likeExist.snapshot.val();
    const likeKey: string = likeExist.snapshot.key;
    handleServerError(likesRefUpdate(channelId, {[`/${likeKey}/count`]: like.count + 1}));
  } else {
    handleServerError(likesRef.push({
      channelId,
      rank: 0,
      count: 1,
    }));
  }

  const channelResponse = await firebaseServiceResponse(channelsRef.orderByChild('id').equalTo(channelId).once('value'));
  const channel: TChannel = channelResponse.snapshot.val();
  handleServerError(channelsRefUpdate(channelId, {[`/${channelId}/likeCount`]: channel.likeCount + 1}));
};

export function* likesPost<T>({channelId}: {channelId: string}): Generator<T, any, any> {
  yield call(channelsActions.likesPostIncrease, channelId);
  yield call(likedChannelsActions.likesPostIncrease, channelId);
  const uid = yield select(uidSelector);
  if (uid) {
    yield call(updateOnFirebase, channelId, uid);
  }
}

// export function* likesPostSync<T>({channelId}): Generator<T, any, any> {
//   // yield call(updateAllOnFirebase, likedChannels);
//
//   // サーバー側を更新
//   const likedChannels = yield select(likedChannelsSelector);
//   yield call(syncToFirebase, likedChannels);
//   // ローカルのlikedChannelsを一度リセット
//   yield call(resetLikedChannels);
//   // サーバー側から再度取得
//   yield fork(getLikedChannelsFirstPage);
// }
