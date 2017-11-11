// @flow
import { call, put, select } from 'redux-saga/effects';

import type {APIResponse, TChannelVideosGetActions} from '../../types/';
import {SearchVideosResource, isSuccess} from '../../Services';
import {channelActions} from '../../Redux/';
import {getChannelNextPageToken} from '../selector';

export function* channelVideosGet<T>(
  {youtubeChannelId}: TChannelVideosGetActions,
): Generator<T, any, any> {
  const nextPageToken = yield select(getChannelNextPageToken);
  const searchVideosResource = new SearchVideosResource();
  const response: APIResponse =
    yield call([searchVideosResource, searchVideosResource.GET], youtubeChannelId, nextPageToken);
  if (!isSuccess(response)) {
    yield put(channelActions.channelVideosGetFailure(response.message));
    return;
  }
  yield put(channelActions.channelVideosGetSuccess(response.videos, response.nextPageToken));
}
