// @flow

import firebase from 'firebase'
import Secrets from 'react-native-config'

const firebaseConfig = {
  apiKey: Secrets.API_KEY,
  authDomain: Secrets.AUTH_DOMAIN,
  databaseURL: Secrets.DATABASE_URL,
  storageBucket: Secrets.STORAGE_BUCKET,
  messagingSenderId: Secrets.MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseConfig)
const log = () => {
  console.log('batch finished')
  console.log(firebase)
}

export const addYoutubers = log
