import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/app/userSlice'
import { apiSlice } from '../slices/api/apiSlice'
import uiSliceReducer from '../slices/app/uiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    ui: uiSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
