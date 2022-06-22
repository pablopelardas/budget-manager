import { setCredentials } from '../app/userSlice.js'
import { apiSlice } from './apiSlice.js'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: { name: data.name, balance: data.balance } }))
        } catch (err) {
          console.log('Error fetching user')
        }
      }
    }),
    getLastOperations: builder.query({
      query: (id) => {
        if (!id) return ''
        return {
          url: `/operation/last/${id}`
        }
      },
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: { last_operations: data } }))
        } catch (err) {
          console.log(err)
          console.log('Error fetching user')
        }
      }
    }),
    getAllOperations: builder.mutation({
      query: ({ id, type }) => {
        if (!id) return ''
        return {
          url: `/operation/history/${id}?type=${type}`
        }
      },
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: { all_operations: data } }))
        } catch (err) {
          console.log(err)
          console.log('Error fetching user')
        }
      }
    }),
    createOperation: builder.mutation({
      query: ({ userId, opData }) => {
        return {
          url: `/operation/create/${userId}`,
          method: 'POST',
          body: { ...opData }
        }
      }
    }),
    deleteOperation: builder.mutation({
      query: ({ userId, operationId }) => {
        return {
          url: `/operation/delete/${userId}`,
          method: 'DELETE',
          body: { operationId }
        }
      }
    }),
    updateOperation: builder.mutation({
      query: ({ operationId, opData }) => {
        return {
          url: `/operation/update/${operationId}`,
          method: 'PUT',
          body: { ...opData }
        }
      }
    })
  })
})

export const {
  useGetUserQuery,
  useGetLastOperationsQuery,
  useGetAllOperationsMutation,
  useCreateOperationMutation,
  useDeleteOperationMutation,
  useUpdateOperationMutation
} = userApiSlice
