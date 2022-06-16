import { Routes, Route } from 'react-router-dom'
import Layout from './views/Layout/Layout.jsx'
import Home from './views/Home/Home.jsx'
import './styles/global.scss'
import { useGetUserAuthQuery } from './slices/api/authApiSlice.js'
import RequireAuth from './components/RequireAuth/RequireAuth.jsx'

function App () {
  useGetUserAuthQuery()
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
