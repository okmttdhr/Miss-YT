// @flow
import {channelsRef} from './ref';
import type {TChannel} from '../../types/';
import {channelsActions, userActions, defaultUser} from '../../Redux/';
import {firebaseApp} from './init';

const auth = (dispatch) => {
  firebaseApp.auth().onAuthStateChanged((firebaseUser) => {
    console.log('firebaseUser', firebaseUser);
    if (!firebaseUser) {
      dispatch(userActions.userSuccess(defaultUser.item));
      return;
    }
    const user = {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous,
      phoneNumber: firebaseUser.phoneNumber,
      photoURL: firebaseUser.photoURL,
      providerData: firebaseUser.providerData,
      providerId: firebaseUser.providerId,
      refreshToken: firebaseUser.refreshToken,
      uid: firebaseUser.uid,
    };
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
