// @flow
import Promise from 'bluebird';
import {firebaseApp} from '../firebase/';

import {ChannelsResource, channelsRef, logFinished, snapshotExists} from '../index';
import type {TChannel, TYouTubeChannelResponse} from '../../types';

// add CHANNEL_IDS before running batch
const CHANNEL_IDS = `
  UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA, UCB10yM5qyQpNsMNDQ1VHxKg, UCiOm_FmFK4jxB9VRuFC1pag,
  UCCuizDTLsr-mNm_PEGdChVg, UCRdQOBEzSpAOtZ_yitD7GpA, UCFTVNLC7ysej-sD5lkLqNGA, UC__AsSnEuyVgO9TWvZE_ziA, UCOZ7Kq5_VWBC-TtteAcsRBg,
  UCfCY70zRsvnnKzQ39mBq0rw, UCr-QcqNToYablI-jU2VPVSw, UCQFvuGmxBmv-c_irVda7mwg, UCLfbmGhvu7xTHXktmMWdfvw, UC69xoWl5-Y3m-oRFTORIbKw,
  UCAjZx0WhDOjIWsoy0owuK4w, UC0-H-XRuSPbDdPRmAnuzxSQ, UC97ysepeThCEbhrWhYrqxAw, UCjeKoCr7YTNn0bmMO1HdyVw, UCrd9neCNtPkvQukpNTYrP4Q,
  UCLi8qtd3QLvXCZLyobiodiw, UCtVnAr55ALHAuI7Yyz4GZWg, UCC1BNMUl5dnju1b9oKpkysg, UC5vDiFXIokkQv5xZ91fg-oA, UCgVA07MrT-XCN1t8WMeoFcA
  UCsTM1roCxoot1-03EO5zQxg, UCIyMwXronD5pT5cx-G_KSHA, UCmsA3A5_HKBwI9OktSttTFg, UC8X6Cb-pumA1CNkd3K-lCyA, UCZvbol2FjFRiqc0hwIvpmMQ,
  UCN559lrbV9wt46NwlnPJtPw, UCNIwy_Q7EjUxLlsewfuhjgg, UC7fN-mbfjZVUo755gu-1VuQ, UChhn3SKUYAcajcG9mn7dGqA, UCHPARXha7xQNbfzwzY7NzUw,
  UClW0iupPReSXYDmlvwYfQhg, UC7rqz5As19qYWl2Rc4z-iig, UCMyArXimoNAZjE1P2xLES7A, UCNS93jTKjnzNG7pYUCN5PrQ, UCDRWhpjy_lU_phS3O31AjRQ,
  UCBexcfMCBFzbb02OikUJD6A, UCsVtT0DHmb5GXCZZ7-4PRhg, UCqQ6BtItfK2FI3f4wubJmoA, UC4YaOt1yT-ZeyB0OmxHgolA, UCWdFb_w3JI1BPTiBCXERg2Q,
  UCWuqzdbBcHGAwaXFVHgoZAQ, UCGCxhm6zOhPdMCd08QdJ54Q, UC1ToVxtUzre1zhpTVxsSh5Q, UCvgXTxn3m5aGiEsHAWiD39g, UC_7qMSr1lOHX9j54r59kC9w,
  UCf1_EVN2qSOxiLZskBGsElA, UC27k28viH5djVUTz8qAL9nA, UC5t-gTk8-eH8_hPROEhEZhg, UC7ZvYu-AV-3L2lwwCohOx7w, UCeuXaGY8GnnRniSxsM5PYFg,
  UCdgfRnpHeNFcJ_jtWFs4ydQ, UCQf65OR0_oXBnRnB5nt4gyw, UCid6BHprnJPjeGui-0guDUA, UCBRvYjezogXM1JhKCDyjIrA, UC01H1jIT41AtOOj2T5YG3IA,
  UC_226ocwA3qmdpY2umXy9bA, UCbvZ_xr_mwVbpTe9q59VECQ, UCy0MAPQuPKK7roxcmQK3_Ww, UCOnQM_S6t3o-zZwIPalMUSw, UC8vFWPrx3kRkG0e_L8IBC0A,
  UCRZbhJuHbIP40ptRslHhcig, UCmmQu-bwQOnNjO9NtBtp18Q, UCOPGCKHIS-7LbxlmsGA0e1Q, UCIPGlICtw_QUth0pV0ZLNQA, UCyTjirqRaGuGDKI-ybl2Wvg,
  UC91rH6St1YWol3MoUXGzklg, UCh_44DK-FHn85DEABQXq3TQ, UC1fYrot9lgMstv7vX0BnjnQ, UCYxQ_mIWlLgJCF-5SV7HTpw, UCVKtSLnNtTlPkTweemR94Ug,
  UC7KfprBaSdumuU8YHXdxqPw, UCgpq8b6bCzkSLquNQeSE6QQ, UCCU4NVXCQpu4-yElJISVTVw, UCt8tmsv8kL9Nc1sxvCo9j4Q, UCwsuMvl_PnUPkbGExxOmfbg,
  UCgHEUGUX_tuGvIZU8o7phpw, UCXwNZwMIupSgYOnRvASv3IQ, UCaBg9-k2sviB4s7CpiCbcJg, UCCzhAPXG-BHefCwkjbaaxOA, UCM_xozqxBJiXiq6_Al1t_SQ,
  UCgrpwjTGMLoPvnO1ir7XxHQ, UC0osIW4bVHNEklS4rZ1Dm6A, UClPLW-9Nfbvf76ksj-4c1kQ, UCWKMOaD7odfE9xBH8gSWPoA, UCXMBZYvg3j_jX9Ezk_8UJ1g,
  UC7qpyR8NHY4aEsmj1pDBuOg, UCxlsYyeri8MOpap3w3JbWSQ, UC4R-bdS0we4bz6RfdJX2BXg, UCWC0EZRRyUK-iGZjIe4YLdw, UCJZDDrtE5mU40cUJDT4qkmg,
  UCMFDhI-zeWRzLMCdxFnlw9A, UCZCeo3JXtHqWb08epMtHnsg, UCBjQvPP1-6lCrCChGclvFHQ, UCfy9uLTHtEoukRtKLZmdSvQ, UCxS4vbIvtjHQcEW61J2KQIw,
  UCMsuwHzQPFMDtHaoR7_HDxg, UCo-tNU_6acOZ8gbveoZkqYQ, UCWvHd19P7d1hy0Qx5O-P2Dg, UCyHevJXqTPQw1LbECz2ZkfA, UCElrU4ZeDojoVv8hg3gDQOQ,
  UClkgn4fLALqy1UGsVeCcAFA, UCLef73Thh-b-OW6ubcbN5mw, UCWHUsvJQ0135i8V17M1Z8vQ, UCrxSUBMeILV4YrFvwySPGeA, UCsVtT0DHmb5GXCZZ7-4PRhg,
  UCPlreGCqby4Qg9Vuem5scpw, UCzTmOv-auQ1qEjEys4slwxw, UCmlFEXJy7_aGySlI4P5C-Rg, UCiaSMM07Pd7TXiMBMvdiNGw, UCHOA3DKFtGwAliUm73mW8xQ,
  UCz4jhqrCfthF8NnldZeK_rw, UCx4Uyc-NqIUWgr3dad4Ydnw, UCOPCTkJhBEtwzeb0oIPyTfw, UCw4rgKXKVbmWmuVV8W26pVw, UCYnB7Y3zFSCBeQp-95C0Gxg,
  UCIPKo-3YgwWFFEeagS-j30A, UC4ph00JG5jMvXJvULx6C1ng, UC8WO-lSaGLrzx28V2GFx5aA, UCvS01-HQ57pnIjP4lkp58zw, UCwGgFC-OcIMOPfQL_HjpHDg,
  UCH7vgFKKDZcQkyPayyqMRJA, UCHFvKf-ATrhs3jbjj793N6w, UCK3zyC3FSYQytqhTfOd41xw, UCottDnTSx8cQIelLKDfPANg, UC0kBPTOWxun1jXzpW6VtFSw,
  UCUaBNktaCDpDK-3GgTwUocg, UC3TF4W2toEOaE0eJmEdNENQ, UCNIwy_Q7EjUxLlsewfuhjgg
`;

const createChannel = (channel: TYouTubeChannelResponse): TChannel => {
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

const channelExists = (channelResponse: TYouTubeChannelResponse) =>
  channelsRef.orderByChild('youtube/id').equalTo(channelResponse.id).once('value')
    .then(snapshotExists)
    .catch(() => false);

const addToFirebase = (channelsResponse: TYouTubeChannelResponse[]) => {
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
  const addChannelsPromise = channelsResource.GET(CHANNEL_IDS)
    .then(res => addToFirebase(res.data.items));
  logFinished(addChannelsPromise, 'addChannels');
};
