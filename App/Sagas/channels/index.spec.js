import test from 'ava-spec';
import Promise from 'bluebird';
import { call, put, select } from 'redux-saga/effects';

import { firebaseChannelsResponse, channelsStoreMock, channelsStoreWithKeyMock } from '../../../Tests/mock/';
import { channelsActions } from '../../Redux/channels';
import { statusCode } from '../../Services/';
import { getChannels, getFromFirebase, createChannelsWithIsLikedPromises, getStartAt } from './index';

test.serial.group('Normal', () => {
  const generator = getChannels();

  test('could select channels state', (t) => {
    t.deepEqual(
      generator.next().value,
      select(getStartAt),
    );
  });

  test('could make a request to get Channels', (t) => {
    t.deepEqual(
      generator.next(1).value,
      call(getFromFirebase, 1),
    );
  });

  test('could make a request to know channel is liked by user', (t) => {
    const response = firebaseChannelsResponse();
    generator.next(response);
    generator.next('uid');
    t.deepEqual(
      generator.next(channelsStoreWithKeyMock()).value,
      call(createChannelsWithIsLikedPromises, response.snapshot, channelsStoreWithKeyMock(), 'uid'),
    );
  });

  test('could resolve Promise', (t) => {
    const promises = new Promise(r => r(channelsStoreMock));
    t.deepEqual(
      generator.next(promises).value,
      call(Promise.all, promises),
    );
  });

  test('could send channels with isLiked to action', (t) => {
    t.deepEqual(
      generator.next(channelsStoreMock).value,
      put(channelsActions.channelsSuccess(channelsStoreWithKeyMock())),
    );
  });
});

test.serial.group('Abnormal', () => {
  const generator = getChannels();

  test('could send errorresponse to action', (t) => {
    const errorresponse = firebaseChannelsResponse(statusCode.InternalError);
    generator.next();
    generator.next();
    t.deepEqual(
      generator.next(errorresponse).value,
      put(channelsActions.channelsFailure('')),
    );
  });
});
