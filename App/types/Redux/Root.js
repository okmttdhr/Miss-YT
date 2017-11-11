// @flow
import type {TDefaultChannel} from './channel';
import type {TDefaultChannels} from './channels';
import type {TDefaultLikedChannels} from './likedChannels';
import type {TDefaultUser} from './UserRedux';

export type TRootState = {
  channel: TDefaultChannel,
  channels: TDefaultChannels,
  likedChannels: TDefaultLikedChannels,
  user: TDefaultUser,
}
