import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin'
import { UserDoc, UsernameDoc } from './context/user.context.types'
import { FB_COLLECTION_USERS, FB_COLLECTION_USERNAMES } from './constants'
import _ from 'lodash'

@Injectable()
export class UserService {
  firebaseApp: typeof firebase
  constructor() {
    this.firebaseApp = firebase
  }

  async getUserRecordByEmail(email: string) {
    return await this.firebaseApp.auth().getUserByEmail(email)
  }

  async getUserUIDByUserName(userName: string): Promise<UsernameDoc> {
    const firestore = this.firebaseApp.firestore()
    const usernameDoc = firestore.doc(`${FB_COLLECTION_USERNAMES}/${userName}`)
    return (await usernameDoc.get()).data() as UsernameDoc
  }

  async getUserByUID(uid: string): Promise<UserDoc> {
    const firestore = this.firebaseApp.firestore()
    const userDoc = firestore.doc(`${FB_COLLECTION_USERS}/${uid}`)
    return (await userDoc.get()).data() as UserDoc
  }

  async createUser(
    userContext: UserDoc,
    usernameContext: UsernameDoc
  ): Promise<firebase.firestore.WriteResult[]> {
    if (userContext.usesStravaService && !userContext.stravaAthleteId)
      throw Error(
        'If using the strava service, a strava athlete Id must be provided'
      )
    const userCheck = await this.getUserByUID(userContext.uid)
    const usernameCheck = await this.getUserUIDByUserName(
      usernameContext.userName
    )
    if (!_.isEmpty(userCheck) || !_.isEmpty(usernameCheck))
      throw Error('user already exists')
    const firestore = this.firebaseApp.firestore()
    const batch = firestore.batch()
    batch.set(
      firestore.doc(`${FB_COLLECTION_USERS}/${userContext.uid}`),
      userContext
    )
    batch.set(
      firestore.doc(`${FB_COLLECTION_USERNAMES}/${usernameContext.userName}`),
      usernameContext
    )
    try {
      return await batch.commit()
    } catch (e) {
      throw Error(`Error: creating user - ${JSON.stringify(e)}`)
    }
  }
}
