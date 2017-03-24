// @flow
import type {TChannelStore} from '../Channel'

export type TDefaultChannels = {
  items: {[key: string]: TChannelStore},
  isFetching: boolean,
  errorMessage: string
}

export type TChannelsActions = {
  channelsRequest: () => any,
  channelsSuccess: () => any,
  channelsFailure: () => any,
}
