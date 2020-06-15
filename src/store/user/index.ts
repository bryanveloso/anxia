import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FullUser } from 'twitter-d'

import Twitter from '../../api'

export const getAccountInfo = createAsyncThunk('user/getAccountInfo', async () => {
  return Twitter.getAccountInfo()
})

export const getProfile = createAsyncThunk('user/getProfile', async (username: string) => {
  return Twitter.getUserInfo(username)
})

export enum LoadingState {
  Unknown,
  Fetching,
  Found,
}

const initialState = {
  profile: {} as FullUser,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {})
    builder.addCase(getProfile.rejected, (state) => {})
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  },
})

export default userSlice
