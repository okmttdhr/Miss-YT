// @flow

import firebase from 'firebase'
import Secrets from 'react-native-config'
import {ChannelsResource} from './index'

const firebaseConfig = {
  apiKey: Secrets.API_KEY,
  authDomain: Secrets.AUTH_DOMAIN,
  databaseURL: Secrets.DATABASE_URL,
  storageBucket: Secrets.STORAGE_BUCKET,
  messagingSenderId: Secrets.MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseConfig)
const log = () => {
  console.log('addYoutubers: batch finished')
  const channelsResource = new ChannelsResource()
  channelsResource.get(channelIDs).then(res => console.log(res))
}

export const addYoutubers = log
