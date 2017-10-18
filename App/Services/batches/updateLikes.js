// @flow
import Promise from 'bluebird';
import {merge, concat} from 'lodash';

import type {TLikeWithKey} from '../../types';
import {likesRef, logFinished} from '../index';

const update = (userId: string, key: string, modifier: {rank: number}) => {
  console.log('update');
  likesRef.child(`${userId}/${key}`).transaction((current) => {
    console.log('current', current);
    return merge({}, current, modifier);
  });
};

const sortToUpdate = (userId: string, likes: TLikeWithKey) => {
  console.log('sortToUpdate');
  return Object.keys(likes)
    .sort((keyA, keyB) => {
      if (likes[keyA].count > likes[keyB].count) {
        return -1;
      }
      if (likes[keyA].count < likes[keyB].count) {
        return 1;
      }
      return 0;
    })
    .map((key, index) => {
      return update(userId, key, {rank: index + 1});
    })
    ;
};

const updateLikesByAllUsers = (snapshot: any) => {
  console.log('updateLikesByAllUsers');
  const promises = [];
  const likes: {[key: string]: TLikeWithKey} = snapshot.val();
  Object.keys(likes).forEach((userId) => {
    return concat(promises, sortToUpdate(userId, likes[userId]));
  });
  return Promise.all(promises);
};

export const updateLikes = () => {
  const promise = likesRef.once('value')
    .then((snapshot) => {
      return updateLikesByAllUsers(snapshot);
    })
    ;

  logFinished(promise, 'updateLikes');
};
