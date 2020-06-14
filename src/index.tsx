import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Navigation from './navigation'

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

registerRootComponent(App);
