import * as React from 'react'
import { Button, View, Text } from 'react-native'

import { useAppDispatch } from '@store'
import { logout } from '@store/auth'

export default function TimelineScreen({ navigation }) {
  const dispatch = useAppDispatch()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Timeline Screen</Text>
      <Button onPress={() => navigation.navigate('Detail')} title="Detail Screen" />
      <Button onPress={() => dispatch(logout())} title="Log out" />
    </View>
  )
}
