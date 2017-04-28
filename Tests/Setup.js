import mockery from 'mockery';
import m from 'module';
import { firebaseMock } from './mock/index';

// inject __DEV__ as it is not available when running through the tests
global.__DEV__ = true;

// We enable mockery and leave it on.
mockery.enable();

// Silence the warnings when *real* modules load... this is a change from
// the norm.  We want to opt-in instead of opt-out because not everything
// will be mocked.
mockery.warnOnUnregistered(false);

mockery.registerMock('reactotron-react-native', {});
mockery.registerMock('reactotron-redux', {});
mockery.registerMock('reactotron-apisauce', {});
mockery.registerMock('react-native-animatable', { View: 'Animatable.View' });
mockery.registerMock('react-native-vector-icons/Ionicons', {});
mockery.registerMock('react-native-vector-icons/MaterialIcons', {});
mockery.registerMock('react-native-config', {
  YOUTUBE_API_KEY: 'YOUTUBE_API_KEY',
  FIREBASE_API_KEY: 'FIREBASE_API_KEY',
  FIREBASE_AUTH_DOMAIN: 'FIREBASE_AUTH_DOMAIN',
  FIREBASE_DATABASE_URL: 'FIREBASE_DATABASE_URL',
  FIREBASE_STORAGE_BUCKET: 'FIREBASE_STORAGE_BUCKET',
  FIREBASE_MESSAGING_SENDER_ID: 'FIREBASE_MESSAGING_SENDER_ID',
});
mockery.registerMock('react-native-i18n', {
  t: key => key,
});
mockery.registerMock('firebase', firebaseMock);

// Mock all images for React Native
const originalLoader = m._load;
m._load = (request, parent, isMain) => {
  if (request.match(/.jpeg|.jpg|.png|.gif$/)) {
    return { uri: request };
  }

  return originalLoader(request, parent, isMain);
};
