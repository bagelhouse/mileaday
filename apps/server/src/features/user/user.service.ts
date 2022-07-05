import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

import * as firebase from 'firebase-admin'

@Injectable()

export class UserService {
  firebaseApp: typeof firebase
  constructor(
    
  ) {
    this.firebaseApp = firebase
  }

  async getFirebaseUser(email: string) {
    const user = await this.firebaseApp.auth().getUserByEmail(email)
    return user
  }

  
 
}