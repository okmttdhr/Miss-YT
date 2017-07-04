// @flow
import test from 'ava';
import React from 'react';
import {Text} from 'react-native';
import { shallow } from 'enzyme';
import { merge } from 'lodash';

import { defaultUserMock } from '../../../Tests/mock/';
import { AccountInfo } from './index';
import {DisplayName} from './DisplayName/';

const updateProfileMock = () => {
  console.log('updateProfileMock');
};

test('should display name and email', (t) => {
  const verifiedUserMock = merge({}, defaultUserMock, {item: {emailVerified: true}});
  const wrapper = shallow(
    <AccountInfo user={verifiedUserMock} updateProfile={updateProfileMock} />,
  );
  t.is(wrapper.containsMatchingElement(
    <DisplayName user={verifiedUserMock} updateProfile={updateProfileMock} />,
  ), true);
  t.is(wrapper.containsMatchingElement(<Text>MOCK_EMAIL</Text>), true);
});
