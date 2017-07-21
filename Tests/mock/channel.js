// @flow
import {range} from 'lodash';
import type {TChannelStore} from '../../App/types/Channel';

// separate firebase's channel from firebase's channel considering readability as mock
export const channelStoreMock = (i: number = 0): TChannelStore => ({
  id: `ID${i}`,
  createdAt: 12345,
  modifiedAt: 12345,
  rank: 1,
  score: i + 1,
  likeCount: 0,
  status: i % 2 === 0 ? 'active' : 'inactive',
  isLiked: i % 2 === 0,
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

export const channelsStoreMock = range(10).map((i: number): TChannelStore => channelStoreMock(i));

export const channelsStoreWithKeyMock = () => {
  const channels: {[key: string]: TChannelStore} = {};
  channelsStoreMock.forEach((channel) => {
    if (channel.status === 'active') {
      channels[channel.id] = channel;
    }
  });
  return channels;
};
