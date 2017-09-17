// @flow
import test from 'ava-spec';
import { call, select } from 'redux-saga/effects';

import { channelsStoreWithKeyMock } from '../../../Tests/mock/';
import {uidSelector, likedChannelsSelector} from '../selector';
import { syncLikes, syncLikesToFirebase } from './sync';

test.serial.group('Normal', () => {
  const generator = syncLikes(channelsStoreWithKeyMock());

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

  test('could syncLikesToFirebase', (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      call(syncLikesToFirebase, channelsStoreWithKeyMock(), channelsStoreWithKeyMock(), 'uid'),
    );
  });
});
