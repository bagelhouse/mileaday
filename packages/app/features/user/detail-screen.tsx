import { View, Text } from 'dripsy'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

interface UserState {
  isAuthenticated?: boolean,
  userEmail?: string
}

export function UserDetailScreen(props: UserState) {
  const [id] = useParam('id')
  const isAuth = props.isAuthenticated

  return (<>
    { isAuth ? 
      <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}
        >{`User ID: ${id}`}</Text>
        <TextLink href="/">👈 Go Home</TextLink>
      </View>
      :
      <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}
      >{`Oops! You are not signed in.`}</Text>
      <TextLink href="/auth">👈 Sign in</TextLink>
    </View>
    }
  </>
  )
}
