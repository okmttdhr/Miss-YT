// @flow
import Promise from 'bluebird'
import * as firebase from 'firebase'

import {ChannelsResource, channelsRef, logFinished} from '../index'
import type {TChannel} from '../../types/Channel'
import type {TChannelResponse} from '../../types/ChannelResponse'

// add CHANNEL_IDS before dispatching batch
const CHANNEL_IDS = `
  UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA, UCB10yM5qyQpNsMNDQ1VHxKg, UCiOm_FmFK4jxB9VRuFC1pag,
  UCCuizDTLsr-mNm_PEGdChVg
`

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

const channelExists = (channelResponse: TChannelResponse) => {
  return channelsRef.orderByChild('youtube/id').equalTo(channelResponse.id).once('value')
    .then((snapshot) => {
      if (snapshot.val() === null) {
        return false
      }
      return true
    })
    .catch(() => false)
}

const addToFirebase = (channelsResponse: TChannelResponse[]) => {
  const promiseAdded = channelsResponse.map((channelResponse, index) => {
    return channelExists(channelResponse).then((exists) => {
      if (exists) {
        return
      }
      channelsRef.push(createChannel(channelResponse))
      console.log(`${channelResponse.snippet.title} was pushed`)
      return
    })
  })
  return Promise.all(promiseAdded)
}

export const addChannels = () => {
  const channelsResource = new ChannelsResource()
  const addChannelsPromise = channelsResource.get(CHANNEL_IDS)
    .then(res => addToFirebase(res.data.items))
  logFinished(addChannelsPromise, 'addChannels')
}
