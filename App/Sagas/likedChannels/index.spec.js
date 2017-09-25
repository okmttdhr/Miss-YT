// @flow
import test from 'ava-spec';
import Promise from 'bluebird';
import { call, put, select } from 'redux-saga/effects';

import { firebaseLikesResponse, channelsStoreMock, channelsStoreWithKeyMock } from '../../../Tests/mock/';
import { likedChannelsActions } from '../../Redux/';
import { statusCode } from '../../Services/';
import { getLikedChannels, getLikesFromFirebase, getStartAt, getChannels } from './index';
import {uidSelector} from '../selector';

test.serial.group('Normal', () => {
  const generator = getLikedChannels();

  test('could select liked channels state', (t) => {
    t.deepEqual(
      generator.next().value,
      select(getStartAt),
    );
  });

  test('could select uid', (t) => {
    t.deepEqual(
      generator.next(1).value,
      select(uidSelector),
    );
  });

  test('could make a request to get likes', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      call(getLikesFromFirebase, 'uid', 1),
    );
  });

  test('could make a request to get liked channels', (t) => {
    const responce = firebaseLikesResponse();
    t.deepEqual(
      generator.next(responce).value,
      call(getChannels, responce.snapshot),
    );
  });

  test('could make promises for all liked channels', (t) => {
    const promises = [
      new Promise(resolve => resolve()),
      new Promise(resolve => resolve()),
      new Promise(resolve => resolve()),
    ];
    t.deepEqual(
      generator.next(promises).value,
      call(Promise.all, promises),
    );
  });

  test('could send ChannelStore to action', (t) => {
    t.deepEqual(
      generator.next(channelsStoreMock).value,
      put(likedChannelsActions.likedChannelsSuccess(channelsStoreWithKeyMock())),
    );
    t.deepEqual(
      generator.next().value,
      put(likedChannelsActions.likedChannelsPaginate()),
    );
    t.true(generator.next().done);
  });
});

test.serial.group('Abnormal', () => {
  const generator = getLikedChannels();

  test('could send errorResponce to action', (t) => {
    const errorResponce = firebaseLikesResponse(statusCode.InternalError);
    generator.next();
    generator.next();
    generator.next('uid');
    t.deepEqual(
      generator.next(errorResponce).value,
      put(likedChannelsActions.likedChannelsFailure()),
    );
    t.true(generator.next().done);
  });
});
