import * as React from 'react'
import { Button, View, Text } from 'react-native'

export default function MentionsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mentions Screen</Text>
      <Button onPress={() => navigation.navigate('Detail')} title="Detail Screen" />
    </View>
  )
}
