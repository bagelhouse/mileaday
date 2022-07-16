export type DecodedTokenResponse = {
  user: {
    iss: string
    aud: string
    auth_time: number
    user_id: string
    sub: string
    iat: number
    exp: number
    email: string
    email_verified: false
    firebase: { identities: { email: [Array] }, sign_in_provider: 'password' }
    uid: string
  }
}

export type UserDoc = {
 uid: string // PK
  username: string
  photoURL: string
  displayName: string 
}

export type UsernameDoc = {
  username: string // PK
  uid: string
}