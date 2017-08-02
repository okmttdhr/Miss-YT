// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select } from 'redux-saga/effects';

import type {TChannel, TChannelStore, APIResponse, TRootState, TLike} from '../types/';
import {PER_PAGE} from '../constants';
import {likedChannelsActions} from '../Redux/';
import {likesRef, channelsRef, snapshotExists, statusCode, isSuccess} from '../Services/';

export const getStartAt = (state: TRootState) => state.likedChannels.startAt;

export const getLikesFromFirebase = (userId: string, startAt: number) => {
  return likesRef.child(userId).orderByChild('rank').startAt(startAt).limitToFirst(PER_PAGE)
    .once('value')
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
      snapshot: null,
    }));
};

const getChannel = (channelId: string): Promise<Array<TChannelStore>> => {
  // TODO 共通化
  return channelsRef.orderByChild('id').equalTo(channelId).once('value')
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
      snapshot: null,
    }));
};

export const getChannels = (snapshot: any): Array<Promise<TChannelStore>> => {
  const promises = [];
  console.log(3);
  snapshot.forEach((s) => {
    const like: TLike = s.val();
    const promise = getChannel(like.channelId)
      .then((responce: APIResponse): TChannelStore => {
        if (!isSuccess(responce)) {
          throw responce;
        }
        const channel: TChannel = responce.snapshot.val();
        return assign({}, channel, {
          isLiked: true,
          rank: like.rank,
          likeCount: like.count,
        });
      })
      .catch(() => {
        return {status: 'inactive'};
      })
      ;
    promises.push(promise);
  });
  return promises;
};

export function* getLikedChannels<T>(): Generator<T, any, any> {
  const startAt = yield select(getStartAt);
  const responce: APIResponse = yield call(getLikesFromFirebase, startAt);
  console.log('responce', responce);
  if (!isSuccess(responce)) {
    yield put(likedChannelsActions.likedChannelsFailure());
    return;
  }
  const channelsPromise: Array<Promise<TChannelStore>> = yield call(getChannels, responce.snapshot);
  const channelsArray: TChannelStore[] = yield call(Promise.all, channelsPromise);
  const channels: {[key: string]: TChannelStore} = {};
  // TODO 共通化
  console.log(4);
  channelsArray.forEach((channel) => {
    if (channel.status === 'active') {
      channels[channel.id] = channel;
    }
  });
  yield put(likedChannelsActions.likedChannelsSuccess(channels));
}
