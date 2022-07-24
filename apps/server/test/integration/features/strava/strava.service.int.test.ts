import { StravaService } from "src/features/strava/strava.service"
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'

describe('StravaService - getNewAccessToken', () => {
  it('should get new token', async function () {
    const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
    await userHarness.init()
    await userHarness.initStravaUser()
    const stravaService = new StravaService()
    await stravaService.init(userHarness.stravaTestUser.id)
    const test = await stravaService.getNewAccessToken(stravaService.stravaUserContext.refresh_token)
    console.log(test)

    

  })
})