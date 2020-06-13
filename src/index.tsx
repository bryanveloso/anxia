import registerRootComponent from 'expo/build/launch/registerRootComponent';
import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import DetailsScreen from './screens/detail'
import HomeScreen from './screens/home'
import MentionsScreen from './screens/mentions'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Timeline' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Tweet Detail' }} />
        <Stack.Screen name="Mentions" component={MentionsScreen} options={{ title: 'Mentions' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

registerRootComponent(App);
