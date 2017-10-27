// @flow
import { merge } from 'lodash';
import test from 'ava-spec';
import { call, select, put, take, fork } from 'redux-saga/effects';

import {channelStoreMock, channelsStoreWithKeyMock, likeWithKeyMock} from '../../../Tests/mock/';
import { likedChannelsActions, channelsActions, channelActions, likedChannelsTypes } from '../../Redux/';
import { getLikeWithChannelId } from '../../Services';
import {uidSelector, likedChannelsSelector} from '../selector';
import { likesPostIncrease, mergeLikedChannelToLocal } from '../likesPost';
import {likesPostToFirebase} from './firebase';

test.serial.group('Normal: increase', () => {
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

  test("could increase channel detail's likeCount", (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      put(channelActions.channelLikesPostIncrease()),
    );
  });

  test("could increase channels' likeCount", (t) => {
    t.deepEqual(
      generator.next().value,
      put(channelsActions.channelsLikesPostIncrease('ID0')),
    );
  });

  test("could increase likedChannels' likeCount", (t) => {
    t.deepEqual(
      generator.next().value,
      put(likedChannelsActions.likedChannelsLikesPostIncrease('ID0')),
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
      call(likesPostToFirebase.increase, 'ID0', 1, 'uid'),
    );
  });
});

test.serial.group('Normal: add', () => {
  const generator = likesPostIncrease({channel: channelStoreMock(10)});

  generator.next();
  generator.next('uid');

  test('could update localLikedChannels', (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      fork(mergeLikedChannelToLocal, channelStoreMock(10), 'uid', channelsStoreWithKeyMock()),
    );
  });

  test('could wait for updationg localLikedChannels', (t) => {
    t.deepEqual(
      generator.next().value,
      take(likedChannelsTypes.LIKED_CHANNELS_SUCCESS),
    );
  });

  test('could finish generator', (t) => {
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    t.true(generator.next().done);
  });
});

test.serial.group('mergeLikedChannelToLocal', () => {
  test.serial.group('new like', () => {
    const generator = mergeLikedChannelToLocal(
      channelStoreMock(3),
      'uid',
      channelsStoreWithKeyMock(),
    );

    test('could call request', (t) => {
      t.deepEqual(
        generator.next().value,
        call(getLikeWithChannelId, 'uid', channelStoreMock(3).id),
      );
    });

    test('could get likedChannels', (t) => {
      t.deepEqual(
        generator.next({
          status: 200,
          snapshot: {val: () => {
            return likeWithKeyMock(3);
          }},
        }).value,
        put(likedChannelsActions.likedChannelsSuccess(
          merge({}, {[channelStoreMock(3).id]: channelStoreMock(3)}, {[channelStoreMock(3).id]: {
            isLiked: true,
            rank: 3,
            likeCount: 3,
          }}),
        )),
      );
    });
  });
  test.serial.group('existing like', () => {
    const generator = mergeLikedChannelToLocal(
      channelStoreMock(),
      'uid',
      channelsStoreWithKeyMock(),
    );

    test('could call request', (t) => {
      t.deepEqual(
        generator.next().value,
        call(getLikeWithChannelId, 'uid', channelStoreMock().id),
      );
    });

    test('could get likedChannels', (t) => {
      t.deepEqual(
        generator.next({
          status: 500,
          snapshot: null,
        }).value,
        put(likedChannelsActions.likedChannelsSuccess(
          merge({}, {[channelStoreMock().id]: channelStoreMock()}, {[channelStoreMock().id]: {
            isLiked: true,
            rank: 6,
            likeCount: 1,
          }}),
        )),
      );
    });
  });
});
