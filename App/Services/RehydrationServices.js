import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

import ReduxPersist from '../Config/ReduxPersist';
import StartupActions from '../Redux/StartupRedux';

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;
  const startup = () => store.dispatch(StartupActions.startup());

  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    const reducerUpdated = localVersion !== reducerVersion;
    if (reducerUpdated) {
      console.tron.display({
        name: 'PURGE',
        value: {
          'Old Version:': localVersion,
          'New Version:': reducerVersion,
        },
        preview: 'Reducer Version Change Detected',
        important: true,
      });
      persistStore(store, config, startup).purge();
      AsyncStorage.setItem('reducerVersion', reducerVersion);
      return;
    }
    console.log('persistStore');
    persistStore(store, config, startup);
  }).catch(() => {
    persistStore(store, config, startup);
    AsyncStorage.setItem('reducerVersion', reducerVersion);
  });
};

export default {updateReducers};
