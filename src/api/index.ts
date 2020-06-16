import axios from 'axios'
import { Linking } from 'expo'
import * as AuthSession from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import {
  openAuthSessionAsync,
  WebBrowserAuthSessionResult as AuthSessionResult,
  WebBrowserRedirectResult as RedirectResult,
} from 'expo-web-browser'
import { Base64 } from 'js-base64'
import { Tweet } from 'twitter'
import { FullUser } from 'twitter-d'

interface AuthToken {
  token: string
  tokenSecret: string
}

interface AccessToken extends AuthToken {
  id: string
  username: string
}

interface TwitterOptions {
  twitter: {
    host: string
    endpoints: {
      authenticate: string
    }
  }
  backend: {
    host: string
    endpoints: {
      accessToken: string
      account: string
      requestToken: string
      timeline: string
      usersShow: string
    }
  }
}

interface Account {
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
    const {
      host,
      endpoints: { authenticate },
    } = this.options.twitter
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

  isRedirectResult(res: AuthSessionResult): res is RedirectResult {
    return !!(res as RedirectResult).url
  }

  private async getRequestToken(redirect: string): Promise<AuthToken> {
    const url = `${this.options.backend.host}${this.options.backend.endpoints.requestToken}`
    const response = await axios.get(url, { params: { callback_url: redirect } })
    const { oauth_token, oauth_token_secret } = response.data
    return { token: oauth_token, tokenSecret: oauth_token_secret }
  }

  private async getAccessToken(requestToken: string, verifier: string): Promise<AccessToken> {
    const url = `${this.options.backend.host}${this.options.backend.endpoints.accessToken}`
    const response = await axios.get(url, {
      params: {
        oauth_verifier: verifier,
        oauth_token: requestToken,
      },
    })

    const { oauth_token, oauth_token_secret, user_id, screen_name } = response.data
    return {
      id: user_id,
      token: oauth_token,
      tokenSecret: oauth_token_secret,
      username: screen_name,
    }
  }

  private getVerifierFromURL(url: string) {
    const q = Linking.parse(url).queryParams
    if (q) {
      return q['oauth_verifier']
    }
  }

  async getCredentials(): Promise<AccessToken> {
    const id = await SecureStore.getItemAsync('id')
    const token = await SecureStore.getItemAsync('accessToken')
    const tokenSecret = await SecureStore.getItemAsync('accessTokenSecret')
    const username = await SecureStore.getItemAsync('username')

    if (!id || !token || !tokenSecret || !username) {
      throw new Error('Missing or incomplete credentials.')
    }

    return { id, token, tokenSecret, username }
  }

  private async prepareAuth() {
    const credentials = await this.getCredentials()
    return Base64.btoa(`${credentials.token}:${credentials.tokenSecret}`)
  }

  async getAccount(): Promise<Account> {
    const header = await this.prepareAuth()
    const url = `${this.options.backend.host}${this.options.backend.endpoints.account}`
    const response = await axios.get(url, { headers: { Authorization: header } })
    const { screen_name } = response.data
    return { username: screen_name }
  }

  async getUserInfo(id: string): Promise<FullUser> {
    const url = `${this.options.backend.host}${this.options.backend.endpoints.usersShow}`
    const response = await axios.get(url, { params: { user_id: id } })
    return response.data
  }

  async getTimeline(params: Record<string, string>): Promise<Tweet[]> {
    const header = await this.prepareAuth()
    const url = `${this.options.backend.host}${this.options.backend.endpoints.timeline}`
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: header,
      },
    })
    return response.data
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
      accessToken: '/auth/access_token',
      requestToken: '/auth/request_token',
      account: '/account',
      timeline: '/timeline',
      usersShow: '/users/show',
    },
  },
}

export default new Twitter()
