// @flow
import { call, select, fork, put, take } from 'redux-saga/effects';
import { merge } from 'lodash';

import type {TChannelStore, TLikeWithKey, TChannelStoreWithKey} from '../../types/';
import {likedChannelsActions, channelsActions, channelActions, likedChannelsTypes} from '../../Redux/';
import {
  getLikeWithChannelId,
  isSuccess,
} from '../../Services/';
import {uidSelector, likedChannelsSelector} from '../selector';
import {likesPostToFirebase} from './firebase';

export * from './sync';

export function* mergeLikedChannelToLocal<T>(
  channel: TChannelStore,
  uid: string,
  localLikedChannels: TChannelStoreWithKey,
): Generator<T, any, any> {
  console.log('mergeLikedChannelToLocal');
  const isLikeOnServer = uid ? yield call(getLikeWithChannelId, uid, channel.id) : {status: 500, message: ''};
  const localLikedChannelsLength = Object.keys(localLikedChannels).length;
  const lastIndex = localLikedChannelsLength + 1;

  if (!isSuccess(isLikeOnServer)) {
    console.log('mergeLikedChannelToLocal: new');
    const rank = localLikedChannelsLength === 0 ? 1 : lastIndex;
    yield put(likedChannelsActions.likedChannelsSuccess(
      merge({}, {[channel.id]: channel}, {[channel.id]: {
        isLiked: true,
        rank,
        likeCount: 1,
      }}),
    ));
    return;
  }

  console.log('mergeLikedChannelToLocal: existing');
  const like: TLikeWithKey = (isLikeOnServer: any).snapshot.val();
  const likeKey: string = Object.keys(like)[0];
  const rank = like[likeKey].rank === 0 ? lastIndex : like[likeKey].rank;

  yield put(likedChannelsActions.likedChannelsSuccess(
    merge({}, {[channel.id]: channel}, {[channel.id]: {
      isLiked: true,
      rank,
      likeCount: like[likeKey].count,
    }}),
  ));
}

export function* likesPostIncrease<T>({channel}: {channel: TChannelStore}): Generator<T, any, any> {
  console.log('likesPostIncrease');
  const channelId = channel.id;
  const uid = yield select(uidSelector);
  const likedChannels: {[key: string]: TChannelStore} = yield select(likedChannelsSelector);
  const existOnLocal = likedChannels[channelId];

  if (!existOnLocal) {
    yield fork(mergeLikedChannelToLocal, channel, uid, likedChannels);
    yield take(likedChannelsTypes.LIKED_CHANNELS_SUCCESS);
  }

  yield put(channelActions.channelLikesPostIncrease());
  yield put(channelsActions.channelsLikesPostIncrease(channelId));
  yield put(likedChannelsActions.likedChannelsLikesPostIncrease(channelId));

  yield call(likesPostToFirebase.channels, channelId, 1);
  if (uid) {
    yield call(likesPostToFirebase.increase, channelId, 1, uid);
  }
}
