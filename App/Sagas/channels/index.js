// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select } from 'redux-saga/effects';

import type {TChannel, TChannelStore, TRootState, APIResponse, TChannelStoreWithKey} from '../../types/';
import {PER_PAGE} from '../../constants';
import {
  channelsRef,
  channelStoreArrayToActiveObject,
  firebaseServiceResponse,
  isSuccess,
  getLikeWithChannelId,
} from '../../Services/';
import {channelsActions} from '../../Redux/';
import {uidSelector, likedChannelsSelector} from '../selector';

export const getStartAt = (state: TRootState) => state.channels.startAt;

export const getFromFirebase = (startAt: number) => {
  return firebaseServiceResponse(
    channelsRef.orderByChild('rank').startAt(startAt).limitToFirst(PER_PAGE).once('value'),
  );
};

const getIsLiked = (
  channelId: string,
  uid: string,
  localLikedChannels: TChannelStoreWithKey,
): Promise<boolean> => {
  if (!uid) {
    return new Promise(resolve => resolve(!!localLikedChannels[channelId]));
  }
  return getLikeWithChannelId(uid, channelId).then(response => console.log('response', response) || isSuccess(response));
};

export const createChannelsWithIsLikedPromises = (
  snapshot: any,
  localLikedChannels: TChannelStoreWithKey,
  uid: string,
): Promise<Array<TChannelStore>> => {
  const channelsWithIsLikedPromises = [];
  snapshot.forEach((s) => {
    const channel: TChannel = s.val();
    const isLikedPromise = getIsLiked(channel.id, uid, localLikedChannels)
      .then((isLiked: boolean): TChannelStore => assign({}, channel, {isLiked}));
    channelsWithIsLikedPromises.push(isLikedPromise);
  });
  return channelsWithIsLikedPromises;
};

export function* getChannels<T>(): Generator<T, any, any> {
  const startAt = yield select(getStartAt);
  const responce: APIResponse = yield call(getFromFirebase, startAt);
  if (!isSuccess(responce)) {
    yield put(channelsActions.channelsFailure(responce.message));
    return;
  }
  const uid = yield select(uidSelector);
  const localLikedChannels: TChannelStoreWithKey = yield select(likedChannelsSelector);
  const channelsWithIsLikedPromises =
    yield call(createChannelsWithIsLikedPromises, responce.snapshot, localLikedChannels, uid);
  const channelsArray: TChannelStore[] = yield call(Promise.all, channelsWithIsLikedPromises);
  const channels: {[key: string]: TChannelStore} = channelStoreArrayToActiveObject(channelsArray);
  yield put(channelsActions.channelsSuccess(channels));
}
