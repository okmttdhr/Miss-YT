// @flow
import type {TChannelStore} from '../channel';

export type TDefaultChannel = {
  item: TChannelStore,
  isFetching: boolean,
  errorMessage: string,
}

export type TChannelActions = {
  channelSelect: (item: TChannelStore) => void,
  channelLikesPostIncrease: () => void,
}
