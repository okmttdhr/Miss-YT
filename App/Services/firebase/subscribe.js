// @flow
import type {TChannel} from '../../types/';
import {channelsActions, userActions, defaultUser} from '../../Redux/';
import {channelsRef} from './ref';
import {firebaseApp} from './init';
import {convertUserFromFirebaseToStore} from './index';

const auth = (dispatch) => {
  firebaseApp.auth().onAuthStateChanged((firebaseUser) => {
    console.log('firebaseUser', firebaseUser);
    if (!firebaseUser) {
      dispatch(userActions.userSuccess(defaultUser.item));
      return;
    }
    const user = convertUserFromFirebaseToStore(firebaseUser);
    dispatch(userActions.userSuccess(user));
  });
};

export const firebaseSubscribe = (store: any) => {
  const {dispatch, getState} = store;
  auth(dispatch);
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
