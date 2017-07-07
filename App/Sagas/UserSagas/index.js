// @flow

import {userActions} from '../../Redux/';

export * from './authenticate';
export * from './updateProfile';
export * from './sendEmailVerification';

): Generator<T, any, any> {
  yield put(userActions.userRequest());
  if (!isSuccess(responce)) {
    yield put(userActions.userFailure(responce.message));
    return;
  }
}
