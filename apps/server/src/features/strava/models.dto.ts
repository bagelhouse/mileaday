import { StravaAthleteResponse } from 'src/features/strava/strava.types'
import { IsNotEmpty } from 'class-validator'

export class CreateStravaUser extends StravaAthleteResponse {
  @IsNotEmpty()
  id: string 
  @IsNotEmpty()
  scope: string
  @IsNotEmpty()
  access_token: string
  @IsNotEmpty()
  refresh_token: string
  @IsNotEmpty()
  expires_at: string
 }

