import { Injectable } from '@nestjs/common'
import strava from 'strava-v3'
import { StravaAthleteResponse, StravaRefreshTokenResponse, StravaUserDoc } from './strava.types'
import { FB_COLLECTION_STRAVA_ATHLETES } from './constants'
import * as firebase from 'firebase-admin'
import { StravaAppConfig } from './strava.config'

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
    const config = {
      ...StravaAppConfig, 
      access_token: this.stravaUserContext.access_token,
    }
    this.strava.config(config)
  }

  async getNewAccessToken(refresh_token: string): Promise<StravaRefreshTokenResponse> {
    return await this.strava.oauth.refreshToken(refresh_token)
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
      throw Error(`Error: creating strava user - ${JSON.stringify(e)}`)
    }
  }
}