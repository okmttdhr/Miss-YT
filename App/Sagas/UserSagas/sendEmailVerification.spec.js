// @flow
import test from 'ava-spec';
import { call, put } from 'redux-saga/effects';

import { userMock } from '../../../Tests/mock/';
import { userActions } from '../../Redux/';
import { sendEmailVerificationWithFirebase, statusCode } from '../../Services/';
import { sendEmailVerification } from './index';

test.serial.group('Normal', () => {
  const generator = sendEmailVerification();

  test('could set the requesting status to `redux store`', (t) => {
    t.deepEqual(
      generator.next().value,
      put(userActions.userRequest()),
    );
  });

  test('could make a request to send email', (t) => {
    t.deepEqual(
      generator.next().value,
      call(sendEmailVerificationWithFirebase),
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
  const generator = sendEmailVerification();

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
