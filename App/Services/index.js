// @flow
import type {TChannelStore, TChannelStoreWithKey} from '../types/';

export * from './firebase';
export * from './resources';
export * from './batches';
export * from './config';
export * from './response';

export const noop = () => {};

export const channelStoreArrayToObject = (channelsArray: TChannelStore[]) => {
  const channels: {[key: string]: TChannelStore} = {};
  channelsArray.forEach((channel) => {
    channels[channel.id] = channel;
  });
  return channels;
};

export const activeChannelStoreArray = (channelsArray: TChannelStore[]) => {
  return channelsArray.filter((channel) => {
    return channel.status === 'active';
  });
};

export const channelStoreArrayToActiveObject =
(channelsArray: TChannelStore[]): TChannelStoreWithKey => {
  return channelStoreArrayToObject(activeChannelStoreArray(channelsArray));
};
