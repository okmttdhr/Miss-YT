// @flow
import type {TChannelStore, TChannelStoreWithKey, TChannel} from '../channel';

export type TDefaultChannels = {
  items: {[key: string]: TChannelStore},
  contentHeight: number,
  isFetching: boolean,
  errorMessage: string,
  startAt: number,
}

export type TChannelsLikesPostActions = {
  channelsLikesPostRequest: (channel: TChannelStore) => void,
  likesPostSuccess: (channel: TChannelStore) => void,
  likesPostFailure: (channelId: string, errorMessage: string) => void,
  channelsLikesPostIncrease: (channelId: string) => void,
}

export type TChannelsActions = TChannelsLikesPostActions & {
  channelsRequest: () => any,
  channelsSuccess: (items: TChannelStoreWithKey) => void,
  channelsFailure: (errorMessage: string) => void,
  channelsChanged: (item: TChannel) => void,
  channelsRemoved: (item: TChannel) => void,
  setContentHeight: (height: number) => void,
}
