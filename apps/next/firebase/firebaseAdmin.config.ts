
// if (!process.env.SERVER_FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL ||
//   !process.env.SERVER_FIREBASE_ADMIN_AUTH_URI ||
//   !process.env.SERVER_FIREBASE_ADMIN_CLIENT_EMAIL ||
//   !process.env.SERVER_FIREBASE_ADMIN_CLIENT_ID ||
//   !process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY ||
//   !process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY_ID ||
//   !process.env.SERVER_FIREBASE_ADMIN_PROJECT_ID ||
//   !process.env.SERVER_FIREBASE_ADMIN_TOKEN_URI ||
//   !process.env.SERVER_FIREBASE_ADMIN_TYPE )
//   throw new Error('Missing Required Admin Credentials')

export const firebaseAdminConfig = {
  auth_provider_x509_cert_url: process.env.SERVER_FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL || '',
  auth_uri: process.env.SERVER_FIREBASE_ADMIN_AUTH_URI || '',
  client_email: process.env.SERVER_FIREBASE_ADMIN_CLIENT_EMAIL || '',
  client_id: process.env.SERVER_FIREBASE_ADMIN_CLIENT_ID || '',
  client_x509_cert_url: process.env.SERVER_FIREBASE_ADMIN_CLIENT_CERT_URL || '',
  private_key: process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY || '',
  private_key_id: process.env.SERVER_FIREBASE_ADMIN_PRIVATE_KEY_ID || '',
  project_id: process.env.SERVER_FIREBASE_ADMIN_PROJECT_ID || '',
  token_uri: process.env.SERVER_FIREBASE_ADMIN_TOKEN_URI || '',
  type: process.env.SERVER_FIREBASE_ADMIN_TYPE || '',
  }


