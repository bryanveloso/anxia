import { createSlice, Dispatch, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

import Twitter from '../../api'

export enum AccessTokenState {
  Unknown,
  Fetching,
  Found,
}

export const checkToken = createAsyncThunk('auth/checkToken', async () => {
  return Twitter.getCredentials()
})

export const login = createAsyncThunk('auth/login', async (dispatch: any) => {
  const accessToken = await Twitter.login()
  if (!accessToken) throw new Error()
  console.log('accessToken', accessToken)

  await SecureStore.setItemAsync('accessToken', accessToken.token)
  await SecureStore.setItemAsync('accessTokenSecret', accessToken.tokenSecret)
  await SecureStore.setItemAsync('id', accessToken.id)
  await SecureStore.setItemAsync('username', accessToken.username)
  return accessToken
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await SecureStore.deleteItemAsync('accessToken')
  await SecureStore.deleteItemAsync('accessTokenSecret')
  await SecureStore.deleteItemAsync('id')
  await SecureStore.deleteItemAsync('username')
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: AccessTokenState.Unknown,
    id: '',
    username: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    //...
    builder.addCase(checkToken.pending, (state) => {
      state.accessToken = AccessTokenState.Fetching
    })
    builder.addCase(checkToken.rejected, (state) => {
      state.accessToken = AccessTokenState.Unknown
    })
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.accessToken = AccessTokenState.Found
      state.id = action.payload.id
      state.username = action.payload.username
    })

    //...
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

    //...
    builder.addCase(logout.pending, (state) => {
      state.accessToken = AccessTokenState.Found
    })
    builder.addCase(logout.rejected, (state) => {
      state.accessToken = AccessTokenState.Found
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.accessToken = AccessTokenState.Unknown
    })
  },
})

export default authSlice
