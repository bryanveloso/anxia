import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'error',
  initialState: {},
  reducers: {
    error: (state, { payload }) => payload,
  },
})

export const { error } = errorSlice.actions

export default errorSlice.reducer
