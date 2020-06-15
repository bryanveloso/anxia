import { createSlice, Dispatch, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

import Twitter from '../../api/Twitter'

export enum AccessTokenState {
  Unknown,
  Fetching,
  Found,
}

export const checkToken = createAsyncThunk('auth/checkToken', async () => {
  await Twitter.getCredentials()
})

export const login = createAsyncThunk('auth/login', async (dispatch: any) => {
  const accessToken = await Twitter.login()
  if (!accessToken) throw new Error()

  SecureStore.setItemAsync('accessToken', accessToken.token)
  SecureStore.setItemAsync('accessTokenSecret', accessToken.tokenSecret)
  SecureStore.setItemAsync('id', accessToken.id)
  SecureStore.setItemAsync('username', accessToken.username)
  return accessToken
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: AccessTokenState.Unknown,
    id: '',
    username: '',
  },
  reducers: {
    logout(state, action: PayloadAction<string | undefined>) {
      SecureStore.deleteItemAsync('accessToken')
      SecureStore.deleteItemAsync('accessTokenSecret')
      SecureStore.deleteItemAsync('id')
      SecureStore.deleteItemAsync('username')
      state.accessToken = AccessTokenState.Unknown
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkToken.pending, (state) => {
      state.accessToken = AccessTokenState.Fetching
    })
    builder.addCase(checkToken.rejected, (state) => {
      state.accessToken = AccessTokenState.Unknown
    })
    builder.addCase(checkToken.fulfilled, (state) => {
      state.accessToken = AccessTokenState.Found
    })

    builder.addCase(login.pending, (state) => {
      state.accessToken = AccessTokenState.Fetching
    })
    builder.addCase(login.rejected, (state) => {
      state.accessToken = AccessTokenState.Unknown
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = AccessTokenState.Found
      state.id = action.payload.id
      state.username = action.payload.username
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice
