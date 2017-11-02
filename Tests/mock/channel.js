// @flow
import {range} from 'lodash';
import type {TChannelStore, TChannel} from '../../App/types/channel';
import {channelStoreArrayToActiveObject} from '../../App/Services';

export const channelMock = (i: number = 0): TChannel => ({
  id: `ID${i}`,
  createdAt: 12345,
  modifiedAt: 12345,
  rank: i,
  score: i + 1,
  likeCount: i,
  status: i % 2 === 0 ? 'active' : 'inactive',
  youtube: {
    id: `ID${i}`,
    name: `NAME${i}`,
    description: `DESCRIPTION${i}`,
    thumbnail: `THUMBNAIL${i}`,
    banner: `BANNER${i}`,
    subscriberCount: i + 1,
    viewCount: i + 1,
  },
});

export const channelStoreMock = (i: number = 0): TChannelStore => {
  return {
    ...channelMock(i),
    isLiked: i % 2 === 0,
    isFetching: false,
    errorMessage: '',
  };
};

export const channelStoreWithKeyMock = (i: number = 0) => {
  return channelStoreArrayToActiveObject([channelStoreMock(i)]);
};

export const channelsStoreMock = range(10).map((i: number): TChannelStore => channelStoreMock(i));

export const channelsStoreWithKeyMock = () => {
  return channelStoreArrayToActiveObject(channelsStoreMock);
};
