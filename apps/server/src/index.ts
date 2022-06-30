import {NestFactory} from '@nestjs/core'
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express'
import express from 'express'
import * as functions from 'firebase-functions'
import {AppModule} from './app.module'
const server: express.Express = express()
export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance)
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, adapter, {},
  )
  app.enableCors()
  return app.init()
}
createNestServer(server)
  .then(v => console.log('Nest Ready', process.env))
  .catch(err => console.error('Nest broken', err))
export const api: functions.HttpsFunction = functions.https.onRequest(server)


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBSaDwwJ8HKgDdTSxAFaBVEkGF1qTiwG0Y",
//   authDomain: "bagelhouse-mileaday.firebaseapp.com",
//   projectId: "bagelhouse-mileaday",
//   storageBucket: "bagelhouse-mileaday.appspot.com",
//   messagingSenderId: "401817550036",
//   appId: "1:401817550036:web:d6300478813465fbb30f41",
//   measurementId: "G-R8WWK5H31Q"
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)