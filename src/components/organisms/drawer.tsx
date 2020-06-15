import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store'
import { Text } from '@styled'

export const Drawer: React.FC = (props) => {
  const { profile } = useSelector((state: RootState) => state.user)

  return (
    <DrawerContentScrollView {...props}>
      <Text>{JSON.stringify(profile)}</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}
