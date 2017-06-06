// @flow
import test from 'ava-spec';
import { call, put } from 'redux-saga/effects';

import { userActions } from '../Redux/';
import { loginWithFirebase, authenticate } from './UserSagas';
import { statusCode } from '../Services/';

test.serial.group('Normal', () => {
  const generator = authenticate(loginWithFirebase);

  test('could set the requesting status to `redux store`', (t) => {
    t.deepEqual(
      generator.next().value,
      put(userActions.userRequest()),
    );
  });

  test('could make a request to authenticate', (t) => {
    t.deepEqual(
      generator.next().value,
      call(loginWithFirebase),
    );
  });

  test('could finish `generator`', (t) => {
    t.deepEqual(
      generator.next({
        status: statusCode.Ok,
        message: '',
      }).done,
      true,
    );
  });
});

test.serial.group('Abnormal', () => {
  const generator = authenticate(loginWithFirebase);

  test('could catch the error for authentication', (t) => {
    generator.next();
    generator.next();
    t.deepEqual(
      generator.next({status: statusCode.InternalError, message: ''}).value,
      put(userActions.userFailure()),
    );
    t.deepEqual(generator.next().done, true);
  });
});
