import React from 'react'
import Welcome from '../../containers/Welcome/Welcome'
import Login from '../../containers/Login/Login'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../../slices/app/userSlice'
import OperationManager from '../../containers/OperationManager/OperationManager'

const Home = () => {
  const currentUser = useSelector(selectCurrentUser)
  const currentToken = useSelector(selectCurrentToken)
  React.useEffect(() => {

  }, [currentUser])
  const content = !currentToken
    ? <Login />
    : (
      <>
        <Welcome currentUser={currentUser} />
        <OperationManager />
      </>
      )

  return (
    <main>
      {content}
    </main>
  )
}

export default Home
