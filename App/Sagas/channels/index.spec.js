import test from 'ava-spec';
import Promise from 'bluebird';
import { call, put, select } from 'redux-saga/effects';

import { firebaseChannelsResponse, channelsStoreMock, channelsStoreWithKeyMock } from '../../../Tests/mock/';
import { channelsActions } from '../../Redux/channels';
import { statusCode } from '../../Services/';
import { getChannels, getFromFirebase, createIsLikedPromises, getStartAt } from './index';

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
    const responce = firebaseChannelsResponse();
    const isLikedPromises = createIsLikedPromises(responce.snapshot);
    t.deepEqual(
      generator.next(responce).value,
      call(Promise.all, isLikedPromises),
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

  test('could send errorResponce to action', (t) => {
    const errorResponce = firebaseChannelsResponse(statusCode.InternalError);
    generator.next();
    generator.next();
    t.deepEqual(
      generator.next(errorResponce).value,
      put(channelsActions.channelsFailure('')),
    );
  });
});
