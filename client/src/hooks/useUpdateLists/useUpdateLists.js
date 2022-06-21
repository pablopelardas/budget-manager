import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../../slices/app/userSlice'
import { useGetAllOperationsMutation, useGetUserQuery, useGetLastOperationsQuery } from '../../slices/api/userApiSlice'

const useUpdateLists = () => {
  const currentUser = useSelector(selectCurrentUser)
  const currentToken = useSelector(selectCurrentToken)
  const [getOps] = useGetAllOperationsMutation()
  const getUser = useGetUserQuery(currentUser?.id)
  const getLastOperations = useGetLastOperationsQuery(currentUser?.id)

  React.useEffect(() => {
    getOps({ id: currentUser?.id, type: '' })
  }, [])

  const updateList = (type = '') => {
    if (type === 'all') type = ''
    getOps({ id: currentUser?.id, type })
    getUser.refetch()
    getLastOperations.refetch()
  }

  return {
    currentUser,
    currentToken,
    updateList
  }
}

export default useUpdateLists
