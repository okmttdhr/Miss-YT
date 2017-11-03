// @flow
import { call, put, select } from 'redux-saga/effects';

import type {TLikeWithKey, TChannelStoreWithKey, TChannelMyInfoGetAction, TFirebaseServiceResponse} from '../../types/';
import {getLikeWithChannelId, isSuccess} from '../../Services';
import {channelActions} from '../../Redux/';
import {uidSelector, likedChannelsSelector} from '../selector';

export function* channelMyInfoGet<T>({channelId}: TChannelMyInfoGetAction): Generator<T, any, any> {
  const localLikedChannels: TChannelStoreWithKey = yield select(likedChannelsSelector);
  if (localLikedChannels[channelId]) {
    yield put(channelActions.channelMyInfoGetSuccess({
      rank: localLikedChannels[channelId].rank,
      likeCount: localLikedChannels[channelId].likeCount,
    }));
    return;
  }
  const uid = yield select(uidSelector);
  const response: TFirebaseServiceResponse = yield call(getLikeWithChannelId, uid, channelId);
  if (!isSuccess(response)) {
    yield put(channelActions.channelMyInfoGetFailure(response.message));
    return;
  }
  const like: TLikeWithKey = response.snapshot.val();
  const key: string = Object.keys(like)[0];
  yield put(channelActions.channelMyInfoGetSuccess({
    rank: like[key].rank,
    likeCount: like[key].count,
  }));
}
