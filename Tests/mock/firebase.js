import Promise from 'bluebird'

const firebaseRefOnceMock = (ref) => {
  let success
  switch (ref) {
    case 'channels':
      success = 'success responce'
      break
    case 'likes':
      success = 'success responce'
      break
  }

  return (type) => {
    let mock
    switch (type) {
      case 'value':
        mock = new Promise((resolve) => {
          resolve(success)
        })
        break
    }
    return mock
  }
}

const firebaseRefMock = (ref) => ({
  child: () => firebaseRefMock(ref),
  equalTo: () => firebaseRefMock(ref),
  startAt: () => firebaseRefMock(ref),
  limitToFirst: () => firebaseRefMock(ref),
  orderByChild: () => firebaseRefMock(ref),
  once: firebaseRefOnceMock(ref)
})

export const firebaseMock = {
  initializeApp: () => {},
  database: () => ({
    ref: firebaseRefMock
  })
}
