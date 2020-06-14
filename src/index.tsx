import registerRootComponent from 'expo/build/launch/registerRootComponent'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import store from './store'
import AuthScreen from './screens/auth'
import DetailsScreen from './screens/detail'
import HomeScreen from './screens/home'
import TimelineScreen from './screens/timeline'
import MentionsScreen from './screens/mentions'
import SplashScreen from './screens/splash'

const Stack = createStackNavigator()

function Switcher() {
  const [isLoading, setLoading] = useState(false)
  const [isLoggedIn, setLogin] = useState(true)

  if (isLoading) {
    return <SplashScreen />
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Switcher />
      </NavigationContainer>
    </Provider>
  )
}

registerRootComponent(App);
