import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser } from '../app/userSlice'

export const budgetApi = createApi({
  reducerPath: 'budgetApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setUser({ name: data.name, operations: data.operations, balance: data.balance }))
        } catch (err) {
          console.log('Error fetching user')
        }
      }
    }),
    getOperationsByUser: builder.query({
      query: (id) => `/operation/user/${id}`,
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setUser({ last_operations: data }))
        } catch (err) {
          console.log('Error fetching user')
        }
      }
    })
  })
})

export const { useGetUserQuery, useGetOperationsByUserQuery } = budgetApi
