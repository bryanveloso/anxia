import * as React from 'react'
import { Button, View, Text } from 'react-native'

export default function TimelineScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Timeline Screen</Text>
      <Button onPress={() => navigation.navigate('Mentions')} title="View mentions" />
    </View>
  )
}
