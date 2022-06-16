import { Routes, Route } from 'react-router-dom'
import Layout from './views/Layout/Layout.jsx'
import Home from './views/Home/Home.jsx'
import './styles/global.scss'
import { useGetOperationsByUserQuery, useGetUserQuery } from './slices/api/apiSlice'

function App () {
  useGetUserQuery(1)
  useGetOperationsByUserQuery(1)
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
