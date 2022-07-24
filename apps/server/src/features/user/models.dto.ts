
import { IsNotEmpty } from 'class-validator'

export class CreateUser {
  @IsNotEmpty()
  userName: string
  @IsNotEmpty()
  photoURL: string
  @IsNotEmpty()
  displayName: string 
  @IsNotEmpty()
  usesStravaService: boolean
  stravaAthleteId: string
 }
