import { NestFactory } from "@nestjs/core"
import { AppModule } from "src/app.module"
import { StravaService } from "../strava/strava.service"
import { StravaSummaryActivity, StravaSyncRequest, StravaUserDoc } from "../strava/strava.types"
import { UserContext } from "../user/context/user.context"
import { UserDoc } from "../user/context/user.context.types"
import { UserService } from "../user/user.service"
import { Logger } from '@nestjs/common'
import { getCircularReplacer } from "src/utils/common"
import _ from 'lodash'
import * as admin from 'firebase-admin'
admin.initializeApp()

export async function syncStrava(syncRequest: StravaSyncRequest): Promise<StravaSummaryActivity[]> {
  const logger = new Logger(syncStrava.name)
  console.log(syncRequest)  
  // try {
    const stravaService = (await NestFactory.create(AppModule)).get(StravaService)
    const userService = (await NestFactory.create(AppModule)).get(UserService)
    const userPromise = userService.getUserByUID(syncRequest.uid) 
    const stravaUserPromise = stravaService.getStravaUserByAthleteId(syncRequest.id) 
    const results = await Promise.all([userPromise, stravaUserPromise])
    let user: UserDoc
    let stravaUser: StravaUserDoc
    results.forEach((result: UserDoc & StravaUserDoc ) => {
      if (result.stravaAthleteId) 
        user = result
      if (result.id)
        stravaUser = result
    })
    console.log(user)
    console.log(stravaUser)    
    const userContext = new UserContext({
      userDocContext: user,
      stravaUserContext: stravaUser
    })
    const stravaUserContext = userContext.props.stravaUserContext
    console.log(stravaUserContext)    
    await userContext.initStravaContext(stravaService, stravaUserContext.id)
    console.log(userContext)
    logger.log(`Gathered user context: ${JSON.stringify(_.cloneDeep(userContext), getCircularReplacer())}`)
    logger.log(`Beginning activity sync execution...`)
    return await stravaService.syncAthleteActivities(stravaUserContext)
  
  // catch (e) {
  //   return e
  // }
}
