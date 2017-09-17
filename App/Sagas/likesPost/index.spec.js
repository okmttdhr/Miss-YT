// @flow
import test from 'ava-spec';
import { call, select } from 'redux-saga/effects';

import { likedChannelsActions, channelsActions } from '../../Redux/';
import { likesPostToFirebase } from '../../Services';
import {uidSelector} from '../selector';
import { likesPostIncrease } from '../likesPost';

test.serial.group('Normal', () => {
  const generator = likesPostIncrease({channelId: 'channelId'});

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

  test('could make promises for all liked channels', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      call(likesPostToFirebase.channels, 'channelId', 1),
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
      call(likesPostToFirebase.likes, 'channelId', 1, 'uid'),
    );
  });
});
