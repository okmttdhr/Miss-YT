import { AsyncStorage } from 'react-native';
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '4',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: ['login', 'search', 'channels'],
    transforms: [immutablePersistenceTransform],
  },
};

export default REDUX_PERSIST;
