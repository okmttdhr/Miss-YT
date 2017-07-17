// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { assign } from 'lodash';

import { defaultUserMock, userActionsMock } from '../../../Tests/mock/';
import { AccountForm } from './index';
import {PasswordResetForm} from './PasswordResetForm';
import {AuthenticateForm} from './AuthenticateForm';

test('should display AuthenticateForm', (t) => {
  const wrapper = shallow(
    <AccountForm user={defaultUserMock} userActions={userActionsMock} />,
  );
  t.is(wrapper.find(AuthenticateForm).length, 1);
});

test('should display PasswordResetForm', (t) => {
  const wrapper = shallow(
    <AccountForm
      user={assign({}, defaultUserMock, {isForgotPassword: true})}
      userActions={userActionsMock}
    />,
  );
  t.is(wrapper.find(PasswordResetForm).length, 1);
});
