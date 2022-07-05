type FirebaseAdminEnv = {
  type: string,
  projectId: string,
  privateKeyId: string,
  privateKey: string,
  clientEmail: string,
  clientId: string,
  authUri: string,
  tokenUri: string,
  authProviderX509CertUrl: string,
  clientC509CertUrl: string
}

type FireBaseAppEnv = {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string
}

export const getFirebaseAdminEnv = (processEnv: any) => {
  const env = {
    type: processEnv.MAD_FB_ADMIN_TYPE,
    projectId: processEnv.MAD_FB_ADMIN_TYPE_PROJECT_ID,
    privateKeyId: processEnv.MAD_FB_ADMIN_TYPE_PRIVATE_KEY_ID,
    privateKey: processEnv.MAD_FB_ADMIN_TYPE_PRIVATE_KEY,
    clientEmail: processEnv.MAD_FB_ADMIN_TYPE_CLIENT_EMAIL,
    clientId: processEnv.MAD_FB_ADMIN_TYPE_CLIENT_ID,
    authUri: processEnv.MAD_FB_ADMIN_TYPE_AUTH_URI,
    tokenUri: processEnv.MAD_FB_ADMIN_TYPE_TOKEN_URI,
    authProviderX509CertUrl: processEnv.MAD_FB_ADMIN_TYPE_AUTH_PROVIDER_CERT_URL,
    clientC509CertUrl: processEnv.MAD_FB_ADMIN_TYPE_CLIENT_CERT_URL
  }
  return env as FirebaseAdminEnv
}

export const getFirebaseWebAppEnv = (processEnv: any) => {
  const env = {
    apiKey: processEnv.NEXT_PUBLIC_MAD_FB_WEB_API_KEY,
    authDomain: processEnv.NEXT_PUBLIC_MAD_FB_WEB_AUTH_DOMAIN,
    projectId: processEnv.NEXT_PUBLIC_MAD_FB_WEB_PROJECT_ID,
    storageBucket: processEnv.NEXT_PUBLIC_MAD_FB_WEB_STORAGE_BUCKET,
    messagingSenderId: processEnv.NEXT_PUBLIC_MAD_FB_WEB_MESSAGING_SENDER_ID,
    appId: processEnv.NEXT_PUBLIC_MAD_FB_WEB_APP_ID,
    measurementId: processEnv.NEXT_PUBLIC_MAD_FB_WEB_MEASUREMENT_ID
  }
  return env as FireBaseAppEnv
}
