// @flow
import type {TChannel} from '../../types/';
import {channelsActions, userActions, defaultUser, likedChannelsActions} from '../../Redux/';
import {firebaseApp, channelsRef, likesRef, convertUserFromFirebaseToStore} from '../../Services/';

export * from './likes';

export const subscribeFirebase = (store: any) => {
  const {dispatch, getState} = store;

  firebaseApp.auth().onAuthStateChanged((firebaseUser) => {
    console.log('firebaseUser', firebaseUser);
    if (!firebaseUser) {
      dispatch(userActions.userSuccess(defaultUser.item));
      return;
    }
    const user = convertUserFromFirebaseToStore(firebaseUser);
    dispatch(userActions.userSuccess(user));
    dispatch(likedChannelsActions.likesSync());

    likesRef.child(user.uid).on('child_changed', (snapshot) => {
      console.log('likesRef child_changed');
      dispatch(likedChannelsActions.likesChanged(snapshot));
    });
  });

  channelsRef.on('child_changed', (snapshot) => {
    const channel: TChannel = snapshot.val();
    const noChange = typeof getState().channels.items[channel.id] === 'undefined';
    if (noChange) {
      return;
    }
    switch (channel.status) {
      case 'active':
        dispatch(channelsActions.channelsChanged(channel));
        dispatch(likedChannelsActions.likedChannelsChanged(channel));
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
