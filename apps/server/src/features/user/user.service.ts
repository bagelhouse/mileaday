import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

import * as firebase from 'firebase-admin'
import { UserDoc, UsernameDoc } from './user.types'
import { FB_COLLECTION_USERS, FB_COLLECTION_USERNAMES } from './constants';

@Injectable()

export class UserService {
  firebaseApp: typeof firebase
  constructor(
    
  ) {
    this.firebaseApp = firebase
  }

  async getUserByEmail(email: string) {
    const user = await this.firebaseApp.auth().getUserByEmail(email)
    return user
  }

  async createUser(
    userDocParams: UserDoc, 
    usernameDocParams: UsernameDoc
  ): Promise<firebase.firestore.WriteResult[]> {
    const firestore = this.firebaseApp.firestore()
    const userDoc = firestore.doc(`${FB_COLLECTION_USERS}/${userDocParams.uid}`)
    const usernameDoc = firestore.doc(`${FB_COLLECTION_USERNAMES}/${usernameDocParams.username}`)
    const userCheck = await userDoc.get()
    if(userCheck.exists)
      throw Error('Error: user already exists')
    const batch = firestore.batch()
    batch.set(userDoc, userDocParams)
    batch.set(usernameDoc, usernameDocParams)
    try {
      return await batch.commit()
    }
    catch {
      throw Error('Error: creating user')
    }
  }
}