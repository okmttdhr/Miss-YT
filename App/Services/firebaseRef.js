// @flow
import * as firebase from 'firebase'
import Secrets from 'react-native-config'
import {TChannel} from '../types/Channel'

const firebaseConfig = {
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: Secrets.FIREBASE_DATABASE_URL,
  storageBucket: Secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Secrets.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseConfig)

export type TChannelsRef = {
  orderByChild: (path: string) => any;
  push: (channel: TChannel) => void;
  update: () => void;
}

export const channelsRef: TChannelsRef = firebase.database().ref('channels')
