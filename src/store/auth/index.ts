import { createSlice, Dispatch, createAsyncThunk } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

import Twitter from '../../api/Twitter'

export enum AccessTokenState {
  Unknown,
  Fetching,
  Found
}

export const checkToken = createAsyncThunk('auth/checkToken', async () => {
  await Twitter.getCredentials()
})

export const login = createAsyncThunk('auth/login', async (dispatch: any) => {
  const accessToken = await Twitter.login()
  if (!accessToken) throw new Error()
    
  SecureStore.setItemAsync('accessToken', accessToken.token)
  SecureStore.setItemAsync('accessTokenSecret', accessToken.tokenSecret)
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: AccessTokenState.Unknown
  },
  reducers: {
    logout(state, action) {
      SecureStore.deleteItemAsync('accessToken')
      SecureStore.deleteItemAsync('accessTokenSecret')
      state.accessToken = AccessTokenState.Unknown
    }
  },
  extraReducers: builder => {
    builder.addCase(checkToken.pending, state => {
      state.accessToken = AccessTokenState.Fetching
    })
    builder.addCase(checkToken.rejected, state => {
      state.accessToken = AccessTokenState.Unknown
    })
    builder.addCase(checkToken.fulfilled, state => {
      state.accessToken = AccessTokenState.Found
    })

    builder.addCase(login.pending, state => {
      state.accessToken = AccessTokenState.Fetching
    })
    builder.addCase(login.rejected, state => {
      state.accessToken = AccessTokenState.Unknown
    })
    builder.addCase(login.fulfilled, state => {
      state.accessToken = AccessTokenState.Found
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice
