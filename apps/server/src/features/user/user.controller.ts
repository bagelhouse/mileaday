import { Get, Req, Post, Body, Controller } from '@nestjs/common'
import { Request } from 'express'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { UserService } from './user.service'
import { HttpException } from '@nestjs/common'
import { DecodedTokenResponse } from './context/user.context.types'
import { strictVerifyAllParams } from './user.utils'
import { CreateUser } from './models.dto'
import * as firebase from 'firebase-admin'
import { StravaService } from '../strava/strava.service'
import { CreateStravaUser } from 'src/features/strava/models.dto'
import { StravaUserDoc } from 'src/features/strava/strava.types'
import { UserContext } from './context/user.context'

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly stravaService: StravaService
  ) {}

  @Get('/user/user-record')
  async getUserRecord(
    @Req() request: Request & DecodedTokenResponse
  ): Promise<UserRecord | HttpException> {
    const userObj = request.user
    if (!userObj)
      throw new HttpException({ email: 'not found in request' }, 401)
    return await this.userService.getUserRecordByEmail(userObj.email)
  }

  // @Get('/user/get-user')
  // async

  @Post('/user/create-user')
  async createUser(
    @Body() params: CreateUser,
    @Req() request: Request & DecodedTokenResponse
  ): Promise<firebase.firestore.WriteResult[] | HttpException> {
    const hasRequiredParams = strictVerifyAllParams({
      uid: request.user.uid,
      userName: params.userName,
      usesStrava: params.usesStravaService
        ? params.stravaAthleteId
        : 'not using Strava',
    })
    // ensure that the uid is correctly passed with other params
    if (hasRequiredParams !== true)
      throw new HttpException(
        { [hasRequiredParams.toString()]: 'not found in request' },
        400
      )
    const userContext = new UserContext({
      userDocContext: {
        userName: params.userName,
        uid: request.user.uid,
        displayName: params.displayName,
        photoURL: params.photoURL,
        usesStravaService: params.usesStravaService,
        stravaAthleteId: params.stravaAthleteId
          ? params.stravaAthleteId
          : undefined,
      },
      userNameDocContext: {
        userName: params.userName,
        uid: request.user.uid,
      },
    })
    try {
      return await this.userService.createUser(
        userContext.props.userDocContext,
        userContext.props.userNameDocContext
      )
    } catch (e) {
      return new HttpException(
        { user: 'could not create user', msg: `${e}` },
        400
      )
    }
  }

  @Post('/user/create-strava-user')
  async createStravaUser(
    @Body() params: CreateStravaUser,
    @Req() request: Request & DecodedTokenResponse
  ): Promise<firebase.firestore.WriteResult | HttpException> {
    const stravaUserDoc: StravaUserDoc = {
      ...params,
      uid: request.user.uid,
    }
    try {
      return await this.stravaService.createStravaUser(stravaUserDoc)
    } catch (e) {
      return new HttpException(
        { user: 'could not create user', msg: `${e}` },
        400
      )
    }
  }

  // @Post('/user/sync-user')
  // async syncStravaUser(
  //   @Body() params: SyncStravaUser,
  //   @Req() request: Request & DecodedTokenResponse
  // ): Promise <  firebase.firestore.WriteResult | HttpException > {
  //   if (params.usesStravaService) {
  //     const athleteId = params.id
  //     this.stravaService.init(athleteId)
  //   }
  //   try {
  //     return await this.stravaService.syncAthleteActivities()
  //   }
  //   catch (e) {
  //     return new HttpException({user: 'could not sync user', msg: `${e}`}, 400)
  //   }
  // }
}
