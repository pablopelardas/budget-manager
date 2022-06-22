import React from 'react'
import { useDeleteOperationMutation } from '../../slices/api/userApiSlice'
import useUpdateLists from '../../hooks/useUpdateLists/useUpdateLists'
import UpdateOpModal from '../UpdateOpModal/UpdateOpModal'
import useModal from '../../hooks/useModal/useModal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './OperationList.scss'

const OperationList = ({ operations, manage = false }) => {
  const [deleteOperation] = useDeleteOperationMutation()
  const [isOpen, openModal, closeModal] = useModal(false)
  // eslint-disable-next-line no-unused-vars
  const { updateList, currentUser } = useUpdateLists()
  const [opData, setOpData] = React.useState({})
  const handleDelete = async (operationId) => {
    await deleteOperation({ userId: currentUser.id, operationId })
    updateList('all')
  }

  const handleUpdate = (op) => {
    setOpData(op)
    openModal()
  }

  return (
    <div className='container'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className='op-list--tablecell op--head' align='center'>Date</TableCell>
              <TableCell className='op-list--tablecell op--head' align='center'>Concept</TableCell>
              <TableCell className='op-list--tablecell op--head' align='center'>Type</TableCell>
              <TableCell className='op-list--tablecell op--head' align='center'>Amount</TableCell>
              {manage &&
                  (
                    <>
                      <TableCell className='op-list--tablecell op--head' align='center' />
                      <TableCell className='op-list--tablecell op--head' align='center' />
                    </>
                  )}

            </TableRow>
          </TableHead>
          <TableBody>
            {operations?.map((operation) => (
              <TableRow
                key={`last_operations_${operation.id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={`op-list--tablecell ${operation.type === 'income' ? 'op--income' : 'op--expense'}`} align='center'>{operation.date}</TableCell>
                <TableCell className={`op-list--tablecell ${operation.type === 'income' ? 'op--income' : 'op--expense'}`} align='center'>{operation.concept}</TableCell>
                <TableCell className={`op-list--tablecell ${operation.type === 'income' ? 'op--income' : 'op--expense'}`} align='center'>{operation.type}</TableCell>
                <TableCell className={`op-list--tablecell ${operation.type === 'income' ? 'op--income' : 'op--expense'}`} align='center'>{operation.amount}</TableCell>
                {manage &&
                  (
                    <>
                      <TableCell className={`op-list--tablecell ${operation.type === 'income' ? 'op--income' : 'op--expense'}`} align='center'><button className='op-list--delete' onClick={() => handleDelete(operation.id)}>Delete</button></TableCell>
                      <TableCell className={`op-list--tablecell ${operation.type === 'income' ? 'op--income' : 'op--expense'}`} align='center'><button className='op-list--update' onClick={() => handleUpdate(operation)}>Update</button></TableCell>
                    </>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateOpModal opData={opData} isOpen={isOpen} closeModal={closeModal} updateList={updateList} />
    </div>
  )
}

export default OperationList
