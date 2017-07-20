// @flow
import type {TDefaultChannels} from './channels';

export type TDefaultLikedChannels = TDefaultChannels

export type TLikedChannelsActions = {
  likedChannelsRequest: () => any,
  likedChannelsSuccess: () => any,
  likedChannelsFailure: () => any,
  likedChannelsChanged: () => any,
  likedChannelsRemoved: () => any,
  likedChannelsSetContentHeight: (height: number) => void,
}
