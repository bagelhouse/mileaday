import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { StravaService } from '../strava/strava.service'

export async function syncStrava(): Promise<any> {
  const app = await NestFactory.create(AppModule)
  return app.get(StravaService)
}
