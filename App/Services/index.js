// @flow
import type {APIResponse, TChannelStore} from '../types/';
import {statusCode} from './resources';

export * from './firebase';
export * from './resources';
export * from './batches';
export * from './styles';

export const snapshotExists = (snapshot) => {
  if (snapshot.val() === null) {
    return false;
  }
  return true;
};

export const isSuccess = (response: APIResponse) => response.status === statusCode.Ok;

export const noop = () => {};

export const channelStoreArrayToObject = (channelsArray: TChannelStore[]) => {
  const channels: {[key: string]: TChannelStore} = {};
  channelsArray.forEach((channel) => {
    channels[channel.id] = channel;
  });
  return channels;
};

export const activeChannelStoreArray = (channelsArray: TChannelStore[]) => {
  // TODO filterって破壊的だっけ？
  return channelsArray.filter((channel) => {
    return channel.status === 'active';
  });
};

export const channelStoreArrayToActiveObject =
(channelsArray: TChannelStore[]): {[key: string]: TChannelStore} => {
  return channelStoreArrayToObject(activeChannelStoreArray(channelsArray));
};
