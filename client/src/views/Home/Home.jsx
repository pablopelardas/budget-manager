import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../slices/app/userSlice'

const Home = () => {
  const currentUser = useSelector(selectCurrentUser)
  console.log(currentUser)
  React.useEffect(() => {

  }, [currentUser?.operations])
  return (
    <main>
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
    </main>
  )
}

export default Home
