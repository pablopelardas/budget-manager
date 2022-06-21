import React from 'react'
import { useGetUserQuery, useGetLastOperationsQuery } from '../../slices/api/userApiSlice'

const Welcome = ({ currentUser }) => {
  console.log(currentUser)
  useGetUserQuery(currentUser.id)
  useGetLastOperationsQuery(currentUser.id)
  return (
    <section>
      <h1>Welcome {currentUser?.name}</h1>
      <div>
        <p>Balance: {currentUser?.balance}</p>
      </div>
      <div>
        <p>Last Operations: </p>
        <ul>
          {currentUser?.last_operations?.map((operation, index) => (
            <li key={index}>{operation.mount} | {operation.type} | {operation.concept} | {operation.createdAt.slice(0, 10)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Welcome
