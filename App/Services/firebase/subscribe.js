// @flow
import {channelsRef} from './ref';
import {channelsActions} from '../../Redux/';
import type {TChannel} from '../../types/';

export const firebaseSubscribe = (store) => {
  const {dispatch, getState} = store;
  channelsRef.on('child_changed', (snapshot) => {
    const channel: TChannel = snapshot.val();
    const noChange = typeof getState().channels.items[channel.id] === 'undefined';
    if (noChange) {
      return;
    }
    switch (channel.status) {
      case 'active':
        dispatch(channelsActions.channelsChanged(channel));
        break;
      case 'inactive':
      case 'uninitialized':
        dispatch(channelsActions.channelsRemoved(channel));
      // no default
    }
  });
  channelsRef.on('child_removed', (snapshot) => {
    dispatch(channelsActions.channelsRemoved(snapshot.val()));
  });
};
