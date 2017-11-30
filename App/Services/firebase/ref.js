// @flow
import type {TChannel} from '../../types/channel';
import {firebaseApp} from './init';

export type TChannelsRef = {
  child: (path: string) => TChannelsRef;
  startAt: (startAt: number) => TChannelsRef;
  equalTo: (value: any) => TChannelsRef;
  limitToFirst: (limit: number) => TChannelsRef;
  orderByChild: (path: string) => TChannelsRef;
  push: (channel: TChannel) => void;
  update: () => Promise<any>;
  once: (eventType: string) => Promise<any>;
  transaction: (callback: any) => Promise<any>;
  on: (value: any, value: any) => void;
}

export const channelsRef: TChannelsRef = firebaseApp.database().ref('channels');
export const likesRef = firebaseApp.database().ref('likes');
