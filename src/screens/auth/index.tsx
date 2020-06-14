import React from "react";
import { Button, View, Text } from 'react-native'
import { maybeCompleteAuthSession } from "expo-web-browser";

import LoginButton from "../../components/atoms/login-button";

export default function AuthScreen() {
  maybeCompleteAuthSession()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LoginButton />      
    </View>
  )
}

