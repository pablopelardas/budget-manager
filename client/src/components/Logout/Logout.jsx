import React from 'react'
import { useSelector } from 'react-redux'
import { useLogOutMutation } from '../../slices/api/authApiSlice'
import { selectCurrentUser } from '../../slices/app/userSlice'
import './Logout.scss'

const Logout = () => {
  const [logOut] = useLogOutMutation()
  const currentUser = useSelector(selectCurrentUser)

  const content = currentUser && Object.keys(currentUser).length
    ? (
      <button className='logout--button' onClick={() => logOut()}>Logout</button>
      )
    : null

  return content
}

export default Logout
