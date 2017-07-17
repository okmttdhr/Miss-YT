import { is } from 'ramda';
import { put, select } from 'redux-saga/effects';
import TemperatureActions from '../Redux/TemperatureRedux';

export const selectTemperature = state => state.temperature.temperature;

export function* startup() {
  if (__DEV__ && console.tron) {
    const subObject = { a: 1, b: [1, 2, 3], c: true };
    subObject.circularDependency = subObject;
  }
  const temp = yield select(selectTemperature);
  if (!is(Number, temp)) {
    yield put(TemperatureActions.temperatureRequest('San Francisco'));
  }
}
