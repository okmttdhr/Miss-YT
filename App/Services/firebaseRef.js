// @flow
import * as firebase from 'firebase';
import Secrets from 'react-native-config';
import type {TChannel} from '../types/Channel';

const firebaseConfig = {
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: Secrets.FIREBASE_DATABASE_URL,
  storageBucket: Secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Secrets.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

export type TChannelsRef = {
  startAt: () => TChannelsRef;
  equalTo: () => TChannelsRef;
  limitToFirst: () => TChannelsRef;
  orderByChild: (path: string) => TChannelsRef;
  push: (channel: TChannel) => void;
  update: () => void;
  once: () => Promise<any>;
}

export const channelsRef: TChannelsRef = firebase.database().ref('channels');
export const likesRef = firebase.database().ref('likes');
