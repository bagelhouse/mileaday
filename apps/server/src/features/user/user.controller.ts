import { Get, Req, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common'
import { Request } from 'express'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { UserService } from './user.service'
import { HttpException } from '@nestjs/common'


@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('/user/user-info')
  async getHello(@Req() request: Request): Promise<UserRecord | HttpException> {
    console.log('testing angelo')
    const userEmail = request['user']?.email
    if (!userEmail)
      throw new HttpException({email: 'not found'}, 401) 
    return await this.userService.getFirebaseUser(userEmail)
  }


}