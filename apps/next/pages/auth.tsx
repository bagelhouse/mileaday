import React from 'react'
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import { Text, View, P, Row } from 'dripsy'
const styles = {
  content: {
    padding: `8px 32px`,
    backgroundColor: '#000',
  },
  textContainer: {
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
}

const Auth = () => (
  <>
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        p: 16,
        bg: `$background`,
      }}
    >
      <Text sx={{ marginBottom: 15 }}>
        <P sx={{ color: 'white' }}>You will be emailed when we are in beta.</P>
      </Text>
      <Row sx={{ bg: `$background` }}>
        <FirebaseAuth />
      </Row>
    </View>
  </>
)

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth)
