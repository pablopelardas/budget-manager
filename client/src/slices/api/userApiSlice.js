import { setCredentials } from '../app/userSlice.js'
import { apiSlice } from './apiSlice.js'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setCredentials({ user: { name: data.name, balance: data.balance } }))
        } catch (err) {
          console.log('Error fetching user')
        }
      }
    }),
    getLastOperations: builder.query({
      query: (id) => `/operation/user/${id}`,
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setCredentials({ user: { last_operations: data } }))
        } catch (err) {
          console.log(err)
          console.log('Error fetching user')
        }
      }
    }),
    getAllOperations: builder.query({
      query: (id, type) => `/operation/history/${id}?type=${type}`,
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: { all_operations: data } }))
        } catch (err) {
          console.log(err)
          console.log('Error fetching user')
        }
      }
    })
  })
})

export const {
  useGetUserQuery,
  useGetLastOperationsQuery,
  useGetAllOperationsQuery
} = userApiSlice
