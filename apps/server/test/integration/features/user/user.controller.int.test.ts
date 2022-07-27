import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import { CreateUser } from 'src/features/user/models.dto'
import { CreateStravaUser } from 'src/features/strava/models.dto'
import { FB_COLLECTION_USERS } from 'src/features/user/constants'
import { FB_COLLECTION_STRAVA_ATHLETES } from 'src/features/strava/constants'
import firebase from 'firebase-admin'
import axios from 'axios'
import { TEST_USER_USERNAME } from 'test/constants'
import { objectToString } from 'src/utils/common'

describe('User - /create-user', function() {
  jest.setTimeout(100000)
  it('should create user', async function () {
    const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
    await userHarness.init()
    await userHarness.deleteUserIfExists(TEST_USER_USERNAME)
    const userParams: CreateUser = {
      userName: TEST_USER_USERNAME,
      usesStravaService: true,
      photoURL: 'some url',
      stravaAthleteId: '49028134',
      displayName: 'some user'
    }
    const dbWrite = await axios.post('http://localhost:3999/bagelhouse-mileaday-staging/us-central1/api/user/create-user', userParams, {
      headers: {
        'Authorization' : `Bearer ${userHarness.getUserIdToken()}`,
        'Content-Type': 'application/json',
      }
    }) 
    expect(dbWrite.data[0]).toMatchObject({"_writeTime": {}})
    const test = await firebase.firestore().doc((`${FB_COLLECTION_USERS}/${userHarness.getUserRecord().uid}`)).get()
    expect(test.data()).toMatchObject(userParams)
  })
})

describe('User - /create-strava-user', function() {
  it('should create user', async function () {
    const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
    await userHarness.init()
    await userHarness.initStravaUser()
    await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
    const stravaUserParams: CreateStravaUser = userHarness.stravaTestUser
    const dbWrite = await axios.post('http://localhost:3999/bagelhouse-mileaday-staging/us-central1/api/user/create-strava-user', stravaUserParams, {
      headers: {
        'Authorization' : `Bearer ${userHarness.getUserIdToken()}`,
        'Content-Type': 'application/json',
      }
    })
    expect(dbWrite.data).toMatchObject({"_writeTime": {}})
    const test = await firebase.firestore().collection(`${FB_COLLECTION_STRAVA_ATHLETES}`).where("uid", "==", userHarness.getUserRecord().uid).get() 
    expect(test.docs[0].data()).toMatchObject(objectToString(stravaUserParams))
  })
})