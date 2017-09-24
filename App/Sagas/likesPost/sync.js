// @flow
// import Promise from 'bluebird';
import { call, select } from 'redux-saga/effects';

import type {TChannelStoreWithKey} from '../../types/';
import {uidSelector, likedChannelsSelector} from '../selector';
import {likesPostToFirebase} from './firebase';

export const likesSyncToFirebase = (
  localChennels: TChannelStoreWithKey, uid: string,
) => {
  console.log('likesSyncToFirebase');
  return Object.keys(localChennels).map((key) => {
    return likesPostToFirebase.likesSync(key, localChennels[key].likeCount, uid);
  });
};

export function* likesSync<T>(): Generator<T, any, any> {
  const uid = yield select(uidSelector);
  const localChennels: TChannelStoreWithKey = yield select(likedChannelsSelector);
  yield call(likesSyncToFirebase, localChennels, uid);
}
