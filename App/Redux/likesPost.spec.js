// @flow
import Immutable from 'seamless-immutable';
import test from 'ava';
import { channelsActions, channelsReducer, DEFAULT_CHANNELS } from './channels';
import {channelsStoreWithKeyMock, channelStoreMock} from '../../Tests/mock/';

test('could make a request to get Channels', (t) => {
  const state = channelsReducer(
    Immutable(DEFAULT_CHANNELS.merge({
      items: channelsStoreWithKeyMock(),
    })),
    channelsActions.channelsLikesPostRequest(channelStoreMock()),
  );
  t.is(state.items.ID0.isFetching, true);
  t.is(state.items.ID0.errorMessage, '');
});
