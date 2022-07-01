// ./initAuth.js
import { init } from 'next-firebase-auth'
import { firebaseAuthConfig, cookies } from './firebaseAuth.config'
import { firebaseAdminConfig } from './firebaseAdmin.config'
import { APP_NAME } from '../constants/appDetails'

const initAuth = () => {
  init({
    debug: true,
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },
    // firebaseAuthEmulatorHost: 'localhost:9099',
    firebaseAdminInitConfig: {
      credential: {
        projectId: firebaseAdminConfig.project_id ,
        clientEmail: firebaseAdminConfig.client_email,
        privateKey: firebaseAdminConfig.private_key ?  firebaseAdminConfig.private_key.replace(/\\n/gm, "\n"): undefined as any,
      },
      databaseURL: '',
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: firebaseAuthConfig,
    cookies: {
      name: APP_NAME, // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      // keys: cookies,
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: false,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth