import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useSelector } from 'react-redux'

import { Strings } from '../../constants'
import { useAppDispatch, RootState } from '../../store'
import { login, AccessTokenState } from '../../store/auth'

export default function LoginButton(props: TouchableOpacityProps) {
  const accessTokenState = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useAppDispatch()

  return (
    // @ts-ignore
    <TouchableOpacity {...props} onPress={() => dispatch(login())}>
      {accessTokenState === AccessTokenState.Fetching ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{Strings.AUTHENTICATION_BUTTON_TEXT}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}
