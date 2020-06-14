import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import loginSlice from './login'

const store = configureStore({
  reducer: {
    login: loginSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
