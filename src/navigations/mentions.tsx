import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Button } from 'react-native'

import { DetailsScreen, MentionsScreen } from '@screens'

const Stack = createStackNavigator()

export default function TimelineNavigation({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mentions"
        component={MentionsScreen}
        options={{
          headerLeft: () => <Button onPress={() => navigation.toggleDrawer()} title="Menu" />,
        }}
      />
      <Stack.Screen name="Detail" component={DetailsScreen} options={{ headerBackTitle: '' }} />
    </Stack.Navigator>
  )
}
