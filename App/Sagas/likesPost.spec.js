// @flow
import test from 'ava-spec';
import { call, select } from 'redux-saga/effects';

import { likedChannelsActions, channelsActions } from '../Redux/';
import {uidSelector} from './selector';
import { likesPost, updateOnFirebase } from './likesPost';

test.serial.group('Normal', () => {
  const generator = likesPost({channelId: 'channelId'});

  test('could increase channels likeCount', (t) => {
    t.deepEqual(
      generator.next().value,
      call(channelsActions.likesPostIncrease, 'channelId'),
    );
  });

  test('could increase likedChannels likeCount', (t) => {
    t.deepEqual(
      generator.next().value,
      call(likedChannelsActions.likesPostIncrease, 'channelId'),
    );
  });

  test('could get uid', (t) => {
    t.deepEqual(
      generator.next().value,
      select(uidSelector),
    );
  });

  test('could make promises for all liked channels', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      call(updateOnFirebase, 'channelId', 'uid'),
    );
  });
});
