// @flow
import test from 'ava-spec';
import { call, put } from 'redux-saga/effects';

import { userMock } from '../../../Tests/mock/';
import { userActions } from '../../Redux/';
import { statusCode } from '../../Services/';
import { update, updateProfileToFirebase } from './index';

const actionMock = {
  type: 'type',
  updates: {
    displayName: 'displayName',
    photoURL: 'photoURL',
  },
};

test.serial.group('Normal', () => {
  const generator = update(actionMock);

  test('could set the requesting status to `redux store`', (t) => {
    t.deepEqual(
      generator.next().value,
      put(userActions.userRequest()),
    );
  });

  test('could make a request to update', (t) => {
    t.deepEqual(
      generator.next().value,
      call(updateProfileToFirebase, actionMock.updates),
    );
  });

  test('could set the success status to `redux store`', (t) => {
    t.deepEqual(
      generator.next({
        status: statusCode.Ok,
        message: '',
        user: userMock,
      }).value,
      put(userActions.userSuccess(userMock)),
    );
    t.deepEqual(generator.next().done, true);
  });
});

test.serial.group('Abnormal', () => {
  const generator = update(actionMock);

  test('could catch the error for updating', (t) => {
    generator.next();
    generator.next();
    t.deepEqual(
      generator.next({status: statusCode.InternalError, message: 'error', user: null}).value,
      put(userActions.userFailure('error')),
    );
    t.deepEqual(generator.next().done, true);
  });
});
