// @flow
import type {TDefaultChannels} from './channels';
import type {TDefaultLikedChannels} from './likedChannels';

export type TRootState = {
  channels: TDefaultChannels,
  likedChannels: TDefaultLikedChannels,
}
