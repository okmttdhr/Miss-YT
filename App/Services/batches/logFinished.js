// @flow

export const logFinished = (promise: Promise<any>, batchName: string) => {
  promise
    .then(() => {
      console.log(`${batchName}: batch finished-----------------------------`);
    })
    .catch((error) => {
      console.log(`${batchName}: batch failed-----------------------------`);
      console.log(error);
    });
};
