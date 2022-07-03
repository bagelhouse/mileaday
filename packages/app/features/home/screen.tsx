import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import { MotiView } from 'moti'

interface HomePageState {
  isAuthenticated: boolean,
  userEmail: string
}


export function HomeScreen(props: HomePageState) {
  const sx = useSx()

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16 }}
    >
      <H1 sx={{ fontWeight: '800' }}>Mile a Day</H1>
      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center' }}>
          Keep track of your run streak and more.
        </P>
        <P sx={{ textAlign: 'center' }}>
          Coming soon.
        </P>
      </View>
      <Row>
        <View sx={{ alignItems: 'center' }} />
        {props.isAuthenticated ?
          <MotiView from={{
            translateX: -105,
          }}
            animate={{
              translateX: 0,
            }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 1500,
              delay: 100,
            }}>
            <Text
              selectable={false}
              sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
              Nice! You&apos;re on the waiting list.
            </Text>
          </MotiView> :
          <MotiLink
            href="/auth"
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.5 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
          >
            <Text
              selectable={false}
              sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
            >
              Sign up for the wait list!
            </Text>
          </MotiLink>
        }
      </Row>
    </View>
  )
}
