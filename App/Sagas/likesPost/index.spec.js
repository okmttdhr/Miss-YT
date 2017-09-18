// @flow
import { assign } from 'lodash';
import test from 'ava-spec';
import { call, select } from 'redux-saga/effects';

import {channelStoreMock, channelsStoreWithKeyMock, firebaseLikeMock} from '../../../Tests/mock/';
import { likedChannelsActions, channelsActions } from '../../Redux/';
import { likesPostToFirebase } from '../../Services';
import {uidSelector, likedChannelsSelector} from '../selector';
import { likesPostIncrease, mergeLikedChannelToLocal, likedChannelOnServer } from '../likesPost';

test.serial.group('Normal', () => {
  const generator = likesPostIncrease({channel: channelStoreMock()});

  test('could get uid', (t) => {
    t.deepEqual(
      generator.next().value,
      select(uidSelector),
    );
  });

  test('could get likedChannels', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      select(likedChannelsSelector),
    );
  });

  test('could increase channels likeCount', (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      call(channelsActions.likesPostIncrease, 'ID0'),
    );
  });

  test('could increase likedChannels likeCount', (t) => {
    t.deepEqual(
      generator.next().value,
      call(likedChannelsActions.likesPostIncrease, 'ID0'),
    );
  });

  test('could make promises for all liked channels', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      call(likesPostToFirebase.channels, 'ID0', 1),
    );
  });

  test('could make promises for all liked channels', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      call(likesPostToFirebase.likesIncrease, 'ID0', 1, 'uid'),
    );
  });
});

test.serial.group('getLikedChannelOnServer', () => {
  test.serial.group('Normal', () => {
    const generator = mergeLikedChannelToLocal(
      channelStoreMock(),
      'uid',
      'channelId',
    );

    test('could call request', (t) => {
      t.deepEqual(
        generator.next().value,
        call(likedChannelOnServer, 'uid', 'channelId'),
      );
    });

    test('could get likedChannels', (t) => {
      t.deepEqual(
        generator.next({
          status: 200,
          snapshot: {val: () => {
            return firebaseLikeMock(3);
          }},
        }).value,
        call(likedChannelsActions.likedChannelsSuccess, {channelId: assign({}, channelStoreMock(), {
          isLiked: true,
          rank: 3,
          likeCount: 3,
        })}),
      );
    });
  });
  test.serial.group('Abnormal', () => {
    const generator = mergeLikedChannelToLocal(
      channelStoreMock(),
      'uid',
      'channelId',
    );

    test('could call request', (t) => {
      t.deepEqual(
        generator.next().value,
        call(likedChannelOnServer, 'uid', 'channelId'),
      );
    });

    test('could get likedChannels', (t) => {
      t.deepEqual(
        generator.next({
          status: 500,
          snapshot: null,
        }).value,
        call(likedChannelsActions.likedChannelsSuccess, {channelId: assign({}, channelStoreMock(), {
          isLiked: true,
          rank: 0,
          likeCount: 1,
        })}),
      );
    });
  });
});
