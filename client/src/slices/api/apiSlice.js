import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../app/userSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api',
  credentials: 'include', // this will send back the HTTP only secury cookie with the refresh token
  prepareHeaders: (Headers, { getState }) => {
    const token = getState().user.token
    if (token) {
      Headers.set('authorization', `Bearer ${token}`)
    }
    return Headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  console.log(result)
  // eslint-disable-next-line no-constant-condition
  if (result?.error?.originalStatus === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if (refreshResult?.data) {
      const user = api.getState().user.user
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})
