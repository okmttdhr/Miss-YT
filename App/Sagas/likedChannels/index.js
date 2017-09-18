// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select, fork } from 'redux-saga/effects';

import type {TChannel, TChannelStore, APIResponse, TRootState, TLike} from '../../types/';
import {PER_PAGE} from '../../constants';
import {likedChannelsActions} from '../../Redux/';
import {likesRef, channelsRef, isSuccess, channelStoreArrayToActiveObject, firebaseServiceResponse} from '../../Services/';
import {syncLikes} from '../likesPost';
import {uidSelector} from '../selector';

export const getStartAt = (state: TRootState) => state.likedChannels.startAt;

export const getLikesFromFirebase = (uid: string, startAt: number) => {
  console.log(uid);
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
      .then((responce: APIResponse): TChannelStore => {
        if (!isSuccess(responce)) {
          throw responce;
        }
        const channel: {[key: string]: TChannel} = responce.snapshot.val();
        const key: string = Object.keys(channel)[0];
        console.log('like', like);
        return assign({}, channel[key], {
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
  const uid = yield select(uidSelector);
  const responce: APIResponse = yield call(getLikesFromFirebase, uid, startAt);
  if (!isSuccess(responce)) {
    yield put(likedChannelsActions.likedChannelsFailure());
    return;
  }
  const channelsPromise: Array<Promise<TChannelStore>> = yield call(getChannels, responce.snapshot);
  const channelsArray: TChannelStore[] = yield call(Promise.all, channelsPromise);
  const channels: {[key: string]: TChannelStore} = channelStoreArrayToActiveObject(channelsArray);
  yield fork(syncLikes, channels);
  yield put(likedChannelsActions.likedChannelsSuccess(channels));
}
