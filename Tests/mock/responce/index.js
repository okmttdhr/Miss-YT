// @flow
import {range} from 'lodash'
import type {TChannel} from '../../../App/types/Channel'

const snapshotMock = (value: Object) => {
  return {
    key: 'key',
    val: () => value
  }
}

const firebaseChannelsMock = range(10).map((i): TChannel => {
  return {
    id: `ID${i}`,
    createdAt: 12345,
    modifiedAt: 12345,
    rank: 0,
    score: i + 1,
    likeCount: 0,
    status: 'inactive',
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

export const firebaseChannelsResponse = (status: number = 200) => {
  let responce
  switch (status) {
    case 200:
      responce = {
        status: 200,
        message: '',
        snapshot: [
          snapshotMock(firebaseChannelsMock)
        ]
      }
      break
    case 500:
      responce = {
        status: 500,
        message: ''
      }
      break
  }
  return responce
}
