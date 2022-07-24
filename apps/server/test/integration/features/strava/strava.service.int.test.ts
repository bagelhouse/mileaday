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
      expect(test.access_token).not.toBe(userHarness.stravaTestUser.access_token)
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
})