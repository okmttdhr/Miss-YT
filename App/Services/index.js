// @flow
export * from './firebase';
export * from './resources';
export * from './batches';
export * from './styles';

export const snapshotExists = (snapshot) => {
  if (snapshot.val() === null) {
    return false;
  }
  return true;
};
