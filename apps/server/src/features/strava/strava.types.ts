import { AthleteResponse, RefreshTokenResponse } from "strava-v3"
import { CreateStravaUser } from "./models.dto"

export class StravaAthleteResponse implements AthleteResponse {
  id: string
  scope: string
  access_token: string
  refresh_token: string
  expires_at: string
  updated_at: Date 
  created_at: Date
  resource_state?: number
  firstname?: string
  lastname?: string
  profile_medium?: string
  profile?: string
  city?: string
  state?: string
  country?: string
  sex?: string
  premium?: boolean
  summit?: boolean
  username?: string
  bio?: string
  badge_type_id?: number
  weight?: number
  friend?: string 
  follower?: string
}

export class StravaRefreshTokenResponse implements RefreshTokenResponse {
  token_type: string
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
}

export interface StravaUserDoc extends CreateStravaUser  {
  id: string // PK
  uid: string // FK
}

export interface StravaSummaryActivity {
  resource_state?: number
  athlete?: Athlete
  name?: string
  distance?: number
  moving_time?: number
  elapsed_time?: number
  total_elevation_gain?: number
  type?: string
  workout_type?: any
  id?: number
  external_id?: string
  upload_id?: number
  start_date?: string
  start_date_local?: string
  timezone?: string
  utc_offset?: number
  start_latlng?: any
  end_latlng?: any
  location_city?: any
  location_state?: any
  location_country?: string
  achievement_count?: number
  kudos_count?: number
  comment_count?: number
  athlete_count?: number
  photo_count?: number
  map?: StravaMap
  trainer?: boolean
  commute?: boolean
  manual?: boolean
  private?: boolean
  flagged?: boolean
  gear_id?: string
  from_accepted_tag?: boolean
  average_speed?: number
  max_speed?: number
  average_cadence?: number
  average_watts?: number
  weighted_average_watts?: number
  kilojoules?: number
  device_watts?: boolean
  has_heartrate?: boolean
  average_heartrate?: number
  max_heartrate?: number
  max_watts?: number
  pr_count?: number
  total_photo_count?: number
  has_kudoed?: boolean
  suffer_score?: number
}

interface StravaMap {
  id: string
  summary_polyline?: any
  resource_state: number
}

interface Athlete {
  id: number
  resource_state: number
}