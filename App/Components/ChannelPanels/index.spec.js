// @flow
import test from 'ava';
import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import { ChannelPanels } from './index';
import { defaultChannelsMock } from '../../../Tests/mock/';
import { Panel } from './Panel/';

const setContentHeightMock = () => {};
const channelsRequestMock = () => {};
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

test('display errorMessage', (t) => {
  const wrapper = shallow(
    <ChannelPanels
      channels={{...defaultChannelsMock, errorMessage: 'error'}}
      setContentHeight={setContentHeightMock}
      channelsRequest={channelsRequestMock}
      likesPostRequest={likesPostRequestMock}
    />,
  );
  t.is(wrapper.find(Panel).length, 4);
  t.is(wrapper.find(Text).first().props().children, 'error');
});

test('display a message when no data', (t) => {
  const channels: any = {...defaultChannelsMock, items: []};
  const wrapper = shallow(
    <ChannelPanels
      channels={channels}
      setContentHeight={setContentHeightMock}
      channelsRequest={channelsRequestMock}
      likesPostRequest={likesPostRequestMock}
    />,
  );
  t.is(wrapper.find(Panel).length, 0);
  t.is(wrapper.find(Text).first().props().children, 'データがありません');
});
