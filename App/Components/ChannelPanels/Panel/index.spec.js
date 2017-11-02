// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import { Panel } from './index';
import { channelStoreMock, channelActionsMock } from '../../../../Tests/mock/';

const likesPostRequestMock = () => {};
const wrapper = shallow(
  <Panel
    channel={channelStoreMock(1)}
    isMargin={false}
    likesPostRequest={likesPostRequestMock}
    channelActions={channelActionsMock}
  />,
);

test('displays data of channel', (t) => {
  t.is(wrapper.length, 1);
  t.is(wrapper.contains(1), true);
  t.is(wrapper.contains('NAME1'), true);
});
