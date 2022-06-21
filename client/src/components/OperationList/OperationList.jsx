import React from 'react'
import { useDeleteOperationMutation } from '../../slices/api/userApiSlice'
import useUpdateLists from '../../hooks/useUpdateLists/useUpdateLists'

const OperationList = ({ operations, manage = false }) => {
  const [deleteOperation] = useDeleteOperationMutation()
  // eslint-disable-next-line no-unused-vars
  const { updateList, currentUser } = useUpdateLists()

  const handleDelete = async (operationId) => {
    await deleteOperation({ userId: currentUser.id, operationId })
    updateList('all')
  }

  return (
    <div>
      <ul>
        {operations?.map((operation, index) => (
          <div key={index}>
            {operation.date} | {operation.concept} | {operation.type} | {operation.amount}
            {manage && (
              <div>
                <button onClick={() => handleDelete(operation.id)}>Delete</button>
                <button onClick={() => console.log('update')}>Update</button>
              </div>)}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default OperationList
