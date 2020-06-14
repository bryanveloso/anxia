import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Twitter from '../../api/Twitter'

export const getAccountInfo = createAsyncThunk(
  'user/getAccountInfo',
  async () => {
    return Twitter.getAccountInfo()
  },
)

export enum LoadingState {
  Unknown,
  Fetching,
  Found,
}

interface State {
    accountInfo: {
        profilePictureURL: LoadingState | string,
        username?: string
    },
}

const initialState: State = {
  accountInfo: { profilePictureURL: LoadingState.Unknown, username: undefined },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAccountInfo.pending, (state) => {
      state.accountInfo.profilePictureURL = LoadingState.Fetching
    })
    builder.addCase(getAccountInfo.rejected, (state) => {
      state.accountInfo.profilePictureURL = LoadingState.Unknown
    })
    builder.addCase(getAccountInfo.fulfilled, (state, action) => {
      state.accountInfo.profilePictureURL = action.payload.profilePictureURL
      state.accountInfo.username = action.payload.username
    })    
  }
})

export default userSlice
