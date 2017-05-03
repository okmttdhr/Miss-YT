// @flow
import type {TChannelStore} from '../Channel';

export type TDefaultChannels = {
  items: {[key: string]: TChannelStore},
  contentHeight: number,
  isFetching: boolean,
  errorMessage: string
}

export type TChannelsActions = {
  channelsRequest: () => any,
  channelsSuccess: () => any,
  channelsFailure: () => any,
  setContentHeight: (height: number) => void,
}
