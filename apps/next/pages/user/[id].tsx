import { UserDetailScreen } from 'app/features/user/detail-screen'
import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthUserContext
  } from 'next-firebase-auth'

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
const User = () => {
    const AuthUser = useAuthUser()

    useEffect(() => {
      async function logToken(user: AuthUserContext) {
          console.log(await user.getIdToken())
          console.log('angelo ', uid)
        }
      
       logToken(AuthUser)
    }, [AuthUser])
    return (
        <>
        <UserDetailScreen isAuthenticated = {AuthUser.email ? true : false}
            userEmail = {AuthUser.email ? AuthUser.email : ''}/>
        </>
    )
}

export default User
