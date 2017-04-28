// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import { ChannelPanels } from './index';
import { channelsStoreMock } from '../../../Tests/mock/';
import { Panel } from './Panel/';

const wrapper = shallow(<ChannelPanels channels={channelsStoreMock} />);

test('has right number of <Panel>', (t) => {
  t.is(wrapper.find(Panel).length, 10);
});
