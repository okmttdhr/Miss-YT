// @flow
import test from 'ava-spec';
import { call, put } from 'redux-saga/effects';

import { userMock } from '../../../Tests/mock/';
import { userActions } from '../../Redux/';
import { statusCode, updateProfileToFirebase } from '../../Services/';
import { withUpdateUser } from './withUpdateUser';

const actionMock = {
  type: 'type',
  updates: {
    displayName: 'displayName',
    photoURL: 'photoURL',
  },
};

test.serial.group('Normal', () => {
  const generator = withUpdateUser(updateProfileToFirebase, [actionMock.updates]);

  test('could set the requesting status to user state', (t) => {
    t.deepEqual(
      generator.next().value,
      put(userActions.userRequest()),
    );
  });

  test('could call function which has side effects', (t) => {
    t.deepEqual(
      generator.next().value,
      call(updateProfileToFirebase, actionMock.updates),
    );
  });

  test('could update user state if it success', (t) => {
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
  const generator = withUpdateUser(updateProfileToFirebase, [actionMock.updates]);

  test('could catch the error', (t) => {
    generator.next();
    generator.next();
    t.deepEqual(
      generator.next({status: statusCode.InternalError, message: 'error', user: null}).value,
      put(userActions.userFailure('error')),
    );
    t.deepEqual(generator.next().done, true);
  });
});
