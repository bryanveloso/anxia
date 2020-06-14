import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import Navigation from './navigation'
import store from './store'
import theme from './styles/theme'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </Provider>
  )
}

registerRootComponent(App)
