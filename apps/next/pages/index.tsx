import { HomeScreen } from 'app/features/home/screen'

import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthUser, AuthUserContext } from 'next-firebase-auth'

const auth = getAuth()
let uid = ''
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid
    // ...
  } else {
    // User is signed out
    // ...
  }
})
const Home = () => {
  const AuthUser = useAuthUser()

  useEffect(() => {
    async function logToken(user: AuthUserContext) {}

    logToken(AuthUser)
  }, [AuthUser])
  return (
    <>
      <HomeScreen
        isAuthenticated={AuthUser.email ? true : false}
        userEmail={AuthUser.email ? AuthUser.email : ''}
      />
    </>
  )
}

export default Home
