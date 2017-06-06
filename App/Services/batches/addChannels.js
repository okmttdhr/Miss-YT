// @flow
import Promise from 'bluebird';
import {firebaseApp} from '../firebase/';

import {ChannelsResource, channelsRef, logFinished, snapshotExists} from '../index';
import type {TChannel} from '../../types/Channel';
import type {TChannelResponse} from '../../types/ChannelResponse';

// add CHANNEL_IDS before dispatching batch
const CHANNEL_IDS = `
  UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA, UCB10yM5qyQpNsMNDQ1VHxKg, UCiOm_FmFK4jxB9VRuFC1pag,
  UCCuizDTLsr-mNm_PEGdChVg, UCRdQOBEzSpAOtZ_yitD7GpA, UCFTVNLC7ysej-sD5lkLqNGA, UC__AsSnEuyVgO9TWvZE_ziA, UCOZ7Kq5_VWBC-TtteAcsRBg,
  UCfCY70zRsvnnKzQ39mBq0rw, UCr-QcqNToYablI-jU2VPVSw, UCQFvuGmxBmv-c_irVda7mwg, UCLfbmGhvu7xTHXktmMWdfvw, UC69xoWl5-Y3m-oRFTORIbKw,
  UCAjZx0WhDOjIWsoy0owuK4w, UC0-H-XRuSPbDdPRmAnuzxSQ, UC97ysepeThCEbhrWhYrqxAw, UCjeKoCr7YTNn0bmMO1HdyVw, UCrd9neCNtPkvQukpNTYrP4Q,
  UCLi8qtd3QLvXCZLyobiodiw, UCtVnAr55ALHAuI7Yyz4GZWg, UCC1BNMUl5dnju1b9oKpkysg, UC5vDiFXIokkQv5xZ91fg-oA, UCgVA07MrT-XCN1t8WMeoFcA
  UCsTM1roCxoot1-03EO5zQxg, UCIyMwXronD5pT5cx-G_KSHA, UCmsA3A5_HKBwI9OktSttTFg, UC8X6Cb-pumA1CNkd3K-lCyA, UCZvbol2FjFRiqc0hwIvpmMQ,
  UCN559lrbV9wt46NwlnPJtPw, UCNIwy_Q7EjUxLlsewfuhjgg, UC7fN-mbfjZVUo755gu-1VuQ, UChhn3SKUYAcajcG9mn7dGqA, UCHPARXha7xQNbfzwzY7NzUw,
  UClW0iupPReSXYDmlvwYfQhg, UC7rqz5As19qYWl2Rc4z-iig, UCMyArXimoNAZjE1P2xLES7A, UCNS93jTKjnzNG7pYUCN5PrQ, UCDRWhpjy_lU_phS3O31AjRQ,
  UCBexcfMCBFzbb02OikUJD6A, UCsVtT0DHmb5GXCZZ7-4PRhg, 
`;

const createChannel = (channel: TChannelResponse): TChannel => {
  const subscriberCount = Number(channel.statistics.subscriberCount);
  const viewCount = Number(channel.statistics.viewCount);

  const image = channel.brandingSettings.image;
  const banner = image.bannerMobileImageUrl || image.bannerImageUrl;

  return {
    id: '',
    createdAt: firebaseApp.database.ServerValue.TIMESTAMP,
    modifiedAt: firebaseApp.database.ServerValue.TIMESTAMP,
    rank: 0,
    score: subscriberCount,
    likeCount: 0,
    status: 'uninitialized',
    youtube: {
      id: channel.id,
      name: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.high.url,
      banner,
      subscriberCount,
      viewCount,
    },
  };
};

const channelExists = (channelResponse: TChannelResponse) =>
  channelsRef.orderByChild('youtube/id').equalTo(channelResponse.id).once('value')
    .then(snapshotExists)
    .catch(() => false);

const addToFirebase = (channelsResponse: TChannelResponse[]) => {
  const promiseAdded = channelsResponse.map((channelResponse) => {
    return channelExists(channelResponse).then((exists) => {
      if (exists) {
        return;
      }
      channelsRef.push(createChannel(channelResponse));
      console.log(`${channelResponse.snippet.title} was pushed`);
    });
  });
  return Promise.all(promiseAdded);
};

export const addChannels = () => {
  const channelsResource = new ChannelsResource();
  const addChannelsPromise = channelsResource.get(CHANNEL_IDS)
    .then(res => addToFirebase(res.data.items));
  logFinished(addChannelsPromise, 'addChannels');
};
