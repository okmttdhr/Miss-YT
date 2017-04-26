// @flow
import Promise from 'bluebird'
import { assign } from 'lodash'
import { call, put } from 'redux-saga/effects'

import type {TChannel, TChannelStore} from '../types/Channel'
import type {APIResponse} from '../types/APIResponse'
import {channelsRef, likesRef, statusCode, snapshotExists} from '../Services/'
import {channelsActions} from '../Redux/'

const LIMIT = 100

export const getFromFirebase = (startAt: number = 1) => {
  return channelsRef.orderByChild('rank').startAt(startAt).limitToFirst(LIMIT).once('value')
    .then((responce): APIResponse => ({
      status: statusCode.Ok,
      message: '',
      snapshot: responce
    }))
    .catch((): APIResponse => ({
      status: statusCode.InternalError,
      message: ''
    }))
}

const getIsLiked = (userId: string, channelId: string) => {
  return likesRef.child(userId).orderByChild('channelId').equalTo(channelId).once('value')
    .then(snapshotExists)
    .catch(() => false)
}

export const createIsLikedPromises = (snapshot: any) => {
  const isLikedPromises = []
  snapshot.forEach((s) => {
    const channel: TChannel = s.val()
    const isLikedPromise = getIsLiked('userId', s.key)
      .then((isLiked: boolean): TChannelStore => assign({}, channel, {isLiked}))
    isLikedPromises.push(isLikedPromise)
  })
  return isLikedPromises
}

export function *getChannels<T> (action: any): Generator<T, any, any> {
  const START_AT = 1
  const responce: APIResponse = yield call(getFromFirebase, START_AT)

  if (responce.status !== statusCode.Ok) {
    yield put(channelsActions.channelsFailure())
  } else {
    const isLikedPromises = createIsLikedPromises(responce.snapshot)
    const channelsArray: TChannelStore[] = yield call(Promise.all, isLikedPromises)

    const channels: {[key: string]: TChannelStore} = {}
    channelsArray.forEach((channel) => {
      channels[channel.id] = channel
    })
    yield put(channelsActions.channelsSuccess(channels))
  }
}
