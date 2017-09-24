// @flow
import test from 'ava-spec';
import {call} from 'redux-saga/effects';

import {likeWithKeyMock} from '../../../Tests/mock/';
import { getLikeWithChannelId } from '../../Services';
import {likesPostToFirebase, increaseOnFirebase} from './firebase';

test.serial.group('Normal', () => {
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

test.serial.group('Abnormal', () => {
  const generator = likesPostToFirebase.increase('channelId', 1, 'uid');
  generator.next();

  test('could push new like to Firebase', (t) => {
    t.deepEqual(
      generator.next({
        status: 404,
        message: '',
        snapshot: null,
      }).value,
      call(likesPostToFirebase.likesNew, 'channelId', 1, 'uid'),
    );
  });
});

test.serial.group('Abnormal', () => {
  const generator = likesPostToFirebase.increase('channelId', 1, 'uid');
  generator.next();

  test("could return response when it couldn't get like", (t) => {
    const response = {
      status: 500,
      message: '',
      snapshot: null,
    };
    t.deepEqual(generator.next(response).value, response);
  });
});
