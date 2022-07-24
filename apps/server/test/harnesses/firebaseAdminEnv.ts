import * as dotenv from 'dotenv'
import path from 'path'
import * as firebase from 'firebase-admin'

dotenv.config({path: path.resolve(__dirname, '../../.env.local')})

export const firebaseAdminApp = () => {
  const adminConfig = {
    authProviderX509CertUrl: process.env.SERVER_FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL,
    authUri: process.env.SERVER_FIREBASE_ADMIN_AUTH_URI,
    clientEmail: process.env.SERVER_FIREBASE_ADMIN_CLIENT_EMAIL,
    clientId: process.env.SERVER_FIREBASE_ADMIN_CLIENT_ID,
    clientC509CertUrl: process.env.SERVER_FIREBASE_ADMIN_CLIENT_CERT_URL,
    privateKey: process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY,
    privateKeyId: process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY_ID,
    projectId: process.env.SERVER_FIREBASE_ADMIN_PROJECT_ID,
    tokenUri: process.env.SERVER_FIREBASE_ADMIN_TOKEN_URI,
    type: process.env.SERVER_FIREBASE_ADMIN_TYPE,
  }
  if (firebase.apps.length === 0)
    firebase.initializeApp({
      credential: firebase.credential.cert(adminConfig)
    })
  return firebase
}

