
if (!process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY ||
  !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  !process.env.NEXT_PUBLIC_FIREBASE_MSG_SEND_ID ||
  !process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
  !process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID )
  throw new Error('Missing Required Auth Credentials')

export const firebaseAuthConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY ,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SEND_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

export const cookies = [
  process.env.NEXT_PUBLIC_FIREBASE_COOKIES_SECRET_CURRENT,
  process.env.NEXT_PUBLIC_FIREBASE_COOKIES_SECRET_PREVIOUS 
]
