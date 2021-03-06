import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '../../.env.local')})

export const firebaseAuthConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY ,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SEND_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

if (firebase.apps.length === 0) {
//   firebase.initializeApp({})
//   firebase.functions().useEmulator('localhost', 3999)
//   firebase.firestore().useEmulator('localhost', 8080)
//   firebase.auth().useEmulator('http://localhost:9099')
  firebase.initializeApp({projectId: firebaseAuthConfig.projectId, apiKey: 'test', appId: 'testing'})
  firebase.auth().useEmulator('http://localhost:9099')
}