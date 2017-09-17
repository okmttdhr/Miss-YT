// @flow
import type {TDefaultChannels} from './channels';
import type {TDefaultLikedChannels} from './likedChannels';
import type {TDefaultUser} from './UserRedux';

export type TRootState = {
  channels: TDefaultChannels,
  likedChannels: TDefaultLikedChannels,
  user: TDefaultUser,
}
