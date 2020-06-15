import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AuthScreen } from '@screens'
import { RootState, useAppDispatch } from '@store'
import { AccessTokenState, checkToken } from '@store/auth'
import { getProfile } from '@store/user'

import { Drawer as DrawerContent } from '../components/organisms'
import MentionsNavigation from './mentions'
import TimelineNavigation from './timeline'

const Drawer = createDrawerNavigator()

export default function Navigation() {
  const dispatch = useAppDispatch()
  const hasAccessToken =
    useSelector((state: RootState) => state.auth.accessToken) === AccessTokenState.Found
  const id = useSelector((state: RootState) => state.auth.id)

  useEffect(() => {
    dispatch(checkToken())
  }, [])

  useEffect(() => {
    if (id) dispatch(getProfile(id))
  }, [id])

  return (
    <NavigationContainer>
      {hasAccessToken ? (
        <Drawer.Navigator
          initialRouteName="Timeline"
          hideStatusBar
          drawerContent={(props) => <DrawerContent {...props} />}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            contentContainerStyle: { paddingTop: 0 },
            labelStyle: { fontSize: 16 },
          }}>
          <Drawer.Screen name="Timeline" component={TimelineNavigation} />
          <Drawer.Screen name="Mentions" component={MentionsNavigation} />
        </Drawer.Navigator>
      ) : (
        <AuthScreen />
      )}
    </NavigationContainer>
  )
}
