import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import authSlice from './auth'
import timelineSlice from './timeline'
import userSlice from './user'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    timeline: timelineSlice.reducer,
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
