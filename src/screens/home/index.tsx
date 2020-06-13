import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import MentionsScreen from '../mentions'
import TimelineScreen from '../timeline'

const Drawer = createDrawerNavigator()

export default function HomeScreen({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Timeline">
      <Drawer.Screen name="Timeline" component={TimelineScreen} />
      <Drawer.Screen name="Mentions" component={MentionsScreen} />
    </Drawer.Navigator>
  )
}
