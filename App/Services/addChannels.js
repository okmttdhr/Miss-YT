// @flow
import * as firebase from 'firebase'
import Secrets from 'react-native-config'
import {ChannelsResource} from './index'

const firebaseConfig = {
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: Secrets.FIREBASE_DATABASE_URL,
  storageBucket: Secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Secrets.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseConfig)
const channelsRef = firebase.database().ref('channels')
const channelIDs = 'UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA'

const addToFirebase = (channels) => {
  channels.forEach((item, index) => {
    console.log(`push${index}`)
    channelsRef.push({
      rank: 0,
      likeCount: 0,
      status: 'inactive',
      youtube: {
        id: item.id,
        name: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        banner: item.brandingSettings.image.bannerMobileImageUrl,
        subscriberCount: item.statistics.subscriberCount,
        viewCount: item.statistics.viewCount
      }
    })
  })
}

export const addChannels = () => {
  const _XHR = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpRequest
  XMLHttpRequest = _XHR

  const channelsResource = new ChannelsResource()
  channelsResource.get(channelIDs)
    .then(res => addToFirebase(res.data.items))
    .then(() => console.log('addChannels: batch finished'))
    .catch(() => console.log('addChannels: batch failed'))
}
