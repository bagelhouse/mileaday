import { firebaseAdminApp } from './firebaseAdminEnv'
import './firebaseAuthEnv'
import firebase from 'firebase/compat/app'
import * as admin from 'firebase-admin'
import { UserRecord } from 'firebase-functions/v1/auth'
import { HttpStatus } from '@nestjs/common'
import { FB_COLLECTION_USERS, FB_COLLECTION_USERNAMES } from 'src/features/user/constants'
import { FB_COLLECTION_STRAVA_ATHLETES } from 'src/features/strava/constants'
import { StravaUserDoc } from 'src/features/strava/strava.types'
import { STRAVA_TEST_USER } from '../constants'

type HarnessParams = {
  userEmail: string
  userPassword: string
}

type status = {
  status: number
}

export class FirebaseUserHarness {
  firebaseAdminApp: typeof admin
  firebaseClientApp: typeof firebase
  userEmail: string
  userPassword: string
  userRecord: UserRecord | undefined
  customToken: string | undefined
  userIdToken: string | undefined
  userCredential: firebase.auth.UserCredential | undefined
  stravaTestUser: StravaUserDoc
  constructor(params: HarnessParams) {
    this.firebaseAdminApp = firebaseAdminApp()
    this.firebaseClientApp = firebase
    this.userEmail = params.userEmail
    this.userPassword = params.userPassword
    this.userRecord = undefined
    this.customToken = undefined
    this.userIdToken = undefined
    this.userCredential = undefined
    this.stravaTestUser = {} as StravaUserDoc
  }

  async init(): Promise<status> {
    let firebaseUser 
    try {
      firebaseUser = await this.firebaseAdminApp.auth().getUserByEmail(this.userEmail)
    }
    catch {
      firebaseUser = await this.firebaseAdminApp.auth().createUser({email: this.userEmail, password: this.userPassword})
    }
    if (firebaseUser)
      this.userRecord = firebaseUser
    else
      throw new Error('Failed to create or retrieve firebaseuser')
    this.customToken = await this.firebaseAdminApp.auth().createCustomToken(this.userRecord.uid)
    this.userCredential = await this.firebaseClientApp.auth().signInWithCustomToken(this.customToken)
    this.userIdToken = await this.firebaseClientApp.auth().currentUser.getIdToken()
    return {status: HttpStatus.OK}
  }

  async initStravaUser(): Promise<status> {
    const stravaUserDoc = this.firebaseAdminApp.firestore().doc(`${FB_COLLECTION_STRAVA_ATHLETES}/${STRAVA_TEST_USER.id}`)
    const result = (await stravaUserDoc.get()).data() as unknown as StravaUserDoc
    this.stravaTestUser = {...STRAVA_TEST_USER, ...result}
    this.stravaTestUser.uid = this.getUserRecord().uid
    return {status: HttpStatus.OK}
  }

  async deleteUserIfExists(userName: string): Promise<admin.firestore.WriteResult[]> {
    const userDoc = this.firebaseAdminApp.firestore().doc(`${FB_COLLECTION_USERS}/${this.getUserRecord().uid}`)
    const usernameDoc = this.firebaseAdminApp.firestore().doc(`${FB_COLLECTION_USERNAMES}/${userName}`)
    return [await userDoc.delete(), await usernameDoc.delete()]
  }
  async deleteStravaUserIfExists(athleteId: string): Promise<admin.firestore.WriteResult> {
    const stravaUserDoc = this.firebaseAdminApp.firestore().doc(`${FB_COLLECTION_STRAVA_ATHLETES}/${athleteId}`)
    return await stravaUserDoc.delete()
  }

  getUserCredential(): firebase.auth.UserCredential {
    return this.userCredential
  }
  getCustomToken(): string {
    return this.customToken
  }
  getUserIdToken(): string {
    return this.userIdToken
  }
  getUserRecord(): UserRecord {
    return this.userRecord
  }
}