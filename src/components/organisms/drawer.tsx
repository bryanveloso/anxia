import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import { DrawerProfile } from '@molecules'
import { useAppDispatch, RootState } from '@store'
import { logout } from '@store/auth'
import { Button, View } from '@styled'

export const Drawer = (props: any) => {
  const dispatch = useAppDispatch()
  const insets = useSafeArea()
  const profile = useSelector((state: RootState) => state.user.profile)

  return (
    <>
      <DrawerProfile profile={profile} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View sx={{ pb: insets.bottom }}>
        <Button onPress={() => dispatch(logout())} title="Log Out" />
      </View>
    </>
  )
}
