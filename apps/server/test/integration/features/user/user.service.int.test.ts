import { UserService } from "src/features/user/user.service"
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import firebase from 'firebase-admin'
import { FB_COLLECTION_USERS } from 'src/features/user/constants'
import { TEST_USER_USERNAME } from 'test/constants'

describe('UserService', () => {

  describe('createUser', () => {
    it('should create user', async function () {
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
      const userService = new UserService()
      await userService.createUser(userParams, usernameParams)
      const test = await firebase.firestore().doc((`${FB_COLLECTION_USERS}/${userHarness.getUserRecord().uid}`)).get()
      expect(test.data()).toMatchObject(userParams)
    })
  })

  describe('getUserByUID', () => {
    it('should get uid by user name', async function () {
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
      const userService = new UserService()
      await userService.createUser(userParams, usernameParams)
      const userDoc = await userService.getUserByUID(userHarness.getUserRecord().uid)
      expect(userDoc).toMatchObject(userParams)
    })
  })


  // describe('getStravaUserByAthleteId', () => {
  //   it('should get uid by user name', async function () {
  //     const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
  //     await userHarness.init()
  //     await userHarness.deleteUserIfExists(TEST_USER_USERNAME)
  //     const userParams = {
  //       userName: TEST_USER_USERNAME,
  //       usesStravaService: true,
  //       photoURL: 'some url',
  //       stravaAthleteId: '49028134',
  //       displayName: 'some user',
  //       uid: userHarness.getUserRecord().uid
  //     }
  //     const usernameParams = {
  //       userName: TEST_USER_USERNAME,
  //       uid: userHarness.getUserRecord().uid
  //     }
  //     const userService = new UserService()
  //     await userService.createUser(userParams, usernameParams)
  //     const usernameDoc = await userService.getUserUIDByUserName(TEST_USER_USERNAME)
  //     expect(usernameDoc).toMatchObject(usernameParams)
  //   })
  // })

})