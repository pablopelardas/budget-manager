import React from 'react'

const Welcome = ({ currentUser }) => {
  return (
    <section>
      <h1>Bienvenido {currentUser?.name}</h1>
      <div>
        <p>Balance: {currentUser?.balance}</p>
      </div>
      <div>
        <p>Last Operations: </p>
        <ul>
          {currentUser?.last_operations?.slice(0, 10).map((operation, index) => (
            <li key={index}>{operation.mount} | {operation.type} | {operation.concept}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Welcome
