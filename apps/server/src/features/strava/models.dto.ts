import { StravaUserDoc } from 'src/features/strava/strava.types'
import { IsNotEmpty } from 'class-validator'

export class CreateStravaUser extends StravaUserDoc {
  @IsNotEmpty()
  id: string 
  @IsNotEmpty()
  uid: string
  @IsNotEmpty()
  scope: string
  @IsNotEmpty()
  access_token: string
  @IsNotEmpty()
  refresh_token: string
  @IsNotEmpty()
  expires_at: string | number
}

export class SyncStravaUser {
  @IsNotEmpty()
  id: string
  @IsNotEmpty()
  usesStravaService: boolean
}