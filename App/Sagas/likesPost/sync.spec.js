// @flow
import test from 'ava-spec';
import { call, select } from 'redux-saga/effects';

import { channelsStoreWithKeyMock } from '../../../Tests/mock/';
import {uidSelector, likedChannelsSelector} from '../selector';
import {likesPostToFirebase} from './firebase';
import { likesSync } from './sync';

test.serial.group('Normal', () => {
  const generator = likesSync();

  test('could select uid', (t) => {
    t.deepEqual(
      generator.next().value,
      select(uidSelector),
    );
  });

  test('could select likedChannels', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      select(likedChannelsSelector),
    );
  });

  test('could likesSyncToFirebase', (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      call(likesPostToFirebase.sync, 'ID0', channelsStoreWithKeyMock().ID0.likeCount, 'uid'),
    );
    t.deepEqual(
      generator.next().value,
      call(likesPostToFirebase.sync, 'ID2', channelsStoreWithKeyMock().ID2.likeCount, 'uid'),
    );
    t.deepEqual(
      generator.next().value,
      call(likesPostToFirebase.sync, 'ID4', channelsStoreWithKeyMock().ID4.likeCount, 'uid'),
    );
    t.deepEqual(
      generator.next().value,
      call(likesPostToFirebase.sync, 'ID6', channelsStoreWithKeyMock().ID6.likeCount, 'uid'),
    );
    t.deepEqual(
      generator.next().value,
      call(likesPostToFirebase.sync, 'ID8', channelsStoreWithKeyMock().ID8.likeCount, 'uid'),
    );
    t.true(generator.next().done);
  });
});
