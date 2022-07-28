import { CreateUser } from '../models.dto'

// BASE USER

export type DecodedTokenResponse = {
  user: {
    iss: string
    aud: string
    auth_time: number
    user_id: string
    sub: string
    iat: number
    exp: number
    email: string
    email_verified: false
    firebase: { identities: { email: [Array] }; sign_in_provider: 'password' }
    uid: string
  }
}

export interface UserDoc extends CreateUser {
  uid: string // PK
  userName: string //FK
  photoURL: string
  displayName: string
  usesStravaService: boolean
  stravaAthleteId?: string
}

export interface UsernameDoc {
  userName: string // PK
  uid: string // FK
}

// STRAVA USER
