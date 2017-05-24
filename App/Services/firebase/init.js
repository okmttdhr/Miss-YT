// @flow
import * as firebase from 'firebase';
import Secrets from 'react-native-config';

const firebaseConfig = {
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: Secrets.FIREBASE_DATABASE_URL,
  storageBucket: Secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Secrets.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseApp = firebase;
