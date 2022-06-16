import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const budgetApi = createApi({
  reducerPath: 'budgetApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`
    })
  })
})

export const { useGetuserQuery } = budgetApi
