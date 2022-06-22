import React from 'react'
import './Lobby.scss'

import OperationList from '../../components/OperationList/OperationList'

const Lobby = ({ currentUser }) => {
  React.useEffect(() => {}, [currentUser.lastOperations])

  return (
    <>
      <span id='recent' />

      <section className='lobby--section'>
        <h1 className='lobby--title'>Welcome {currentUser?.name}</h1>
        <div className='lobby--balance-container'>
          <p className='lobby--balance-p'>Balance: <span className={currentUser?.balance >= 0 ? 'lobby--balance-positive' : 'lobby--balance-negative'}>{currentUser?.balance}</span></p>
        </div>
        <div className='lobby--lastOperations-container'>
          <OperationList operations={currentUser?.last_operations} />
        </div>
      </section>

    </>
  )
}

export default Lobby
