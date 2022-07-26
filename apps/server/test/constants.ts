import { CreateStravaUser } from "src/features/strava/models.dto"

export const TEST_USER_USERNAME = 'bagelhouseuser'

export const STRAVA_TEST_USER: CreateStravaUser = {
  access_token: process.env.STRAVA_TESTING_USER_ATHLETE_ACCESS_TOKEN,
  refresh_token: process.env.STRAVA_TESTING_USER_ATHLETE_REFRESH_TOKEN,
  id: process.env.STRAVA_TESTING_USER_ATHLETE_ID,
  scope: process.env.STRAVA_APP_SCOPES,
  expires_at: process.env.STRAVA_TESTING_USER_EXPIRES_AT,
  username: "michaelangelo_rivera",
  resource_state: 2,
  firstname: "Michael Angelo",
  lastname: "Rivera",
  bio: "a ninja turtle ",
  city: "ATL",
  state: null,
  country: null,
  sex: "M",
  premium: true,
  summit: true,
  badge_type_id: 1,
  weight: 77.1107,
  profile_medium: "https://dgalywyr863hv.cloudfront.net/pictures/athletes/49028135/13302418/4/medium.jpg",
  profile: "https://dgalywyr863hv.cloudfront.net/pictures/athletes/49028135/13302418/4/large.jpg",
  friend: null,
  follower: null
} as any

