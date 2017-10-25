// @flow
import test from 'ava';
import {assign} from 'lodash';
import {channelStoreMock} from '../../../Tests/mock/';
import { channelActions, channelReducer, DEFAULT_CHANNEL } from './index';

test('could select Channel', (t) => {
  const state = channelReducer(
    DEFAULT_CHANNEL,
    channelActions.channelSelect(channelStoreMock()),
  );
  t.deepEqual(state, assign({}, DEFAULT_CHANNEL, {
    item: channelStoreMock(),
  }));
});
