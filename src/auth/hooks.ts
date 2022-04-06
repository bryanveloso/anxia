import {
  exchangeCodeAsync,
  makeRedirectUri,
  revokeAsync,
  TokenResponse,
  useAuthRequest,
} from 'expo-auth-session'
import { useEffect, useState } from 'react'

import { CLIENT_ID } from './constants'

const clientId = CLIENT_ID
const discovery = {
  authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
  tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
  revocationEndpoint: 'https://twitter.com/i/oauth2/revoke',
}
const scopes = ['tweet.read']

export const useLogin = () => {
  const [tokens, setTokens] = useState<TokenResponse | null>(null)
  const redirectUri = makeRedirectUri({ useProxy: true })
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret: 'z6EeEp6858TSq11BazGSYWVNBo7ONK-Rd6qaBBZtrI_FLFAB9P',
      scopes,
      redirectUri,
      usePKCE: true,
    },
    discovery,
  )

  const getTokens = () => {
    if (discovery && response?.type === 'success') {
      const { code } = response.params
      exchangeCodeAsync(
        {
          clientId,
          clientSecret: 'z6EeEp6858TSq11BazGSYWVNBo7ONK-Rd6qaBBZtrI_FLFAB9P',
          scopes,
          redirectUri,
          code,
          extraParams: { code_verifier: request?.codeVerifier || '' },
        },
        discovery,
      )
        .then((res) => {
          console.log(res)
          setTokens(res)
        })
        .catch(console.error)
    }
  }

  useEffect(getTokens, [response, discovery, redirectUri, setTokens])

  return {
    login: () => {
      promptAsync({ useProxy: true })
    },
    logout: () => {
      if (tokens && discovery) {
        revokeAsync(
          {
            clientId,
            token: tokens.accessToken,
          },
          discovery,
        ).then(() => setTokens(null))
      }
    },
    loginReady: !!request,
    loggedIn: !!tokens,
    tokens,
  }
}
