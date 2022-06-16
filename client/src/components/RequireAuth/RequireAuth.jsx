import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import { selectIsLoading } from '../../slices/app/uiSlice'
import { Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const loading = useSelector(selectIsLoading)

  if (loading) {
    return <Loading />
  }

  return <Outlet />
}

export default RequireAuth
