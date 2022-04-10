import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  revokeAsync,
  type TokenResponse,
} from 'expo-auth-session'
import { Platform } from 'expo-modules-core'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'

WebBrowser.maybeCompleteAuthSession()

const clientId = 'RlZaYjdOVW1TYlhKRWsycXBmNEs6MTpjaQ'
const discovery = {
  authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
  tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
  revocationEndpoint: 'https://twitter.com/i/oauth2/revoke',
}
const scopes = ['tweet.read']
const useProxy = Platform.select({ web: false, default: true })

export const useLogin = () => {
  const [tokens, setTokens] = useState<TokenResponse | null>(null)
  const redirectUri = makeRedirectUri({ useProxy })
  const [request, response, promptAsync] = useAuthRequest(
    { clientId, scopes, redirectUri, usePKCE: true },
    discovery,
  )

  const getTokens = () => {
    if (discovery && response?.type === 'success') {
      const { code } = response.params
      exchangeCodeAsync(
        {
          clientId,
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
