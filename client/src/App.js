import { Routes, Route } from 'react-router-dom'
import Layout from './/views/Layout/Layout.jsx'
import Home from './views/Home/Home.jsx'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
