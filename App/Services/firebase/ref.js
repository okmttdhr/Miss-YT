// @flow
import type {TChannel} from '../../types/Channel';
import {firebaseApp} from './init';

export type TChannelsRef = {
  child: () => TChannelsRef;
  startAt: () => TChannelsRef;
  equalTo: () => TChannelsRef;
  limitToFirst: () => TChannelsRef;
  orderByChild: (path: string) => TChannelsRef;
  push: (channel: TChannel) => void;
  update: () => Promise<any>;
  once: () => Promise<any>;
  transaction: () => Promise<any>;
  on: () => void;
}

export const channelsRef: TChannelsRef = firebaseApp.database().ref('channels');
export const likesRef = firebaseApp.database().ref('likes');
