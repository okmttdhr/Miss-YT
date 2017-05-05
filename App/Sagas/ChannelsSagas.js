// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select } from 'redux-saga/effects';

import type {TChannel, TChannelStore, TRootState, APIResponse} from '../types/';
import {PER_PAGE} from '../constants';
import {channelsRef, likesRef, statusCode, snapshotExists} from '../Services/';
import {channelsActions} from '../Redux/';

export const getStartAt = (state: TRootState) => state.channels.startAt;

export const getFromFirebase = (startAt: number) => {
  return channelsRef.orderByChild('rank').startAt(startAt).limitToFirst(PER_PAGE).once('value')
    .then((snapshot): APIResponse => {
      return {
        status: snapshotExists(snapshot) ? statusCode.Ok : statusCode.NotFound,
        message: '',
        snapshot,
      };
    })
    .catch((): APIResponse => ({
      status: statusCode.InternalError,
      message: '',
    }));
};

const getIsLiked = (userId: string, channelId: string) =>
  likesRef.child(userId).orderByChild('channelId').equalTo(channelId).once('value')
    .then(snapshotExists)
    .catch(() => false);

export const createIsLikedPromises = (snapshot: any) => {
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

  if (responce.status !== statusCode.Ok) {
    yield put(channelsActions.channelsFailure());
  } else {
    const isLikedPromises = createIsLikedPromises(responce.snapshot);
    const channelsArray: TChannelStore[] = yield call(Promise.all, isLikedPromises);

    const channels: {[key: string]: TChannelStore} = {};
    channelsArray.forEach((channel) => {
      if (channel.status === 'active') {
        channels[channel.id] = channel;
      }
    });
    yield put(channelsActions.channelsSuccess(channels));
  }
}
