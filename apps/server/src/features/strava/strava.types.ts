import { AthleteResponse, RefreshTokenResponse } from "strava-v3";
import { CreateStravaUser } from "./models.dto";

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