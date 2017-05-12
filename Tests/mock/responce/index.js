// @flow
import {range} from 'lodash';
import type {TChannel} from '../../../App/types/Channel';

const snapshotMock = (value: Object) => ({
  key: 'key',
  val: () => value,
});

// separate store's channel from firebase's channel considering readability as mock
export const firebaseChannelMock = (i: number = 0): TChannel => ({
  id: `ID${i}`,
  createdAt: 12345,
  modifiedAt: 12345,
  rank: 0,
  score: i + 1,
  likeCount: 0,
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

const firebaseChannelsMock = range(10).map((i: number): TChannel => firebaseChannelMock(i));

export const firebaseChannelsResponse = (status: number = 200) => {
  let responce;
  switch (status) {
    case 200:
      responce = {
        status: 200,
        message: '',
        snapshot: [
          snapshotMock(firebaseChannelsMock),
        ],
      };
      break;
    case 500:
      responce = {
        status: 500,
        message: '',
      };
      break;
    // no default
  }
  return responce;
};
