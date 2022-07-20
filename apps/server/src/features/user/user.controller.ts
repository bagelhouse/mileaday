import { Get, Req, Post, Body, Controller } from '@nestjs/common'
import { Request } from 'express'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { UserService } from './user.service'
import { HttpException } from '@nestjs/common'
import { DecodedTokenResponse, StravaUserDoc, UserDoc, UsernameDoc } from './user.types'
import { strictVerifyAllParams } from './user.utils'
import { 
  CreateUser, 
  CreateStravaUser } from './models.dto'
import * as firebase from 'firebase-admin'
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('/user/user-record')
  async getUserRecord(@Req() request: Request & DecodedTokenResponse): Promise<UserRecord | HttpException> {
    const userObj = request.user
    if (!userObj)
      throw new HttpException({email: 'not found in request'}, 401) 
    return await this.userService.getUserByEmail(userObj.email)
  }

  @Post('/user/create-user')
  async createUser(
    @Body() params: CreateUser,
    @Req() request: Request & DecodedTokenResponse
  ): Promise< firebase.firestore.WriteResult[] | HttpException > {
    const userDoc: UserDoc = {
      userName: params.userName,
      uid: request.user.uid,
      displayName: params.displayName,
      photoURL: params.photoURL,
      usesStravaService: params.usesStravaService,
      stravaAthleteId: params.stravaAthleteId ? params.stravaAthleteId : undefined
    }
    const usernameDoc: UsernameDoc = {
      userName: params.userName,
      uid: request.user.uid
    }
    const hasRequiredParams = strictVerifyAllParams({...userDoc, ...usernameDoc})
    // ensure that the uid is correctly passed with other params
    if (hasRequiredParams !== true)
      throw new HttpException({[hasRequiredParams.toString()]: 'not found in request'}, 400)
    try { 
      return await this.userService.createUser(userDoc, usernameDoc)
    }
    catch (e) {
      console.log(e)
      return new HttpException({user: 'could not create user', msg: `${e}`}, 400)
    }
  }

  @Post('/user/create-strava-user')
  async createStravaUser(
    @Body() params: CreateStravaUser,
    @Req() request: Request & DecodedTokenResponse
  ): Promise <  firebase.firestore.WriteResult | HttpException > {
    const stravaUserDoc: StravaUserDoc = {
      athleteId: params.athleteId,
      uid: request.user.uid,
      scope: params.scope,
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
      expiresAt: params.expiresAt
    }
    try { 
      return await this.userService.createStravaUser(stravaUserDoc)
    }
    catch (e) {
      console.log(e)
      return new HttpException({user: 'could not create user', msg: `${e}`}, 400)
    } 
  }
  

  
  

}