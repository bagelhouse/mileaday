import { Controller, Get, Req } from '@nestjs/common'
import { AppService } from './app.service'
import { Request } from 'express'
import appInfo from '../package.json'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/version')
  getVersion(): string {
    return `mileaday-api version v${appInfo.version}`
  }
}
