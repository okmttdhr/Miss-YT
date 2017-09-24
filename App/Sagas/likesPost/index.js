// @flow
import { call, select, fork, put, take } from 'redux-saga/effects';
import { merge } from 'lodash';

import type {TChannelStore, TLikeWithKey, TChannelStoreWithKey} from '../../types/';
import {likedChannelsActions, channelsActions, likedChannelsTypes} from '../../Redux/';
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

  if (!isSuccess(isLikeOnServer)) {
    console.log('mergeLikedChannelToLocal: new');
    const length = Object.keys(localLikedChannels).length;
    const rank = length === 0 ? 1 : length + 1;

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
  console.log('like', like);
  const likeKey: string = Object.keys(like)[0];

  yield put(likedChannelsActions.likedChannelsSuccess(
    merge({}, {[channel.id]: channel}, {[channel.id]: {
      isLiked: true,
      rank: like[likeKey].rank,
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
    console.log('prepare');
    yield fork(mergeLikedChannelToLocal, channel, uid, likedChannels);
    yield take(likedChannelsTypes.LIKED_CHANNELS_SUCCESS);
  }

  yield put(channelsActions.channelsLikesPostIncrease(channelId));
  yield put(likedChannelsActions.likedChannelsLikesPostIncrease(channelId));

  yield call(likesPostToFirebase.channels, channelId, 1);
  if (uid) {
    yield call(likesPostToFirebase.likesIncrease, channelId, 1, uid);
  }
}
