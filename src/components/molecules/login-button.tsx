import React from 'react'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import TwitterLogo from '@assets/twitter-logo'
import { ButtonText } from '@atoms'
import { Strings } from '@constants'
import { useAppDispatch, RootState } from '@store'
import { login, AccessTokenState } from '@store/auth'
import { TouchableOpacity } from '@styled'
import { theme } from '@styles'

export function LoginButton(props: TouchableOpacityProps) {
  const accessTokenState = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useAppDispatch()

  return (
    <TouchableOpacity
      {...props}
      // @ts-ignore
      onPress={() => dispatch(login())}
      sx={{
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'twitterBlue',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        p: 3,
      }}>
      {accessTokenState === AccessTokenState.Fetching ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <>
          <StyledTwitterLogo />
          <ButtonText color={theme.colors.white} text={Strings.AUTHENTICATION_BUTTON_TEXT} />
        </>
      )}
    </TouchableOpacity>
  )
}

const StyledTwitterLogo = styled(TwitterLogo)`
  padding-right: 6px;
`
