import { createSyncJob } from 'src/index'
import { StravaService } from "src/features/strava/strava.service"
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import { StravaRefreshTokenResponse, StravaSummaryActivity, StravaSyncRequest } from 'src/features/strava/strava.types'
import { UserContext } from 'src/features/user/context/user.context'
import { UserService } from "src/features/user/user.service"
import firebase from 'firebase-admin'
import { FB_COLLECTION_STRAVA_SYNC_REQUESTS } from 'src/features/strava/constants'
import { TEST_USER_USERNAME } from '../../../constants'

describe('syncStrava', () => {
  jest.setTimeout(10000000)
  it('should execute sync correctly with correct payload', async function () {
    const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
    await userHarness.init()
    await userHarness.deleteUserIfExists(TEST_USER_USERNAME)
    const userParams = {
      userName: TEST_USER_USERNAME,
      usesStravaService: true,
      photoURL: 'some url',
      stravaAthleteId: '49028134',
      displayName: 'some user',
      uid: userHarness.getUserRecord().uid
    }
    const usernameParams = {
      userName: TEST_USER_USERNAME,
      uid: userHarness.getUserRecord().uid
    }
    await (new UserService).createUser(userParams, usernameParams)
    await userHarness.initStravaUser()
    const stravaService = new StravaService()
    await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
    await stravaService.createStravaUser(userHarness.stravaTestUser)
    const userDoc = await (new UserService()).getUserByUID(userHarness.getUserRecord().uid)
    const userContext = new UserContext({
      userDocContext: userDoc
    })
    await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
    const requestWrite = await stravaService.setActivitiesSyncRequest(userContext.props.stravaUserContext, userContext.props.userDocContext)
    console.log(requestWrite)
    const firestore = firebase.firestore()
    // const stravaSyncRequestDoc = (await firestore.doc(
    //   `${FB_COLLECTION_STRAVA_SYNC_REQUESTS}/${requestWrite.requestId}`
    // ).get()).data() as StravaSyncRequest
    // expect(stravaSyncRequestDoc.id).toBeTruthy()
    // expect(stravaSyncRequestDoc.uid).toBeTruthy()
    // const syncExection = await createSyncJob(stravaSyncRequestDoc, {
    //   params: {requestId: stravaSyncRequestDoc.requestId}
    // })
    // expect(syncExection).toBeTruthy()
    // console.log(syncExection)


  })
})