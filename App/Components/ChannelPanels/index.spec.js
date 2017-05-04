// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import { ChannelPanels } from './index';
import { channelsStoreMock } from '../../../Tests/mock/';
import { Panel } from './Panel/';

const setContentHeightMock = () => {
  console.log('setContentHeightMock');
};
const channelsRequestMock = () => {
  console.log('channelsRequestMock');
};

const wrapper = shallow(
  <ChannelPanels
    channels={{
      items: channelsStoreMock,
      contentHeight: 100,
      isFetching: false,
      errorMessage: '',
      startAt: 1,
    }}
    setContentHeight={setContentHeightMock}
    channelsRequest={channelsRequestMock}
  />,
);

test('has right number of <Panel>', (t) => {
  t.is(wrapper.find(Panel).length, 10);
});
