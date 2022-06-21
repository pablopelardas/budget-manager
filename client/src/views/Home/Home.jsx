import React from 'react'
import Welcome from '../../containers/Welcome/Welcome'
import Login from '../../containers/Login/Login'
import OperationManager from '../../containers/OperationManager/OperationManager'
import useUpdateLists from '../../hooks/useUpdateLists/useUpdateLists'

const Home = () => {
  const { currentUser, currentToken, updateList } = useUpdateLists()
  const content = !currentToken
    ? <Login />
    : (
      <>
        <Welcome currentUser={currentUser} />
        <OperationManager updateList={updateList} />
      </>
      )

  return (
    <main>
      {content}
    </main>
  )
}

export default Home
