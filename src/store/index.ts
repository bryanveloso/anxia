import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import authSlice from './auth'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
