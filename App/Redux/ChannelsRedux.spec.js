import test from 'ava';
import { channelsActions, channelsReducer, DEFAULT_CHANNELS } from './ChannelsRedux';

test('could make a request to get Channels', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsRequest());
  t.true(state.isFetching);
});

test('could update Channels', (t) => {
  const channelsMock = { isMock: true };
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsSuccess(channelsMock));
  t.deepEqual(state.items, channelsMock);
});

test('could update errorMessage', (t) => {
  const state = channelsReducer(DEFAULT_CHANNELS, channelsActions.channelsFailure());
  t.false(state.isFetching);
  t.is(state.errorMessage, 'error');
});
