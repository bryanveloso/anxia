import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import Twitter from '../../api'

export const getHomeTimeline = createAsyncThunk('timeline/getHomeTimeline', async () => {
  await Twitter.getHomeTimeline()
})

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomeTimeline.pending, (state) => {})
    builder.addCase(getHomeTimeline.rejected, (state) => {})
    builder.addCase(getHomeTimeline.fulfilled, (state, action) => {})
  },
})

export default timelineSlice
