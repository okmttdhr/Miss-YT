// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import { ChannelPanels } from './index';
import { defaultChannelsMock } from '../../../Tests/mock/';
import { Panel } from './Panel/';

const setContentHeightMock = () => {
  console.log('setContentHeightMock');
};
const channelsRequestMock = () => {
  console.log('channelsRequestMock');
};
const likesPostRequestMock = () => {};

test('has right number of <Panel>', (t) => {
  const wrapper = shallow(
    <ChannelPanels
      channels={defaultChannelsMock}
      setContentHeight={setContentHeightMock}
      channelsRequest={channelsRequestMock}
      likesPostRequest={likesPostRequestMock}
    />,
  );
  t.is(wrapper.find(Panel).length, 4);
});
