// @flow
import * as firebase from 'firebase'

import {ChannelsResource, channelsRef, logFinished} from '../index'
import type {TChannelsRef} from '../firebaseRef'
import type {TChannel} from '../../types/Channel'
import type {TChannelResponse} from '../../types/ChannelResponse'

// add CHANNEL_IDS before dispatching batch
const CHANNEL_IDS = 'UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA, UCB10yM5qyQpNsMNDQ1VHxKg, UCiOm_FmFK4jxB9VRuFC1pag'

const createChannel = (channel: TChannelResponse): TChannel => {
  const subscriberCount = Number(channel.statistics.subscriberCount)
  const viewCount = Number(channel.statistics.viewCount)
  return {
    id: '',
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    modifiedAt: firebase.database.ServerValue.TIMESTAMP,
    rank: 0,
    score: subscriberCount,
    likeCount: 0,
    status: 'inactive',
    youtube: {
      id: channel.id,
      name: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.high.url,
      banner: channel.brandingSettings.image.bannerMobileImageUrl,
      subscriberCount: subscriberCount,
      viewCount: viewCount
    }
  }
}

const addToFirebase = (channelsResponse: TChannelResponse[]) => {
  channelsResponse.forEach((channelResponse, index) => {
    console.log(`${channelResponse.snippet.title} was pushed`)
    const ref: TChannelsRef = channelsRef
    ref.push(createChannel(channelResponse))
  })
}

export const addChannels = () => {
  const channelsResource = new ChannelsResource()
  const addChannelsPromise = channelsResource.get(CHANNEL_IDS).then(res => addToFirebase(res.data.items))
  logFinished(addChannelsPromise, 'addChannels')
}
