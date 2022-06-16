import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/app/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})
