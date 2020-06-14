import { maybeCompleteAuthSession } from 'expo-web-browser'
import React from 'react'

import { Strings } from '@constants'
import { LoginButton } from '@molecules'
import { Text, View } from '@styled'

export default function AuthScreen() {
  maybeCompleteAuthSession()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LoginButton />
      <Text>{Strings.DATA_DISCLAIMER}</Text>
    </View>
  )
}
