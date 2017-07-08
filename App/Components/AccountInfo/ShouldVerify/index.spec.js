// @flow
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { defaultUserMock } from '../../../../Tests/mock/';
import {ShouldVerify} from './index';
import {ButtonDefault} from '../../ButtonDefault';

const sendEmailVerificationMock = () => {
  console.log('sendEmailVerificationMock');
};
const reloadMock = () => {
  console.log('reloadMock');
};

test('could refresh the current user', (t) => {
  const spiedReloadMock = spy(reloadMock);
  const wrapper = shallow(
    <ShouldVerify
      user={defaultUserMock}
      sendEmailVerification={sendEmailVerificationMock}
      reload={spiedReloadMock}
    />,
  );
  wrapper.find(ButtonDefault).first().simulate('press');
  t.is(spiedReloadMock.called, true);
});

test('could send email verification', (t) => {
  const spiedSendEmailVerificationMock = spy(sendEmailVerificationMock);
  const wrapper = shallow(
    <ShouldVerify
      user={defaultUserMock}
      sendEmailVerification={spiedSendEmailVerificationMock}
      reload={reloadMock}
    />,
  );
  wrapper.find(ButtonDefault).last().simulate('press');
  t.is(spiedSendEmailVerificationMock.called, true);
});
