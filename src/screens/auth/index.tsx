import { maybeCompleteAuthSession } from 'expo-web-browser'
import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { LoginButton } from '@molecules'
import { Text, View } from '@styled'

export default function AuthScreen() {
  maybeCompleteAuthSession()

  const insets = useSafeArea()

  return (
    <View
      sx={{
        backgroundColor: 'black',
        flex: 1,
        pt: insets.top,
        px: 4,
        justifyContent: 'space-around',
        alignItems: 'stretch',
      }}>
      <View sx={{ backgroundColor: 'white', borderRadius: 8, width: 100, height: 100 }} />
      <View style={{ justifyContent: 'center' }}>
        <Text sx={{ color: 'white', fontSize: 24, fontWeight: 600, pb: 4 }}>
          Connect and communicate <Text sx={{ fontStyle: 'italic', fontWeight: 800 }}>without</Text> anxiety.
        </Text>
        <LoginButton />
      </View>
      <View sx={{ pb: insets.bottom, justifyContent: 'center' }} />
    </View>
  )
}
