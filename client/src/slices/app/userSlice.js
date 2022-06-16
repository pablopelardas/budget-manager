import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    name: '',
    balance: 0,
    operations: [],
    last_operations: []
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      state.user = { ...state.user, ...action.payload }
    }
  }
})

export const { setUser } = userSlice.actions

export const selectCurrentUser = (state) => state.user.user

export default userSlice.reducer
