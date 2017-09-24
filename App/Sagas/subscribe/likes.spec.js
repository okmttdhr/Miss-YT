// @flow
import test from 'ava-spec';
import { put, select } from 'redux-saga/effects';

import { likeMock, channelStoreMock } from '../../../Tests/mock/';
import {likedChannelsActions} from '../../Redux/';
import {likedChannelsSelector} from '../selector';
import { likesChanged } from './likes';

test.serial.group('Normal', () => {
  const generator = likesChanged({snapshot: {val: () => {
    return likeMock();
  }}});

  test('could get localLikedChannels', (t) => {
    t.deepEqual(
      generator.next().value,
      select(likedChannelsSelector),
    );
  });

  test('could update likedChannels state', (t) => {
    t.deepEqual(
      generator.next({
        CHANNELID0: channelStoreMock(),
      }).value,
      put(likedChannelsActions.likesChangedSuccess(likeMock())),
    );
  });
});

test.serial.group('Abnormal', () => {
  const generator = likesChanged({snapshot: {val: () => {
    return likeMock();
  }}});
  generator.next();

  test('could finish generator for not existing likedChannels', (t) => {
    t.true(
      generator.next({
        CHANNELID_INVALID: channelStoreMock(),
      }).done,
    );
  });
});
