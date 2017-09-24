// @flow
import type {TChannel, TLike} from '../../types/';
import {channelsActions, userActions, defaultUser, likedChannelsActions} from '../../Redux/';
import {channelsRef, likesRef} from './ref';
import {firebaseApp} from './init';
import {convertUserFromFirebaseToStore} from './index';

const likes = (store: any, uid: string) => {
  const {dispatch, getState} = store;
  likesRef.child(uid).on('child_changed', (snapshot) => {
    const like: TLike = snapshot.val();
    console.log('likesRef child_changed');
    const noChange = typeof getState().likedChannels.items[like.channelId] === 'undefined';
    if (noChange) {
      return;
    }
    dispatch(likedChannelsActions.likesChanged(like));
  });
};

const auth = (store: any) => {
  const {dispatch} = store;
  firebaseApp.auth().onAuthStateChanged((firebaseUser) => {
    console.log('firebaseUser', firebaseUser);
    if (!firebaseUser) {
      dispatch(userActions.userSuccess(defaultUser.item));
      return;
    }
    const user = convertUserFromFirebaseToStore(firebaseUser);
    dispatch(userActions.userSuccess(user));
    dispatch(likedChannelsActions.syncLikes());
    likes(store, user.uid);
  });
};

export const firebaseSubscribe = (store: any) => {
  const {dispatch, getState} = store;
  auth(store);
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
