import React, { useLayoutEffect } from 'react'
import { View, Text, Button } from 'react-native'

export default function DetailsScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false
    })
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
