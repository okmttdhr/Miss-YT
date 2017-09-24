// @flow
import type {TChannelStore} from '../Channel';

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
  channelsSuccess: () => any,
  channelsFailure: () => any,
  channelsChanged: () => any,
  channelsRemoved: () => any,
  setContentHeight: (height: number) => void,
}
