import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin'
import { UserDoc, UsernameDoc } from './user.types'
import { 
  FB_COLLECTION_USERS, 
  FB_COLLECTION_USERNAMES } from './constants'

@Injectable()

export class UserService {
  firebaseApp: typeof firebase
  constructor(
    
  ) {
    this.firebaseApp = firebase
  }

  async getUserRecordByEmail(email: string) {
    return await this.firebaseApp.auth().getUserByEmail(email)
  }

  async getUserUIDByUserName(userName: string): Promise<firebase.firestore.DocumentData> {
    const firestore = this.firebaseApp.firestore()
    const usernameDoc = firestore.doc(`${FB_COLLECTION_USERNAMES}/${userName}`)
    return (await usernameDoc.get()).data()
  }
  
  async getUserByUID(uid: string): Promise<UserDoc> {
    const firestore = this.firebaseApp.firestore()
    const usernameDoc = firestore.doc(`${FB_COLLECTION_USERS}/${uid}`)
    return (await usernameDoc.get()).data() as UserDoc
  }

  async createUser(
    userDocParams: UserDoc, 
    usernameDocParams: UsernameDoc
  ): Promise<firebase.firestore.WriteResult[]> {
    if (userDocParams.usesStravaService && !userDocParams.stravaAthleteId)
      throw Error('Error: If using the strava service, a strava athlete Id must be provided')
    const firestore = this.firebaseApp.firestore()
    const userDoc = firestore.doc(`${FB_COLLECTION_USERS}/${userDocParams.uid}`)
    const usernameDoc = firestore.doc(`${FB_COLLECTION_USERNAMES}/${usernameDocParams.userName}`)
    const userCheck = await userDoc.get()
    const usernameCheck = await usernameDoc.get()
    if(userCheck.exists || usernameCheck.exists) 
      throw Error('Error: user already exists')
    const batch = firestore.batch()
    batch.set(userDoc, userDocParams)
    batch.set(usernameDoc, usernameDocParams)
    try {
      return await batch.commit()
    }
    catch (e) {
      throw Error(`Error: creating user - ${JSON.stringify(e)}`)
    }
  }
}