import * as dotenv from 'dotenv'
import path from 'path'

if (process.env.FUNCTIONS_EMULATOR === 'true') {
  dotenv.config({path: path.resolve(__dirname, '../../.env.local')})
}

const config = {
  auth_provider_x509_cert_url: process.env.SERVER_FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL,
  auth_uri: process.env.SERVER_FIREBASE_ADMIN_AUTH_URI,
  client_email: process.env.SERVER_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.SERVER_FIREBASE_ADMIN_CLIENT_ID,
  client_x509_cert_url: process.env.SERVER_FIREBASE_ADMIN_CLIENT_CERT_URL,
  private_key: process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY,
  private_key_id: process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  project_id: process.env.SERVER_FIREBASE_ADMIN_PROJECT_ID,
  token_uri: process.env.SERVER_FIREBASE_ADMIN_TOKEN_URI,
  type: process.env.SERVER_FIREBASE_ADMIN_TYPE,
  }

export default config
