// @flow
import * as firebase from 'firebase'
import Secrets from 'react-native-config'

const firebaseConfig = {
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: Secrets.FIREBASE_DATABASE_URL,
  storageBucket: Secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Secrets.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseConfig)

export type TChannel = {
  status: string; // active, inactive
  rank: number;
  score: number;
  likeCount: number;
  cseSearchQuery?: string;
  youtube: {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    banner: string;
    subscriberCount: string;
    viewCount: string;
  };
  twitter?: {
    screen_name: string;
    followersCount: number;
  };
}
type TChannelsRef = {
  push: (channel: TChannel) => void;
}

export const channelsRef: TChannelsRef = firebase.database().ref('channels')
