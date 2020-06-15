import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Twitter, { Profile } from '../../api/Twitter'

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

interface State {
  profile: Profile
}

const initialState: State = {
  profile: {
    id: '',
    username: '',
  },
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
