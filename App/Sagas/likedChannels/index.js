// @flow
import Promise from 'bluebird';
import {merge} from 'lodash';
import { call, put, select } from 'redux-saga/effects';

import type {TChannel, TChannelStore, APIResponse, TRootState, TLike, TChannelStoreWithKey} from '../../types/';
import {PER_PAGE} from '../../constants';
import {likedChannelsActions} from '../../Redux/';
import {likesRef, channelsRef, isSuccess, channelStoreArrayToActiveObject, firebaseServiceResponse} from '../../Services/';
import {uidSelector} from '../selector';

export const getStartAt = (state: TRootState) => state.likedChannels.startAt;

export const getLikesFromFirebase = (uid: string, startAt: number) => {
  return firebaseServiceResponse(
      likesRef
        .child(uid)
        .orderByChild('rank')
        .startAt(startAt)
        .limitToFirst(PER_PAGE)
        .once('value'),
    );
};

const getChannel = (channelId: string): Promise<Array<TChannelStore>> => {
  return firebaseServiceResponse(channelsRef.orderByChild('id').equalTo(channelId).once('value'));
};

export const getChannels = (snapshot: any): Array<Promise<TChannelStore>> => {
  const promises = [];
  snapshot.forEach((s) => {
    const like: TLike = s.val();
    const promise = getChannel(like.channelId)
      .then((response: APIResponse): TChannelStore => {
        if (!isSuccess(response)) {
          throw response;
        }
        const channel: {[key: string]: TChannel} = response.snapshot.val();
        const key: string = Object.keys(channel)[0];
        const update = {
          isLiked: true,
          likeCount: like.count,
        };
        if (like.rank === 0) {
          return merge({}, channel[key], update);
        }
        return merge({}, channel[key], update, {
          rank: like.rank,
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
  const uid = yield select(uidSelector);
  if (!uid) {
    yield put(likedChannelsActions.likedChannelsSuccess({}));
    return;
  }
  const response: APIResponse = yield call(getLikesFromFirebase, uid, startAt);
  if (!isSuccess(response)) {
    yield put(likedChannelsActions.likedChannelsFailure(response.message));
    return;
  }
  const channelsPromise: Array<Promise<TChannelStore>> = yield call(getChannels, response.snapshot);
  const channelsArray: TChannelStore[] = yield call(Promise.all, channelsPromise);
  const channels: TChannelStoreWithKey = channelStoreArrayToActiveObject(channelsArray);
  yield put(likedChannelsActions.likedChannelsSuccess(channels));
  yield put(likedChannelsActions.likedChannelsPaginate());
}
