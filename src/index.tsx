import { registerRootComponent } from 'expo'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import Navigation from './navigation'
import store from './store'
import theme from './styles/theme'

enableScreens()

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

registerRootComponent(App)
