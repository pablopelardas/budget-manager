import React from 'react'
import Welcome from '../../components/Welcome/Welcome'
import Login from '../../components/Login/Login'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../../slices/app/userSlice'

const Home = () => {
  const currentUser = useSelector(selectCurrentUser)
  const currentToken = useSelector(selectCurrentToken)
  React.useEffect(() => {

  }, [currentUser])
  const content = currentToken
    ? <Welcome currentUser={currentUser} />
    : <Login />

  return (
    <main>
      {content}
    </main>
  )
}

export default Home
