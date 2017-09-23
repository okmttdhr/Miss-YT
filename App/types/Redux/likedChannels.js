// @flow
import type {TDefaultChannels} from './channels';
import type {TChannelStore} from '../Channel';

export type TDefaultLikedChannels = TDefaultChannels

export type TLikedChannelsLikesPostActions = {
  likedChannelsLikesPostRequest: (channel: TChannelStore) => void,
  likesPostSuccess: (channel: TChannelStore) => void,
  likesPostFailure: (channelId: string, errorMessage: string) => void,
  likedChannelsLikesPostIncrease: (channelId: string) => void,
}

export type TLikedChannelsActions = TLikedChannelsLikesPostActions & {
  likedChannelsRequest: () => void,
  likedChannelsSuccess: (item: {[key: string]: TChannelStore}) => void,
  likedChannelsFailure: () => any,
  likedChannelsChanged: () => any,
  likedChannelsRemoved: () => any,
  likedChannelsSetContentHeight: (height: number) => void,
  likedChannelsPaginate: () => void,
}
