// @flow
import { call, select, fork } from 'redux-saga/effects';
import { assign } from 'lodash';

import type {TChannelStore, TLike} from '../../types/';
import {likedChannelsActions, channelsActions} from '../../Redux/';
import {
  likesPostToFirebase,
  firebaseServiceResponse,
  getLikeWithChannelId,
  isSuccess,
} from '../../Services/';
import {uidSelector, likedChannelsSelector} from '../selector';

export * from './sync';

export const likedChannelOnServer = (uid: string, channelId: string) => {
  return firebaseServiceResponse(getLikeWithChannelId(uid, channelId));
};

export function* mergeLikedChannelToLocal<T>(
  channel: TChannelStore,
  uid: string,
  channelId: string,
): Generator<T, any, any> {
  const likeResponse = yield call(likedChannelOnServer, uid, channelId);
  if (!isSuccess(likeResponse)) {
    yield call(likedChannelsActions.likedChannelsSuccess, {channelId: assign({}, channel, {
      isLiked: true,
      rank: 0,
      likeCount: 1,
    })});
    return;
  }
  const like: TLike = likeResponse.snapshot.val();
  yield call(likedChannelsActions.likedChannelsSuccess, {channelId: assign({}, channel, {
    isLiked: true,
    rank: like.rank,
    likeCount: like.count,
  })});
}

export function* likesPostIncrease<T>({channel}: {channel: TChannelStore}): Generator<T, any, any> {
  const channelId = channel.id;
  const uid = yield select(uidSelector);
  const likesChannels: {[key: string]: TChannelStore} = yield select(likedChannelsSelector);
  if (!likesChannels[channelId]) {
    yield fork(mergeLikedChannelToLocal, channel, uid, channelId);
  }
  yield call(channelsActions.likesPostIncrease, channelId);
  yield call(likedChannelsActions.likesPostIncrease, channelId);

  yield call(likesPostToFirebase.channels, channelId, 1);
  if (uid) {
    yield call(likesPostToFirebase.likesIncrease, channelId, 1, uid);
  }
}
