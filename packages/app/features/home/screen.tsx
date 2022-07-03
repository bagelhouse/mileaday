import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import { MotiView } from 'moti'

interface HomePageState {
  isAuthenticated?: boolean,
  userEmail?: string
}


export function HomeScreen(props: HomePageState) {
  const sx = useSx()

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16, bg: `$background` }}
    >
      <H1 sx={{ fontWeight: '800', color: 'white' }} >Mile a Day</H1>
      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center', color: 'white' }}>
          Keep track of your run streak and more.
        </P>
        <P sx={{ textAlign: 'center', color: 'white' }}>
          Coming soon.
        </P>
      </View>

        <View sx={{ alignItems: 'center', color: 'white' }} />
        {props.isAuthenticated ? <>
        <Row>
          <MotiView from={{
            translateY: 10,
          }}
            animate={{
              translateY: -7,
            }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 1200,
              delay: 100,
            }}>
            <Text
              selectable={false}
              sx={{ fontSize: 16, color: 'white', fontWeight: 'bold', marginTop: 10 }}>
              Nice! You&apos;re on the waiting list.
            </Text>
          </MotiView>
          </Row>
          <Row>
          <Text
            selectable={false}
            sx={{ fontSize: 16, color: 'white', fontWeight: 'bold', marginTop: 30 }}>
            The email we have is {props.userEmail}
          </Text>
          </Row>
        </>
          : 
          <Row>
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
              sx={{ fontSize: 16, color: 'white', fontWeight: 'bold', marginTop: 10 }}
            >
              Sign up for the wait list!
            </Text>
          </MotiLink>
        </Row>
        }

    </View>
  )
}
