import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useSelector } from 'react-redux'

import { useAppDispatch, RootState } from '../../store'
import { login, AccessTokenState } from '../../store/login'

export default function LoginButton(props: TouchableOpacityProps) {
  const accessTokenState = useSelector((state: RootState) => state.login.accessToken)
  const dispatch = useAppDispatch()

  return (
    <TouchableOpacity {...props} onPress={() => dispatch(login())}>
      {accessTokenState === AccessTokenState.Fetching ?
        <ActivityIndicator /> : (
          <><Text>Login with Twitter</Text></>
        )
      }
    </TouchableOpacity>
  )
}