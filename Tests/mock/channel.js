// @flow
import {range} from 'lodash'
import type {TChannelStore} from '../../App/types/Channel'

export const channelsStoreMock = range(10).map((i: number): TChannelStore => {
  return {
    id: `ID${i}`,
    createdAt: 12345,
    modifiedAt: 12345,
    rank: 0,
    score: i + 1,
    likeCount: 0,
    status: 'inactive',
    isLiked: i % 2 === 0,
    youtube: {
      id: `ID${i}`,
      name: `NAME${i}`,
      description: `DESCRIPTION${i}`,
      thumbnail: `THUMBNAIL${i}`,
      banner: `BANNER${i}`,
      subscriberCount: i + 1,
      viewCount: i + 1
    }
  }
})

export const channelsStoreWithKeyMock = () => {
  const channels: {[key: string]: TChannelStore} = {}
  channelsStoreMock.forEach((channel) => {
    channels[channel.id] = channel
  })
  return channels
}
