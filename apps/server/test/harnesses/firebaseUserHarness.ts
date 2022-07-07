import { firebaseAdminApp } from './firebaseAdminHarness'
import './firebaseAuthHarness'
import firebase from 'firebase/compat/app'
import * as admin from 'firebase-admin'
import { UserRecord } from 'firebase-functions/v1/auth'
import { HttpStatus } from '@nestjs/common'

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
  constructor(params: HarnessParams) {
    this.firebaseAdminApp = firebaseAdminApp()
    this.firebaseClientApp = firebase
    this.userEmail = params.userEmail
    this.userPassword = params.userPassword
    this.userRecord = undefined
    this.customToken = undefined
    this.userIdToken = undefined
    this.userCredential = undefined
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
