import { StravaService } from "src/features/strava/strava.service"
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import { StravaRefreshTokenResponse, StravaSummaryActivity } from 'src/features/strava/strava.types'
import { UserContext } from 'src/features/user/context/user.context'

describe('StravaService', ()=>{

  describe('getNewAccessToken', () => {
    it('should get new token', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      const userContext = new UserContext()
      await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
      const test = await stravaService.getNewAccessToken(userContext.props.stravaUserContext.refresh_token)
      expect(test).toMatchObject(new StravaRefreshTokenResponse())
      expect(test.refresh_token).toBe(userHarness.stravaTestUser.refresh_token)
    })
  })

  describe('setNewAccessToken', () => {
    it('should set token and return write result', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      const userContext = new UserContext()
      await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
      const newTokens = await stravaService.getNewAccessToken(userContext.props.stravaUserContext.refresh_token)
      const tokens = await stravaService.setNewAccessToken(userContext.props.stravaUserContext, newTokens)
      expect(tokens).toMatchObject(newTokens)
    })
  })
  describe('setNewAccessTokenMaybe', () => {
    it('should set token and return write result', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      const userContext = new UserContext()
      stravaService.athleteId = userHarness.stravaTestUser.id
      userContext.props.stravaUserContext = userHarness.stravaTestUser
      userContext.props.stravaUserContext.expires_at = (1658600000)
      let setNewAccessTokenSpy = jest.spyOn(stravaService, 'setNewAccessToken')
      const dbWrite = await stravaService.setNewAccessTokenMaybe(userContext.props.stravaUserContext)
      expect(setNewAccessTokenSpy).toHaveBeenCalled()
      expect(dbWrite).toBeTruthy()
    })  
  })
  describe('createStravaUser', () => {
    it('should create strava user', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
      await stravaService.createStravaUser(userHarness.stravaTestUser)
      const usernameDoc = await stravaService.getStravaUserByAthleteId(userHarness.stravaTestUser.id)
      expect(usernameDoc).toMatchObject(userHarness.stravaTestUser)
    })
  })
  describe.skip('syncAthleteActivities', () => {
    jest.setTimeout(10000000)
    it('should list all activities', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      const userContext = new UserContext()
      await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
      await stravaService.createStravaUser(userHarness.stravaTestUser)
      await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
      const test = await stravaService.syncAthleteActivities(userContext.props.stravaUserContext)
      expect(test[0].athlete.id).toBe(parseInt(userHarness.stravaTestUser.id))
      expect(test[0].id).toBeTruthy()
    })
  })
  describe.skip('stravaAPI_ListActivitesForPage', () => {
    jest.setTimeout(10000000)
    it('should list activities', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      const userContext = new UserContext()
      await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
      await stravaService.createStravaUser(userHarness.stravaTestUser)
      await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
      const test = await stravaService.stravaAPI_ListActivitesForPage(userContext.props.stravaUserContext, 1, 200)
      expect(test[0].athlete.id).toBe(parseInt(userHarness.stravaTestUser.id))
      expect(test[0].id).toBeTruthy()
    })
  })
  describe('getAthleteActivities', () => {
    jest.setTimeout(10000000)
    it('should list all activities', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
      await stravaService.createStravaUser(userHarness.stravaTestUser)
      const userContext = new UserContext()
      await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
      const test = await stravaService.getAthleteActivities(userHarness.stravaTestUser.id)
    })
  })
  describe('setActivitiesSyncRequest', () => {
    jest.setTimeout(10000000)
    it('should write sync request', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      await userHarness.deleteStravaUserIfExists(userHarness.stravaTestUser.id)
      await stravaService.createStravaUser(userHarness.stravaTestUser)
      const userContext = new UserContext()
      await userContext.initStravaContext(stravaService, userHarness.stravaTestUser.id)
      const test = await stravaService.setActivitiesSyncRequest(userHarness.stravaTestUser)
      expect(test).toBeTruthy()
      console.log(test)
    })
  })
})