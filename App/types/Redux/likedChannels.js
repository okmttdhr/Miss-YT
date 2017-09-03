// @flow
import type {TDefaultChannels, TLikesPostActions} from './channels';
import type {TChannelStore} from '../Channel';

export type TDefaultLikedChannels = TDefaultChannels

export type TLikedChannelsActions = TLikesPostActions & {
  likedChannelsRequest: (channelId: string) => void,
  likedChannelsSuccess: (item: {[key: string]: TChannelStore}) => void,
  likedChannelsFailure: () => any,
  likedChannelsChanged: () => any,
  likedChannelsRemoved: () => any,
  likedChannelsSetContentHeight: (height: number) => void,
}
