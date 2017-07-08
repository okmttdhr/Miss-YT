// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import {ButtonDefault} from './ButtonDefault';

const wrapper = shallow(<ButtonDefault onPress={() => {}} text="hi" />);

test('component structure', (t) => {
  t.is(wrapper.name(), 'TouchableHighlight');
  t.is(wrapper.children().length, 1);
  t.is(wrapper.children().first().name(), 'Text');
});

test('should call onPress', (t) => {
  const spiedOnPress = spy(() => {});
  const wrapperPress = shallow(<ButtonDefault onPress={spiedOnPress} text="hi" />);

  t.is(spiedOnPress.called, false);
  wrapperPress.simulate('press');
  t.is(spiedOnPress.called, true);
});

test('should not call onPress when disabled', (t) => {
  const spiedOnPress = spy(() => {});
  const wrapperPress = shallow(<ButtonDefault onPress={spiedOnPress} text="hi" disabled />);

  t.is(spiedOnPress.called, false);
  wrapperPress.simulate('press');
  t.is(spiedOnPress.called, false);
});
