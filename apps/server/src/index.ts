import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import express from 'express'
import * as functions from 'firebase-functions'
import { AppModule } from './app.module'
import { FirebaseLogger } from './logger/logger'
import { FB_COLLECTION_STRAVA_SYNC_REQUESTS } from './features/strava/constants'
import { StravaSyncRequest } from './features/strava/strava.types'
import { syncStrava } from './features/workers/sync.app'
const server: express.Express = express()
export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance)
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {}
  )
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.useLogger(app.get(FirebaseLogger))
  return app.init()
}
createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err))

// MILE A DAY API
export const api: functions.HttpsFunction = functions.https.onRequest(server)


// SYNC TRIGGER
export const createSyncJob = functions.firestore
  .document(`${FB_COLLECTION_STRAVA_SYNC_REQUESTS}/{requestId}`)
  .onCreate(async (snap, context) => {
    const request= snap.data() as StravaSyncRequest 
    return await syncStrava(request)
  })
