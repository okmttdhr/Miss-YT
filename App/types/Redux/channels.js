// @flow
import type {TChannelStore} from '../Channel';

export type TDefaultChannels = {
  items: {[key: string]: TChannelStore},
  contentHeight: number,
  isFetching: boolean,
  errorMessage: string,
  startAt: number,
}

export type TLikesPostActions = {
  likesPostRequest: (channelId: string) => any,
  likesPostSuccess: (channel: TChannelStore) => any,
  likesPostFailure: (channelId: string, errorMessage: string) => any,
}

export type TChannelsActions = TLikesPostActions & {
  channelsRequest: () => any,
  channelsSuccess: () => any,
  channelsFailure: () => any,
  channelsChanged: () => any,
  channelsRemoved: () => any,
  setContentHeight: (height: number) => void,
}
