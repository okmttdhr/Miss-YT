// @flow
import { call, select } from 'redux-saga/effects';

import {likedChannelsActions, channelsActions} from '../../Redux/';
import {
  likesPostToFirebase,
} from '../../Services/';
import {uidSelector} from '../selector';

export function* likesPost<T>({channelId}: {channelId: string}): Generator<T, any, any> {
  yield call(channelsActions.likesPostIncrease, channelId);
  yield call(likedChannelsActions.likesPostIncrease, channelId);
  const uid = yield select(uidSelector);
  if (uid) {
    yield call(likesPostToFirebase, channelId, uid, 1);
  }
}
