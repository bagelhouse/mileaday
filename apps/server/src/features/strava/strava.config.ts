export const StravaAppConfig = {
  client_secret: process.env.STRAVA_CLIENT_SECRET,
  client_id: process.env.STRAVA_CLIENT_ID,
  scopes: process.env.STRAVA_APP_SCOPES,
  redirect_uri: process.env.FUNCTIONS_EMULATOR === 'true' ? process.env.STRAVA_REDIRECT_URI_LOCAL : process.env.STRAVA_REDIRECT_URI
}