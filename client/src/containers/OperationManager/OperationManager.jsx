import React from 'react'
import OperationInput from '../../components/OperationInput/OperationInput'
import OperationList from '../../components/OperationList/OperationList'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../slices/app/userSlice'
import './OperationManager.scss'
// import { useGetAllOperationsMutation } from '../../slices/api/userApiSlice'

const OperationManager = ({ updateList }) => {
  const currentUser = useSelector(selectCurrentUser)
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = React.useState('All')

  const handleTypeChange = (e) => {
    setType((e.target.value).toString())
    updateList((e.target.value).toString())
  }

  const content =
  (
    <>
      <span id='history' />
      <div className='operation-manager-container'>
        <h1 id='history'>Operation's History</h1>
        <OperationInput updateList={updateList} />
        <select name='type' className='operation--list-type' value={type} onChange={handleTypeChange}>
          <option className='operation--list-type-option' value='all' name='type'>All</option>
          <option className='operation--list-type-option' value='income' name='type'>Income</option>
          <option className='operation--list-type-option' value='expense' name='type'>Expense</option>
        </select>
        <OperationList operations={currentUser?.all_operations} manage />
      </div>
    </>
  )

  return content
}

export default OperationManager
