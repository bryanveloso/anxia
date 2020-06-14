import { Linking } from 'expo'
import * as AuthSession from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import {
  openAuthSessionAsync,
  WebBrowserAuthSessionResult as AuthSessionResult,
  WebBrowserRedirectResult as RedirectResult
} from 'expo-web-browser'
import { Base64 } from 'js-base64'

interface AuthToken {
  token: string
  tokenSecret: string
}

interface TwitterOptions {
  twitter: {
    host: string,
    endpoints: {
      authenticate: string
    }
  },
  backend: {
    host: string,
    endpoints: {
      accountInfo: string,
      requestToken: string,
      accessToken: string
    }
  },
}

interface Account {
  profilePictureURL: string
  username: string
}

export class Twitter {
  options: TwitterOptions

  constructor(options?: Partial<TwitterOptions>) {
    this.options = { ...defaultOptions, ...options }
  }

  async login() {
    const redirectURI = AuthSession.makeRedirectUri()
    const { token } = await this.getRequestToken(redirectURI)
    const { host, endpoints: { authenticate } } = this.options.twitter
    const authRes = await openAuthSessionAsync(
      `${host}${authenticate}?oauth_token=${token}`,
      redirectURI,
    )

    if (this.isRedirectResult(authRes)) {
      const verifier = this.getVerifierFromURL(authRes.url)
      if (!verifier) return

      return this.getAccessToken(token, verifier)
    }
  }

  isRedirectResult(
    res: AuthSessionResult
  ): res is RedirectResult {
    return !!(res as RedirectResult).url;
  }

  private async getRequestToken(redirect: string): Promise<AuthToken> {
    const url = `${this.options.backend.host}${this.options.backend.endpoints.requestToken}?callback_url=${redirect}`
    const response = await fetch(url);
    const { oauth_token, oauth_token_secret } = await response.json()
    return { token: oauth_token, tokenSecret: oauth_token_secret }
  }

  private async getAccessToken(requestToken: string, verifier: string): Promise<AuthToken> {
    const response = await fetch(
      `${this.options.backend.host}${this.options.backend.endpoints.accessToken}?oauth_verifier=${verifier}&oauth_token=${requestToken}`
    )

    const { oauth_token, oauth_token_secret } = await response.json()
    return { token: oauth_token, tokenSecret: oauth_token_secret }
  }

  private getVerifierFromURL(url: string) {
    const q = Linking.parse(url).queryParams
    if (q) { return q['oauth_verifier'] }
  }

  async getCredentials(): Promise<AuthToken> {
    const token = await SecureStore.getItemAsync('accessToken')
    const tokenSecret = await SecureStore.getItemAsync('accessTokenSecret')

    if (!token || !tokenSecret) {
      throw new Error("Missing or incomplete credentials.")
    }

    return { token, tokenSecret }
  }

  private async prepareAuth() {
    const credentials = await this.getCredentials()
    const encodedCredentials = Base64.btoa(`${credentials.token}:${credentials.tokenSecret}`)
    return encodedCredentials
  }

  async getAccountInfo(): Promise<Account> {
    const request = new Request(`${this.options.backend.host}${this.options.backend.endpoints.accountInfo}`)
    const header = await this.prepareAuth()
    request.headers.set('Authorization', header)

    const { profilePictureURL, username } = await (await fetch(request)).json()
    return { profilePictureURL, username }
  }
}

const defaultOptions = {
  twitter: {
    host: 'https://api.twitter.com',
    endpoints: {
      authenticate: '/oauth/authenticate',
    },
  },
  backend: {
    host: 'https://proxy.anxia.app',
    endpoints: {
      accountInfo: '/account/settings',
      requestToken: '/auth/request_token',
      accessToken: '/auth/access_token',
    },
  },
}

export default new Twitter()