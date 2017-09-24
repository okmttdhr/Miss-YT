// @flow
import { select, put } from 'redux-saga/effects';
import type {TLike, TChannelStoreWithKey} from '../../types/';
import {likedChannelsActions} from '../../Redux/';
import {likedChannelsSelector} from '../selector';

export function* likesChanged<T>({snapshot}: {snapshot: any}): Generator<T, any, any> {
  console.log('likesChanged');
  const like: TLike = snapshot.val();
  const localLikedChannels: TChannelStoreWithKey = yield select(likedChannelsSelector);
  if (!localLikedChannels[like.channelId]) {
    return;
  }
  yield put(likedChannelsActions.likesChangedSuccess(like));
}
