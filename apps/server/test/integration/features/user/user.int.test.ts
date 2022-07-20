import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import { CreateUser } from 'src/features/user/models.dto'
import { FB_COLLECTION_USERS } from 'src/features/user/constants'
import firebase from 'firebase-admin'
import axios from 'axios'

describe('User - /create-user', function() {
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