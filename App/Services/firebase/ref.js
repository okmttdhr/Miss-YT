// @flow
import {assign} from 'lodash';
import type {TChannel} from '../../types/Channel';
import {firebaseApp} from './init';

export type TChannelsRef = {
  startAt: () => TChannelsRef;
  equalTo: () => TChannelsRef;
  limitToFirst: () => TChannelsRef;
  orderByChild: (path: string) => TChannelsRef;
  push: (channel: TChannel) => void;
  update: () => Promise<any>;
  once: () => Promise<any>;
  on: () => void;
}

export const channelsRef: TChannelsRef = firebaseApp.database().ref('channels');
export const likesRef = firebaseApp.database().ref('likes');

export const updateWithTimestamp = (ref: any, key: string, modifier: Object): Promise<any> => {
  return ref.update(assign({}, modifier, {
    [`/${key}/modifiedAt`]: firebaseApp.database.ServerValue.TIMESTAMP,
  }));
};

export const channelsRefUpdate = (key: string, modifier: Object): Promise<any> => {
  return updateWithTimestamp(channelsRef, key, modifier);
};

export const likesRefUpdate = (key: string, modifier: Object): Promise<any> => {
  return updateWithTimestamp(likesRef, key, modifier);
};
