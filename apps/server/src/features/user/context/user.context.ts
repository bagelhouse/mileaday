import * as userTypes from './user.context.types'
import { StravaUserDoc } from 'src/features/strava/strava.types'
import { StravaService } from 'src/features/strava/strava.service'
import { Logger, Injectable } from '@nestjs/common'

export type UserContextParams = {
  authContext?: userTypes.DecodedTokenResponse
  userDocContext?: userTypes.UserDoc
  userNameDocContext?: userTypes.UsernameDoc
  stravaUserContext?: StravaUserDoc
}

@Injectable()
export class UserContext {
  props: UserContextParams
  private readonly logger = new Logger(UserContext.name)
  constructor(params?: UserContextParams) {
    this.props = {}
    if (params) {
      this.props.userDocContext = params?.userDocContext
      this.props.userNameDocContext = params?.userNameDocContext 
      this.props.authContext = params?.authContext 
      this.props.stravaUserContext = params?.stravaUserContext
    }
  }

  async initStravaContext(stravaService: StravaService, athleteId: string) {
    const stravaUserContext = await stravaService.getStravaUserByAthleteId(athleteId)
    const newAccessTokenSet = await stravaService.setNewAccessTokenMaybe(stravaUserContext)
    if (newAccessTokenSet) {
      this.props.stravaUserContext = { ...stravaUserContext, ...newAccessTokenSet }
      const msg = `New Access token set for user ${this.props.stravaUserContext.id}`
      console.log(msg)
      this.logger.log(msg)
    }
    else this.props.stravaUserContext = stravaUserContext
  }

}