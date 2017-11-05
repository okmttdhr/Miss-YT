import { AsyncStorage } from 'react-native';
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.5',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: ['search', 'channel'],
    transforms: [immutablePersistenceTransform],
  },
};

export default REDUX_PERSIST;
