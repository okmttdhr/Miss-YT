// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select } from 'redux-saga/effects';

import type {TChannel, TChannelStore, TRootState, APIResponse} from '../../types/';
import {PER_PAGE} from '../../constants';
import {
  channelsRef,
  likesRef,
  snapshotExists,
  channelStoreArrayToActiveObject,
  firebaseServiceResponse,
  isSuccess,
} from '../../Services/';
import {channelsActions} from '../../Redux/';

export const getStartAt = (state: TRootState) => state.channels.startAt;

export const getFromFirebase = (startAt: number) => {
  return firebaseServiceResponse(
    channelsRef.orderByChild('rank').startAt(startAt).limitToFirst(PER_PAGE).once('value'),
  );
};

const getLikeWithChannelId = (uid: string, channelId: string) => {
  return likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value');
};

const getIsLiked = (userId: string, channelId: string) =>
  getLikeWithChannelId(userId, channelId)
    .then(snapshotExists)
    .catch(() => false);

export const createIsLikedPromises = (snapshot: any): Promise<Array<TChannelStore>> => {
  const isLikedPromises = [];
  snapshot.forEach((s) => {
    const channel: TChannel = s.val();
    const isLikedPromise = getIsLiked('userId', s.key)
      .then((isLiked: boolean): TChannelStore => assign({}, channel, {isLiked}));
    isLikedPromises.push(isLikedPromise);
  });
  return isLikedPromises;
};

export function* getChannels<T>(): Generator<T, any, any> {
  const startAt = yield select(getStartAt);
  const responce: APIResponse = yield call(getFromFirebase, startAt);
  if (!isSuccess(responce)) {
    yield put(channelsActions.channelsFailure(responce.message));
    return;
  }
  const isLikedPromises = createIsLikedPromises(responce.snapshot);
  const channelsArray: TChannelStore[] = yield call(Promise.all, isLikedPromises);
  const channels: {[key: string]: TChannelStore} = channelStoreArrayToActiveObject(channelsArray);
  yield put(channelsActions.channelsSuccess(channels));
}
