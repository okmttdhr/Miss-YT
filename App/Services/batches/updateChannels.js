// @flow
import Promise from 'bluebird';
import {toString, assign} from 'lodash';
import * as firebase from 'firebase';

import {ChannelsResource, channelsRef, logFinished} from '../index';
import type {TChannel} from '../../types/Channel';
import type {TChannelResponse} from '../../types/ChannelResponse';

// the parameter limit of TwitterUsersLookupResource's `screen_name`
const LIMIT = 100;
type TChannelsSnapshot = {[key: string]: TChannel}

const accumulateIds = (snapshot) => {
  const channels: TChannelsSnapshot = snapshot.val();
  const channelIds = Object.keys(channels).map((key, index) => channels[key].youtube.id);
  return {channelIds};
};

const toParameter = ids => ({
  channelIds: toString(ids.channelIds),
});

const getLatestItem = (channelIds, screenNames) => {
  console.log('getLatestItem');
  const channelsResource = new ChannelsResource();
  // change to something like `{channels: item, twitter, item}`, when you add TwitterUsersLookupResource
  return channelsResource.get(channelIds).then(res => ({channels: res.data.items}));
};

const updateChannelWithTimestamp = (key, modifier) => channelsRef.update(assign({}, modifier, {
  [`/${key}/modifiedAt`]: firebase.database.ServerValue.TIMESTAMP,
}));

const updateSubscriberCount = (channelsResponse: TChannelResponse[]) => {
  console.log('updateSubscriberCount');
  const promiseOnce = channelsResponse.map(channelResponse => channelsRef.orderByChild('youtube/id').equalTo(channelResponse.id).once('value').then((snapshot) => {
    const channels: TChannelsSnapshot = snapshot.val();
    const promiseUpdate = Object.keys(channels).map((key, index) => updateChannelWithTimestamp(key, {[`/${key}/youtube/subscriberCount`]: Number(channelResponse.statistics.subscriberCount)}));
    return Promise.all(promiseUpdate);
  }));
  return Promise.all(promiseOnce);
};

const addId = (channels: TChannelsSnapshot) => {
  console.log('addId');
  const promiseUpdate = Object.keys(channels).map((key, index) => updateChannelWithTimestamp(key, {[`/${key}/id`]: key}));
  return Promise.all(promiseUpdate);
};

const activate = (channels: TChannelsSnapshot) => {
  console.log('activate');
  const promiseUpdate = Object.keys(channels).map((key, index) => updateChannelWithTimestamp(key, {[`/${key}/status`]: 'active'}));
  return Promise.all(promiseUpdate);
};

const updateScore = (channels: TChannelsSnapshot) => {
  console.log('updateScore');
  const promiseUpdate = Object.keys(channels).map((key, index) => {
    const _score = channels[key].likeCount + channels[key].youtube.subscriberCount;
    const score = channels[key].twitter ? _score + channels[key].twitter.followersCount : _score;
    return updateChannelWithTimestamp(key, {[`/${key}/score`]: score});
  });
  return Promise.all(promiseUpdate);
};

const toAll = () => channelsRef.once('value').then((snapshot) => {
  const channels: TChannelsSnapshot = snapshot.val();
  return Promise.all([
    updateScore(channels),
    addId(channels),
    activate(channels),
  ]);
});

const updateRank = () => {
  console.log('updateRank');
  return channelsRef.orderByChild('score').once('value').then((snapshot) => {
    const channelKeys: Array<string> = [];
    snapshot.forEach((s) => {
      channelKeys.push(s.key);
    });
    const promiseUpdate = channelKeys.reverse().map((key, index) => updateChannelWithTimestamp(key, {[`/${key}/rank`]: index + 1}));
    return Promise.all(promiseUpdate);
  });
};

export const updateChannels = () => {
  const updateChannelsPromise = channelsRef.limitToFirst(LIMIT).once('value')
    .then(snapshot => accumulateIds(snapshot))
    .then((ids: {channelIds: string[]}) => toParameter(ids))
    .then((parameters: {channelIds: string}) => getLatestItem(parameters.channelIds))
    .then((response: {channels: TChannelResponse[]}) => updateSubscriberCount(response.channels))
    .then(() => toAll())
    .then(() => updateRank());

  logFinished(updateChannelsPromise, 'updateChannels');
};
