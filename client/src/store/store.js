import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/app/userSlice'
import { budgetApi } from '../slices/api/apiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [budgetApi.reducerPath]: budgetApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(budgetApi.middleware),
  devTools: true
})
