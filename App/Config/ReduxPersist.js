import { AsyncStorage } from 'react-native';
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: ['login', 'search', 'channels', 'user'],
    transforms: [immutablePersistenceTransform],
  },
};

export default REDUX_PERSIST;
