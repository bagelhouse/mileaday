import { Logger, Injectable } from '@nestjs/common'
import strava from 'strava-v3'
import {
  StravaRefreshTokenResponse,
  StravaSummaryActivity,
  StravaSyncRequest,
  StravaUserDoc,
} from 'src/features/strava/strava.types'
import {
  FB_COLLECTION_STRAVA_ATHLETES,
  FB_COLLECTION_STRAVA_ACTIVITIES,
  FB_COLLECTION_STRAVA_SYNC_REQUESTS,
} from './constants'
import * as firebase from 'firebase-admin'
import { StravaAppConfig } from './strava.config'
import { shouldRefreshToken } from './strava.utils'
import { objectToString } from 'src/utils/common'
import _ from 'lodash'
import { v4 as uuid } from 'uuid'

@Injectable()
export class StravaService {
  strava: typeof strava
  athleteId: string
  athleteActivities: StravaSummaryActivity[]
  firebaseApp: typeof firebase
  private readonly logger = new Logger(StravaService.name)
  constructor() {
    this.strava = strava
    this.strava.config(StravaAppConfig)
    this.firebaseApp = firebase
  }

  async getNewAccessToken(
    refresh_token: string
  ): Promise<StravaRefreshTokenResponse> {
    return await this.strava.oauth.refreshToken(refresh_token)
  }

  async setNewAccessToken(
    stravaUserContext: StravaUserDoc,
    tokenResponse: StravaRefreshTokenResponse
  ): Promise<StravaRefreshTokenResponse> {
    const tokens = objectToString(tokenResponse)
    const firestore = this.firebaseApp.firestore()
    const stravaUserDoc = firestore.doc(
      `${FB_COLLECTION_STRAVA_ATHLETES}/${stravaUserContext.id}`
    )
    await stravaUserDoc.update(tokens)
    return tokens
  }

  async setNewAccessTokenMaybe(
    stravaUserContext: StravaUserDoc
  ): Promise<StravaRefreshTokenResponse | undefined> {
    const now = Date.now()
    if (
      !stravaUserContext.access_token ||
      !stravaUserContext.refresh_token ||
      !stravaUserContext.expires_at
    )
      throw new Error(
        `Error: user missing required properties - ${JSON.stringify({
          access_token: !stravaUserContext.access_token,
          refresh_token: !stravaUserContext.refresh_token,
          expires_at: !stravaUserContext.expires_at,
        })}`
      )
    if (shouldRefreshToken(now, stravaUserContext.expires_at)) {
      const newTokens = await this.getNewAccessToken(
        stravaUserContext.refresh_token
      )
      return await this.setNewAccessToken(stravaUserContext, newTokens)
    } else return undefined
  }

  async getStravaUserByAthleteId(athleteId: string): Promise<StravaUserDoc> {
    const firestore = this.firebaseApp.firestore()
    const usernameDoc = firestore.doc(
      `${FB_COLLECTION_STRAVA_ATHLETES}/${athleteId}`
    )
    return (await usernameDoc.get()).data() as StravaUserDoc
  }

  async createStravaUser(
    stravaUserContext: StravaUserDoc
  ): Promise<firebase.firestore.WriteResult> {
    const firestore = this.firebaseApp.firestore()
    const stravaUserDoc = firestore.doc(
      `${FB_COLLECTION_STRAVA_ATHLETES}/${stravaUserContext.id}`
    )
    try {
      return await stravaUserDoc.create(stravaUserContext)
    } catch (e) {
      throw new Error(`Error: creating strava user - ${JSON.stringify(e)}`)
    }
  }

  async setActivitiesSyncRequest(
    stravaUserContext: StravaUserDoc
  ): Promise<firebase.firestore.WriteResult> {
    const requestId = uuid()
    const firestore = this.firebaseApp.firestore()
    const stravaSyncRequestDoc = firestore.doc(
      `${FB_COLLECTION_STRAVA_SYNC_REQUESTS}/${requestId}`
    )
    const request: StravaSyncRequest = {
      requestId: requestId,
      id: stravaUserContext.id,
      requestDate: Date.now(),
    }
    return await stravaSyncRequestDoc.create(request)
  }

  async syncAthleteActivities(
    stravaUserContext: StravaUserDoc
  ): Promise<StravaSummaryActivity[]> {
    let finalActivityList: StravaSummaryActivity[] = []
    let pageNum = 1
    const per_page = 200
    let activities = await this.stravaAPI_ListActivitesForPage(
      stravaUserContext,
      pageNum,
      per_page
    )
    if (activities.length === 0) return []
    await this.batchWriteAthleteActivities(stravaUserContext, activities)
    while (activities.length > 0 || !_.isEmpty(activities)) {
      activities = await this.stravaAPI_ListActivitesForPage(
        stravaUserContext,
        pageNum++,
        per_page
      )
      await this.batchWriteAthleteActivities(stravaUserContext, activities)
      finalActivityList.push(...activities)
    }
    return finalActivityList
  }

  async stravaAPI_ListActivitesForPage(
    stravaUserContext: StravaUserDoc,
    pageNum: number,
    per_page: number
  ): Promise<StravaSummaryActivity[]> {
    return (await this.strava.athlete.listActivities({
      page: pageNum,
      per_page: per_page,
      access_token: stravaUserContext.access_token,
    })) as StravaSummaryActivity[]
  }

  async batchWriteAthleteActivities(
    stravaUserContext: StravaUserDoc,
    activities: StravaSummaryActivity[]
  ): Promise<firebase.firestore.WriteResult[]> {
    const firestore = this.firebaseApp.firestore()
    const batch = firestore.batch()
    activities.map((activity) => {
      const subcollectionDoc = firestore
        .collection(FB_COLLECTION_STRAVA_ATHLETES)
        .doc(stravaUserContext.id)
        .collection(FB_COLLECTION_STRAVA_ACTIVITIES)
        .doc(activity.id.toString())
      batch.set(subcollectionDoc, activity)
    })
    return await batch.commit()
  }

  async getAthleteActivities(
    athleteId: string
  ): Promise<StravaSummaryActivity[]> {
    const firestore = this.firebaseApp.firestore()
    const athleteSubcollection = firestore.collection(
      `${FB_COLLECTION_STRAVA_ATHLETES}/${athleteId}/${FB_COLLECTION_STRAVA_ACTIVITIES}`
    )
    const result = await athleteSubcollection.get()
    return result.docs.map((doc) => {
      return doc.data()
    }) as unknown as StravaSummaryActivity[]
  }
}
