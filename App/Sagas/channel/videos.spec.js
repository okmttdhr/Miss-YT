import test from 'ava-spec';
import { call, put, select } from 'redux-saga/effects';

import { videosMock } from '../../../Tests/mock/';
import {channelActions} from '../../Redux/';
import {SearchVideosResource} from '../../Services';
import {getChannelNextPageToken} from '../selector';
import { channelVideosGet } from './videos';

test.serial.group('Normal', () => {
  const generator = channelVideosGet({youtubeChannelId: 'ID'});
  test('could select nextPageToken', (t) => {
    t.deepEqual(
      generator.next().value,
      select(getChannelNextPageToken),
    );
  });

  test('could make a request for videos', (t) => {
    const searchVideosResource = new SearchVideosResource();
    t.deepEqual(
      generator.next('').value,
      call([searchVideosResource, searchVideosResource.GET], 'ID', ''),
    );
  });

  test('could update state', (t) => {
    t.deepEqual(
      generator.next({
        status: 200,
        videos: videosMock,
        nextPageToken: 'NEXTPAGETOKEN',
      }).value,
      put(channelActions.channelVideosGetSuccess(videosMock, 'NEXTPAGETOKEN')),
    );
    t.true(generator.next().done);
  });
});

test.serial.group('Abnormal', () => {
  const generator = channelVideosGet({youtubeChannelId: 'ID'});
  generator.next();
  generator.next('');
  test('could update errorMessage', (t) => {
    t.deepEqual(
      generator.next({
        status: 500,
        message: 'errorMessageVideos',
      }).value,
      put(channelActions.channelVideosGetFailure('errorMessageVideos')),
    );
  });
});
