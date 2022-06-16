import React from 'react'
import Welcome from '../../components/Welcome/Welcome'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../slices/app/userSlice'

const Home = () => {
  const currentUser = useSelector(selectCurrentUser)
  console.log(currentUser)
  React.useEffect(() => {

  }, [currentUser?.operations])
  return (
    <main>
      <Welcome currentUser={currentUser} />
    </main>
  )
}

export default Home
