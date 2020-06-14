import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '@store'
import { AccessTokenState, checkToken } from '@store/auth'
import { getAccountInfo } from '@store/user'

import AuthScreen from './screens/auth'
import MentionsScreen from './screens/mentions'
import TimelineScreen from './screens/timeline'

const Drawer = createDrawerNavigator()

export default function Navigation() {
  const hasAccessToken = useSelector((state: RootState) => state.auth.accessToken) === AccessTokenState.Found

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkToken())
  }, [])

  useEffect(() => {
    if (hasAccessToken) {
      dispatch(getAccountInfo())
    }
  }, [hasAccessToken])

  return (
    <NavigationContainer>
      {hasAccessToken ? (
        <Drawer.Navigator initialRouteName="Timeline">
          <Drawer.Screen name="Timeline" component={TimelineScreen} />
          <Drawer.Screen name="Mentions" component={MentionsScreen} />
        </Drawer.Navigator>
      ) : (
        <AuthScreen />
      )}
    </NavigationContainer>
  )
}
