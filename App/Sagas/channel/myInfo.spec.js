import test from 'ava-spec';
import { call, put, select } from 'redux-saga/effects';

import { channelsStoreWithKeyMock, likeWithKeyMock } from '../../../Tests/mock/';
import {channelActions} from '../../Redux/';
import { getLikeWithChannelId } from '../../Services/';
import {uidSelector, likedChannelsSelector} from '../selector';
import { channelMyInfoGet } from './myInfo';

test.serial.group('Normal: from state', () => {
  const generator = channelMyInfoGet({channelId: 'ID2'});
  test('could select likedChannels', (t) => {
    t.deepEqual(
      generator.next().value,
      select(likedChannelsSelector),
    );
  });

  test('could get channel from state', (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      put(channelActions.channelMyInfoGetSuccess({
        rank: 2,
        likeCount: 2,
      })),
    );
    t.true(generator.next().done);
  });
});

test.serial.group('Normal: from server', () => {
  const generator = channelMyInfoGet({channelId: 'ID1'});
  generator.next();
  test('could select uid', (t) => {
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      select(uidSelector),
    );
  });

  test('could make a request', (t) => {
    t.deepEqual(
      generator.next('uid').value,
      call(getLikeWithChannelId, 'uid', 'ID1'),
    );
  });

  test('could update channel', (t) => {
    t.deepEqual(
      generator.next({
        status: 200,
        message: '',
        snapshot: {val: () => {
          return likeWithKeyMock(2);
        }},
      }).value,
      put(channelActions.channelMyInfoGetSuccess({
        rank: 2,
        likeCount: 2,
      })),
    );
  });
});

test.serial.group('Abnormal', () => {
  const generator = channelMyInfoGet({channelId: 'ID1'});
  generator.next();
  generator.next(channelsStoreWithKeyMock());
  generator.next('uid');
  test('could update errorMessage', (t) => {
    t.deepEqual(
      generator.next({
        status: 500,
        message: 'errorMessageMyInfo',
      }).value,
      put(channelActions.channelMyInfoGetFailure('errorMessageMyInfo')),
    );
  });
});

test.serial.group('Abnormal: no uid', () => {
  const generator = channelMyInfoGet({channelId: 'ID1'});
  generator.next();
  generator.next(channelsStoreWithKeyMock());
  test('could stop requesting if no uid', (t) => {
    t.deepEqual(
      generator.next().value,
      put(channelActions.channelMyInfoGetRequestCancel()),
    );
    t.true(generator.next().done);
  });
});
