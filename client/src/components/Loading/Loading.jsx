import { useEffect } from 'react'
import { Box, CircularProgress, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentAuthFetched, selectCurrentToken } from '../../slices/app/userSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'

const Loading = () => {
  const currentToken = useSelector(selectCurrentToken)
  const authFetched = useSelector(selectCurrentAuthFetched)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (currentToken) return navigate(from, { replace: true })
    if (authFetched) return navigate('/', { replace: true })
  }, [currentToken, authFetched])

  return (
    <Container sx={{ height: '95vh' }}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100%' }}
      >
        <CircularProgress />
      </Box>
    </Container>
  )
}

export default Loading
