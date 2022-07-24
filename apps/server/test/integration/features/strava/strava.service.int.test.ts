import { StravaService } from "src/features/strava/strava.service"
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'
import { StravaRefreshTokenResponse } from 'src/features/strava/strava.types'

describe('StravaService', ()=>{

  describe('getNewAccessToken', () => {
    it('should get new token', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      await stravaService.init(userHarness.stravaTestUser.id)
      const test = await stravaService.getNewAccessToken(stravaService.stravaUserContext.refresh_token)
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
      await stravaService.init(userHarness.stravaTestUser.id)
      const newTokens = await stravaService.getNewAccessToken(stravaService.stravaUserContext.refresh_token)
      const dbWrite = await stravaService.setNewAccessToken(newTokens)
      expect(dbWrite).toMatchObject({"_writeTime": {}})
    })
  })
  describe('setNewAccessTokenMaybe', () => {
    it('should set token and return write result', async function () {
      const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
      await userHarness.init()
      await userHarness.initStravaUser()
      const stravaService = new StravaService()
      stravaService.athleteId = userHarness.stravaTestUser.id
      stravaService.stravaUserContext = userHarness.stravaTestUser
      stravaService.stravaUserContext.expires_at = (1658600000).toString()
      let setNewAccessTokenSpy = jest.spyOn(stravaService, 'setNewAccessToken')
      const dbWrite = await stravaService.setNewAccessTokenMaybe()
      expect(setNewAccessTokenSpy).toHaveBeenCalled()
      expect(dbWrite).toMatchObject({"_writeTime": {}})
    })
  })
})