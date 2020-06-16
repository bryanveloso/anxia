import { createReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bigInt from 'big-integer'
import { compose, concat, eqProps, uniqWith } from 'ramda'
import { Tweet } from 'twitter'

import Twitter from '@api'
import { TIMELINE_REQUEST_TYPE } from '@utils/enum'

interface TimelineState {
  data: Tweet[]
  pending: boolean
  error: string | null
}

const initialState: TimelineState = {
  data: [],
  pending: false,
  error: null,
}

export const getTimeline = createAsyncThunk<
  Tweet[], // Return type of the payload creator
  Record<string, string> // First argument to the payload creator (provide void if there isn't one)
>('timeline/get', async (arg) => {
  console.log('arg', arg)
  const response = await Twitter.getTimeline(arg)
  console.log('response', response)
  return response
})

const mergeTimeline = compose<Tweet[], Tweet[], Tweet[], Tweet[]>(
  uniqWith(eqProps('id_str')),
  concat,
)

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimeline.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getTimeline.rejected, (state) => {
      state.pending = false
    })
    builder.addCase(getTimeline.fulfilled, (state, action) => {
      const response = action.payload
      const { type } = action.meta.arg
      if (response.length) {
        switch (type) {
          case TIMELINE_REQUEST_TYPE.TOP:
            if (
              state.data.length &&
              bigInt(response[0].id_str).lesserOrEquals(state.data[0].id_str)
            ) {
              console.log('2')
              state.data = mergeTimeline(response, state.data)
            } else {
              console.log('3')
              state.data = response
            }
            break
          case TIMELINE_REQUEST_TYPE.BOTTOM:
            state.data = state.data.concat(response)
            break
        }
      }
      state.pending = false
    })
  },
})

export default timelineSlice
