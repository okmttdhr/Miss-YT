// @flow
import { call, select } from 'redux-saga/effects';

import type {TChannelStoreWithKey} from '../../types/';
import {uidSelector, likedChannelsSelector} from '../selector';
import {likesPostToFirebase} from './firebase';

export function* likesSync<T>(): Generator<T, any, any> {
  const uid = yield select(uidSelector);
  const localChennels: TChannelStoreWithKey = yield select(likedChannelsSelector);
  yield* Object.keys(localChennels).map((key) => {
    return call(likesPostToFirebase.sync, key, localChennels[key].likeCount, uid);
  });
}
