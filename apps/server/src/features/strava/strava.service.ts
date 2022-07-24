import { Injectable } from '@nestjs/common'
import strava from 'strava-v3'
import { StravaAthleteResponse, StravaRefreshTokenResponse, StravaUserDoc } from './strava.types'
import { FB_COLLECTION_STRAVA_ATHLETES } from './constants'
import * as firebase from 'firebase-admin'
import { StravaAppConfig } from './strava.config'
import { shouldRefreshToken } from './strava.utils'
import { objectToString } from 'src/utils/common'

@Injectable()
export class StravaService {
  strava: typeof strava
  athleteId: string
  stravaUserContext: StravaAthleteResponse
  firebaseApp: typeof firebase
  constructor(
  ) {
    this.strava = strava
    this.firebaseApp = firebase
  }

  async init(athleteId: string) {
    this.athleteId = athleteId
    this.stravaUserContext = await this.getStravaUserByAthleteId(athleteId)
    await this.setNewAccessTokenMaybe()
    const config = {
      ...StravaAppConfig, 
      access_token: this.stravaUserContext.access_token,
    }
    this.strava.config(config)
  }

  async getNewAccessToken(refresh_token: string): Promise<StravaRefreshTokenResponse> {
    return await this.strava.oauth.refreshToken(refresh_token)
  }

  async setNewAccessToken(tokenResponse: StravaRefreshTokenResponse): Promise<firebase.firestore.WriteResult> {
    const tokens = objectToString(tokenResponse)
    const firestore = this.firebaseApp.firestore()
    const stravaUserDoc = firestore.doc(`${FB_COLLECTION_STRAVA_ATHLETES}/${this.athleteId}`)
    this.stravaUserContext = {...this.stravaUserContext, ...tokens}
    return await stravaUserDoc.update(tokens)
  }

  async setNewAccessTokenMaybe(): Promise<firebase.firestore.WriteResult | undefined> {
    const context = this.stravaUserContext
    const now = Date.now()
    if (!context.access_token || !context.refresh_token || !context.expires_at)
      throw new Error(`Error: user missing required properties - ${JSON.stringify({
        access_token: !context.access_token,
        refresh_token: !context.refresh_token,
        expires_at: !context.expires_at
      })}`)
    if (shouldRefreshToken(now, context.expires_at)) {
      const newTokens = await this.getNewAccessToken(context.refresh_token)
      return await this.setNewAccessToken(newTokens)
    }
    else return undefined
  }

  async getStravaUserByAthleteId(athleteId: string): Promise<StravaUserDoc> {
    const firestore = this.firebaseApp.firestore()
    const usernameDoc = firestore.doc(`${FB_COLLECTION_STRAVA_ATHLETES}/${athleteId}`)
    return (await usernameDoc.get()).data() as StravaUserDoc
  }

  async createStravaUser(
    stravaUserDocParams: StravaUserDoc
  ): Promise<firebase.firestore.WriteResult> {
    const firestore = this.firebaseApp.firestore()
    const stravaUserDoc = firestore.doc(`${FB_COLLECTION_STRAVA_ATHLETES}/${stravaUserDocParams.id}`)
    try {
      return await stravaUserDoc.create(stravaUserDocParams)
    }
    catch (e) {
      throw new Error(`Error: creating strava user - ${JSON.stringify(e)}`)
    }
  }
}