import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { useEffect } from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import '../firebase/firebaseInit.config'
import initAuth from '../firebase/firebaseAuth'
import { useAuthUser, withAuthUser, AuthUserContext } from 'next-firebase-auth'

initAuth()

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const AuthUser = useAuthUser()

  useEffect(() => {
    async function logToken(user: AuthUserContext) {
      console.log(await user.getIdToken())
    }

    logToken(AuthUser)
  }, [AuthUser])

  return (
    <>
      <Head>
        <title>Mile a Day</title>
        <meta name="A running community" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        {/* <Header email={AuthUser.email} signOut={AuthUser.signOut} /> */}
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default withAuthUser()(MyApp as any)
