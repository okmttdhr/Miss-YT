// @flow
import test from 'ava-spec';
import {call} from 'redux-saga/effects';

import {_new, createOnFirebase} from './new';

test.serial.group('Normal', () => {
  const generator = _new('channelId', 1, 'uid');

  test('could create new like', (t) => {
    t.deepEqual(
      generator.next().value,
      call(createOnFirebase, 'channelId', 1, 'uid'),
    );
  });
});
