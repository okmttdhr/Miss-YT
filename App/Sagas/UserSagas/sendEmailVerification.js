// @flow
import { fork } from 'redux-saga/effects';
import {sendEmailVerificationWithFirebase} from '../../Services/';
import {withUpdateUser} from './index';

export function* sendEmailVerification<T>(): Generator<T, any, any> {
  yield fork(withUpdateUser, sendEmailVerificationWithFirebase);
}
