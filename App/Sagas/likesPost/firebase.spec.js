// @flow
import test from 'ava-spec';
import {call} from 'redux-saga/effects';

import {likeWithKeyMock} from '../../../Tests/mock/';
import { getLikeWithChannelId } from '../../Services';
import {likesPostToFirebase, increaseOnFirebase} from './firebase';

test.serial.group('Normal: increase', () => {
  const generator = likesPostToFirebase.increase('channelId', 1, 'uid');

  test('could check if the target like is already on server', (t) => {
    t.deepEqual(
      generator.next().value,
      call(getLikeWithChannelId, 'uid', 'channelId'),
    );
  });

  test('could get likedChannels', (t) => {
    t.deepEqual(
      generator.next({
        status: 200,
        message: '',
        snapshot: {val: () => {
          return likeWithKeyMock();
        }},
      }).value,
      call(increaseOnFirebase, 'uid', 'KEY0', 1),
    );
  });
});
