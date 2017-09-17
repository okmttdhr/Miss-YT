// @flow
import { call, select } from 'redux-saga/effects';

import type {TChannelStore, TChannelStoreWithKey} from '../../types/';
import {likesPostToFirebase} from '../../Services/';
import {likedChannelsSelector, uidSelector} from '../selector';

export const syncLikesToFirebase = (
  channels: TChannelStoreWithKey, localChennels: TChannelStoreWithKey, uid: string,
) => {
  Object.keys(localChennels).forEach((key) => {
    if (!channels[key]) {
      likesPostToFirebase.likesSync(key, localChennels[key].likeCount, uid);
    }
    const isDiff = channels[key] && localChennels[key].likeCount > channels[key].likeCount;
    if (isDiff) {
      const diff = localChennels[key].likeCount - channels[key].likeCount;
      likesPostToFirebase.likesIncrease(key, diff, uid);
    }
  });
};

export function* syncLikes<T>(channels: {[key: string]: TChannelStore}): Generator<T, any, any> {
  const uid = yield select(uidSelector);
  const localChennels: {[key: string]: TChannelStore} = yield select(likedChannelsSelector);
  yield call(syncLikesToFirebase, channels, localChennels, uid);
}
