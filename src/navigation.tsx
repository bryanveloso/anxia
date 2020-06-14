import React, { useEffect } from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import AuthScreen from './screens/auth'
import TimelineScreen from './screens/timeline'
import MentionsScreen from './screens/mentions'
import { RootState, useAppDispatch } from './store/index'
import { AccessTokenState, checkToken } from './store/auth'
import { getAccountInfo } from "./store/user";

const Drawer = createDrawerNavigator()

export default function Navigation() {
  const hasAccessToken = useSelector(
    (state: RootState) => state.auth.accessToken
  ) === AccessTokenState.Found
  
  const dispatch = useAppDispatch()
  
  useEffect(() => { dispatch(checkToken())}, [])

  useEffect(() => {
    if (hasAccessToken) {
      dispatch(getAccountInfo())
    }
  }, [hasAccessToken])
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {
          hasAccessToken ?
          (
            <Drawer.Navigator initialRouteName="Timeline">
              <Drawer.Screen name="Timeline" component={TimelineScreen} />
              <Drawer.Screen name="Mentions" component={MentionsScreen} />
            </Drawer.Navigator>
          ) : 
          (
            <AuthScreen />
          )
        }
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
