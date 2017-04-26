import test from 'ava-spec'
import Promise from 'bluebird'
import { call, put } from 'redux-saga/effects'

import {firebaseChannelsResponse, channelsStoreMock, channelsStoreWithKeyMock} from '../../Tests/mock/'
import {channelsActions} from '../Redux/ChannelsRedux'
import {getChannels, getFromFirebase, createIsLikedPromises} from './ChannelsSagas'
import {statusCode} from '../Services/'

test.serial.group('Normal', t => {
  let next
  const generator = getChannels('action')

  test('could make a request to get Channels', t => {
    next = generator.next()
    t.deepEqual(next.value, call(getFromFirebase, 1))
  })

  test('could make a request to know channel is liked by user', t => {
    const responce = firebaseChannelsResponse()
    next = generator.next(responce)
    const isLikedPromises = createIsLikedPromises(responce.snapshot)
    t.deepEqual(next.value, call(Promise.all, isLikedPromises))
  })

  test('could send channels with isLiked to action', t => {
    next = generator.next(channelsStoreMock)
    t.deepEqual(next.value, put(channelsActions.channelsSuccess(channelsStoreWithKeyMock())))
  })
})

test.serial.group('Abnormal', t => {
  let next
  const generator = getChannels('action')

  test('could make a request to get Channels', t => {
    next = generator.next()
    t.deepEqual(next.value, call(getFromFirebase, 1))
  })

  test('could make a request to know channel is liked by user', t => {
    const errorResponce = firebaseChannelsResponse(statusCode.InternalError)
    next = generator.next(errorResponce)
    t.deepEqual(next.value, put(channelsActions.channelsFailure()))
  })
})
