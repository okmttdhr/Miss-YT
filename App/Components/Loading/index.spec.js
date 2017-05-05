// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import {Loading} from './index';

test('display <Icon> when isShow is true', (t) => {
  const wrapper = shallow(
    <Loading isShow />,
  );
  t.is(wrapper.children().length, 1);
});

test('doesn\'t display <Icon> when isShow is false', (t) => {
  const wrapper = shallow(
    <Loading isShow={false} />,
  );
  t.is(wrapper.children().length, 0);
});
