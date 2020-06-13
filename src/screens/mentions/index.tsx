import * as React from 'react'
import { Button, View, Text } from 'react-native'

export default function MentionsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mentions Screen</Text>
      <Button title="Go home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  )
}
