import React from 'react'
import Lobby from '../../containers/Lobby/Lobby'
import Login from '../../containers/Login/Login'
import OperationManager from '../../containers/OperationManager/OperationManager'
import useUpdateLists from '../../hooks/useUpdateLists/useUpdateLists'

import './Home.scss'

const Home = () => {
  const { currentUser, currentToken, updateList } = useUpdateLists()
  const content = !currentToken
    ? <Login />
    : (
      <>
        <Lobby currentUser={currentUser} />
        <OperationManager updateList={updateList} />
      </>
      )

  return (
    <main className='home--main'>
      {content}
    </main>
  )
}

export default Home
