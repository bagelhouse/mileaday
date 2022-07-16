import { Get, Req, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common'
import { Request } from 'express'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { UserService } from './user.service'
import { HttpException, HttpCode } from '@nestjs/common'
import { DecodedTokenResponse, UserDoc, UsernameDoc } from './user.types'
import { strictVerifyAllParams } from './user.utils'
import { CreateUser } from './models.dto'

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('/user/user-record')
  async getUserRecord(@Req() request: Request & DecodedTokenResponse): Promise<UserRecord | HttpException> {
    const userEmail = request.user.email
    if (!userEmail)
      throw new HttpException({email: 'not found in request'}, 401) 
    return await this.userService.getUserByEmail(userEmail)
  }

  @Post('/user/create-user')
  async createUser(
    @Body() params: CreateUser,
    @Req() request: Request & DecodedTokenResponse
  ): Promise< any > {
    const userDoc: UserDoc = {
      username: params.userName,
      uid: request.user.uid,
      displayName: params.displayName,
      photoURL: params.photoURL
    }
    const usernameDoc: UsernameDoc = {
      username: params.userName,
      uid: request.user.uid
    }
    const hasRequiredParams = strictVerifyAllParams({...userDoc, ...usernameDoc})
    // ensure that the uid is correctly passed with other params
    if (hasRequiredParams !== true)
      throw new HttpException({[hasRequiredParams.toString()]: 'not found in request'}, 401)
    return await this.userService.createUser(userDoc, usernameDoc)
  }
  

}