// @flow
import test from 'ava';
import React from 'react';
import {TextInput} from 'react-native';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { defaultUserMock } from '../../../../Tests/mock';
import { DisplayName } from './index';

const updateProfileMock = () => {
  console.log('updateProfileMock');
};

test('should show initial `displayName`', (t) => {
  const wrapper = shallow(
    <DisplayName user={defaultUserMock} updateProfile={updateProfileMock} />,
  );
  t.is(wrapper.state('displayName'), '');
  t.is(wrapper.instance().props.user.item.displayName, 'MOCK_DISPLAY_NAME');
});

test('should edit `displayName`', (t) => {
  const wrapper = shallow(
    <DisplayName user={defaultUserMock} updateProfile={updateProfileMock} />,
  );
  wrapper.find(TextInput).first().simulate('changeText', 'NAME');
  t.is(wrapper.state('displayName'), 'NAME');
});

test('should request to update `displayName`', (t) => {
  const spiedUpdateProfileMock = spy(updateProfileMock);
  const wrapper = shallow(
    <DisplayName user={defaultUserMock} updateProfile={spiedUpdateProfileMock} />,
  );
  wrapper.find(TextInput).first().simulate('changeText', 'NAME');
  wrapper.find(TextInput).first().simulate('blur', { nativeEvent: { text: 'NAME' } });
  t.is(spiedUpdateProfileMock.called, true);
});

test('should sync local value with Firebase value', (t) => {
  const wrapper = shallow(
    <DisplayName user={defaultUserMock} updateProfile={updateProfileMock} />,
  );
  wrapper.setProps({user: {item: {displayName: 'NAME'}}});
  t.is(wrapper.state('displayName'), 'NAME');
});
