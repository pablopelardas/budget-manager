import { apiSlice } from './apiSlice'
import { logOut, setCredentials } from '../app/userSlice'
import { setIsLoading } from '../app/uiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    getUserAuth: builder.query({
      query: () => '/auth',
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        dispatch(setIsLoading(true))
        try {
          const { data } = await queryFulfilled
          // onSuccess
          dispatch(setCredentials({ user: data.user, accessToken: data.accessToken, authFetched: true }))
          dispatch(setIsLoading(false))
        } catch (error) {
          dispatch(setCredentials({ user: null, accessToken: null, authFetched: true }))
          dispatch(setIsLoading(false))
          console.log('Error fetching user')
        }
      }
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    logOut: builder.mutation({
      query: () => '/auth/logout',
      async onQueryStarted (_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logOut())
        } catch (err) { console.log(err) }
      }
    })
  })
})

export const {
  useLoginMutation,
  useGetUserAuthQuery,
  useRegisterMutation,
  useLogOutMutation
} = authApiSlice
