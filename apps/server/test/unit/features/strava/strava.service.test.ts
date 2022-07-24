
import { StravaService } from "src/features/strava/strava.service"

describe('Strava Service - Unit', () => {
  describe('syncAthleteActivities', () => {
    it('should list all activities', async ()=> {
      const stravaService = new StravaService()
      stravaService.stravaAPI_ListActivitesForPage = jest.fn().mockImplementation(() => {Promise.resolve([])})
      .mockResolvedValueOnce([{}, {}, {}])
      .mockResolvedValueOnce([{}, {}, {}, {}])
      .mockResolvedValue([])
      const test = await stravaService.syncAthleteActivities()
    })
  })
})