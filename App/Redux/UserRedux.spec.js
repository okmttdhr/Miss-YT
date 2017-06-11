// @flow
import test from 'ava';
import {assign} from 'lodash';
import { userActions, userReducer, DEFAULT_USER } from './UserRedux';

test('could make a request to get User', (t) => {
  const state = userReducer(DEFAULT_USER, userActions.userRequest());
  t.true(state.isFetching);
});

test('could update User', (t) => {
  const userMock = {
    displayName: 'MOCK_DISPLAY_NAME',
    email: 'MOCK_EMAIL',
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: 'MOCK_PHONE_NUMBER',
    photoURL: 'MOCK_PHOTO_URL',
    providerData: [],
    providerId: 'MOCK_PROVIDER_ID',
    refreshToken: 'MOCK_REFRESH_TOKEN',
    uid: 'MOCK_UID',
  };
  const state = userReducer(DEFAULT_USER, userActions.userSuccess(userMock));
  t.deepEqual(state, assign({}, DEFAULT_USER, {
    item: userMock,
  }));
});

test('could update errorMessage', (t) => {
  const state = userReducer(DEFAULT_USER, userActions.userFailure('error'));
  t.false(state.isFetching);
  t.is(state.errorMessage, 'error');
});
