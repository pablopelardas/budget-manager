import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  authFetched: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = { ...state.user, ...user }
      state.token = accessToken || state.token
      state.authFetched = true
    },
    logOut: () => initialState
  }
})

export const { setCredentials, logOut } = userSlice.actions

export const selectCurrentUser = (state) => state.user.user
export const selectCurrentToken = (state) => state.user.token
export const selectCurrentAuthFetched = (state) => state.user.authFetched

export default userSlice.reducer
