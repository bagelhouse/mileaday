
import { StravaService } from "src/features/strava/strava.service"
import { FirebaseUserHarness } from 'test/harnesses/firebaseUserHarness'

// describe('Strava Service - Unit', () => {
//   describe('syncAthleteActivities', () => {
//     it('should list all activities', async ()=> {
//       const stravaService = new StravaService()
//       const userHarness = new FirebaseUserHarness({userEmail: 'team@bagelhouse.co', userPassword: 'somepass'})
//       await userHarness.init()
//       await userHarness.initStravaUser()
//       await stravaService.init(userHarness.stravaTestUser.id)
//       stravaService.stravaAPI_ListActivitesForPage = jest.fn().mockImplementation(() => {Promise.resolve([])})
//       .mockResolvedValueOnce([{}, {}, {}])
//       .mockResolvedValueOnce([{}, {}, {}, {}])
//       .mockResolvedValue([])
//       const test = await stravaService.syncAthleteActivities()
//       expect(test.length).toBe(7)
//     })
//   })
// })