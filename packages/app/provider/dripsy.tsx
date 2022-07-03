import { DripsyProvider, makeTheme } from 'dripsy'

const darkColors = {
  $background: '#000',
  $text: '#fff',
}
const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  colors: {
    $background: '#000',
    $text: '#fff'
  },
  text: {
    p: {
      fontSize: 20,
    },
    
  },
})

export function Dripsy({ children }: { children: React.ReactNode }) {
  return (
    <DripsyProvider
      theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr
    >
      {children}
    </DripsyProvider>
  )
}
