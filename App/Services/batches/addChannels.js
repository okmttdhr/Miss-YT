// @flow
import Promise from 'bluebird';
import * as firebase from 'firebase';

import {ChannelsResource, channelsRef, logFinished, snapshotExists} from '../index';
import type {TChannel} from '../../types/Channel';
import type {TChannelResponse} from '../../types/ChannelResponse';

// add CHANNEL_IDS before dispatching batch
const CHANNEL_IDS = `
  UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA, UCB10yM5qyQpNsMNDQ1VHxKg, UCiOm_FmFK4jxB9VRuFC1pag,
  UCCuizDTLsr-mNm_PEGdChVg, UCRdQOBEzSpAOtZ_yitD7GpA, UCFTVNLC7ysej-sD5lkLqNGA, UC5xAkS4828lDivq8cKFGSyw, UC__AsSnEuyVgO9TWvZE_ziA,
  UCfCY70zRsvnnKzQ39mBq0rw, UCr-QcqNToYablI-jU2VPVSw, UCQFvuGmxBmv-c_irVda7mwg, UCLfbmGhvu7xTHXktmMWdfvw, UC69xoWl5-Y3m-oRFTORIbKw,
  UChcgcbX3zMBwd0wTJyy2JlA, UCAjZx0WhDOjIWsoy0owuK4w, UC0-H-XRuSPbDdPRmAnuzxSQ, UC97ysepeThCEbhrWhYrqxAw, UCjeKoCr7YTNn0bmMO1HdyVw,
  UCrd9neCNtPkvQukpNTYrP4Q, UCLi8qtd3QLvXCZLyobiodiw, UCtVnAr55ALHAuI7Yyz4GZWg, UCC1BNMUl5dnju1b9oKpkysg, UC36d9BfqBDm4ToLVvPnI1zg,
  UCsTM1roCxoot1-03EO5zQxg, UCIyMwXronD5pT5cx-G_KSHA
`;

const createChannel = (channel: TChannelResponse): TChannel => {
  const subscriberCount = Number(channel.statistics.subscriberCount);
  const viewCount = Number(channel.statistics.viewCount);
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
      subscriberCount,
      viewCount,
    },
  };
};

const channelExists = (channelResponse: TChannelResponse) => channelsRef.orderByChild('youtube/id').equalTo(channelResponse.id).once('value')
    .then(snapshotExists)
    .catch(() => false);

const addToFirebase = (channelsResponse: TChannelResponse[]) => {
  const promiseAdded = channelsResponse.map((channelResponse, index) => channelExists(channelResponse).then((exists) => {
    if (exists) {
      return;
    }
    channelsRef.push(createChannel(channelResponse));
    console.log(`${channelResponse.snippet.title} was pushed`);
  }));
  return Promise.all(promiseAdded);
};

export const addChannels = () => {
  const channelsResource = new ChannelsResource();
  const addChannelsPromise = channelsResource.get(CHANNEL_IDS)
    .then(res => addToFirebase(res.data.items));
  logFinished(addChannelsPromise, 'addChannels');
};
