// @flow
import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import {Panel} from './index'
import {channelStoreMock} from '../../../../Tests/mock/'

const wrapper = shallow(<Panel channel={channelStoreMock()} isMargin={false} />)

test('displays data of channel', (t) => {
  t.is(wrapper.length, 1)
  t.is(wrapper.contains(1), true)
  t.is(wrapper.contains('NAME0'), true)
})
