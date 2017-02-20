// @flow
import Promise from 'bluebird'
import {toString} from 'lodash'
import {ChannelsResource, channelsRef, logFinished} from '../index'
import type {TChannel} from '../../types/Channel'
import type {TChannelResponse} from '../../types/ChannelResponse'

// the parameter limit of TwitterUsersLookupResource's `screen_name`
const LIMIT = 100
type TChannelsSnapshot = {[key: string]: TChannel}

const accumulateIds = (snapshot) => {
  const channels: TChannelsSnapshot = snapshot.val()
  const channelIds = Object.keys(channels).map((key, index) => channels[key].youtube.id)
  return {channelIds}
}

const toParameter = (ids) => {
  return {
    channelIds: toString(ids.channelIds)
  }
}

const getLatestItem = (channelIds, screenNames) => {
  console.log('getLatestItem')
  const channelsResource = new ChannelsResource()
  // change to something like `{channels: item, twitter, item}`, when you add TwitterUsersLookupResource
  return channelsResource.get(channelIds).then((res) => ({channels: res.data.items}))
}

const updateSubscriberCount = (channelsResponse: TChannelResponse[]) => {
  console.log('updateSubscriberCount')
  const promiseOnce = channelsResponse.map((channelResponse) => {
    return channelsRef.orderByChild('youtube/id').equalTo(channelResponse.id).once('value').then((snapshot) => {
      const channels: TChannelsSnapshot = snapshot.val()
      const promiseUpdate = Object.keys(channels).map((key, index) => {
        return channelsRef.update({[`/${key}/youtube/subscriberCount`]: Number(channelResponse.statistics.subscriberCount)})
      })
      return Promise.all(promiseUpdate)
    })
  })
  return Promise.all(promiseOnce)
}

const updateScore = () => {
  console.log('updateScore')
  return channelsRef.once('value').then((snapshot) => {
    const channels: TChannelsSnapshot = snapshot.val()
    const promiseUpdate = Object.keys(channels).map((key, index) => {
      const _score = channels[key].likeCount + channels[key].youtube.subscriberCount
      const score = channels[key].twitter ? _score + channels[key].twitter.followersCount : _score
      return channelsRef.update({[`/${key}/score`]: score})
    })
    return Promise.all(promiseUpdate)
  })
}

const updateRank = () => {
  console.log('updateRank')
  return channelsRef.orderByChild('score').once('value').then((snapshot) => {
    const channelKeys = []
    snapshot.forEach((s) => {
      channelKeys.push(s.key)
    })
    const promiseUpdate = channelKeys.reverse().map((key, index) => {
      return channelsRef.update({[`/${key}/rank`]: index + 1})
    })
    return Promise.all(promiseUpdate)
  })
}

export const updateChannels = () => {
  const updateChannelsPromise = channelsRef.limitToFirst(LIMIT).once('value')
    .then((snapshot) => accumulateIds(snapshot))
    .then((ids: {channelIds: string[]}) => toParameter(ids))
    .then((parameters: {channelIds: string}) => getLatestItem(parameters.channelIds))
    .then((response: {channels: TChannelResponse[]}) => updateSubscriberCount(response.channels))
    .then(() => updateScore())
    .then(() => updateRank())

  logFinished(updateChannelsPromise, 'updateChannels')
}
