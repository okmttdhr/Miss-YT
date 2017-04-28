import test from 'ava';
import { Resource } from './index';
import { API_ENDPOINT_YOUTUBE } from '../../constants/';

test('should set baseURL', async (t) => {
  const resource = new Resource(API_ENDPOINT_YOUTUBE);
  t.is(resource.baseURL, API_ENDPOINT_YOUTUBE);
});
