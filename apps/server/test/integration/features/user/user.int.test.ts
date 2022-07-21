import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import { CreateStravaUser, CreateUser } from 'src/features/user/models.dto'
import { FB_COLLECTION_STRAVA_ATHLETES, FB_COLLECTION_USERS } from 'src/features/user/constants'
import firebase from 'firebase-admin'
import axios from 'axios'

describe('User - /create-user', function() {
  jest.setTimeout(100000)
  it('should create user', async function () {
    const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
    await userHarness.init()
    await userHarness.deleteUserIfExists('bagelhouseuser')
    const userParams: CreateUser = {
      userName: 'bagelhouseuser',
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
    const athleteId = '1001000'
    await userHarness.init()
    await userHarness.deleteStravaUserIfExists(athleteId)
    const stravaUserPrams: CreateStravaUser = {
      athleteId: athleteId,
      scope: 'readall',
      accessToken: '09830298349834',
      refreshToken: 'kjlkjsdflkjsdf',
      expiresAt: new Date(Date.now()).toISOString()
    }
    const dbWrite = await axios.post('http://localhost:3999/bagelhouse-mileaday-staging/us-central1/api/user/create-strava-user', stravaUserPrams, {
      headers: {
        'Authorization' : `Bearer ${userHarness.getUserIdToken()}`,
        'Content-Type': 'application/json',
      }
    })
    expect(dbWrite.data).toMatchObject({"_writeTime": {}})
    const test = await firebase.firestore().collection(`${FB_COLLECTION_STRAVA_ATHLETES}`).where("uid", "==", userHarness.getUserRecord().uid).get() 
    expect(test.docs[0].data()).toMatchObject(stravaUserPrams)
  })
})