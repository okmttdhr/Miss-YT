import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import { TabIcon } from '../../App/Components';

const wrapper = shallow(<TabIcon title="title" selected="true" />);

test('component exists', (t) => {
  t.is(wrapper.length, 1);
});

test('component structure', (t) => {
  t.is(wrapper.name(), 'View');
  t.is(wrapper.children().length, 1);
  t.is(wrapper.children().first().name(), 'Text');
});

test('Has text and set properly', (t) => {
  t.is(wrapper.containsMatchingElement(<Text>title</Text>), true);
});
