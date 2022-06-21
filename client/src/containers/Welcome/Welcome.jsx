import React from 'react'

import OperationList from '../../components/OperationList/OperationList'

const Welcome = ({ currentUser }) => {
  React.useEffect(() => {}, [currentUser.lastOperations])
  return (
    <section>
      <h1>Welcome {currentUser?.name}</h1>
      <div>
        <p>Balance: {currentUser?.balance}</p>
      </div>
      <div>
        <p>Last Operations: </p>
        <OperationList operations={currentUser?.last_operations} />
      </div>
    </section>
  )
}

export default Welcome
