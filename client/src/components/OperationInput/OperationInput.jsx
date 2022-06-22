import React from 'react'
import { useCreateOperationMutation } from '../../slices/api/userApiSlice'
import { selectCurrentUser } from '../../slices/app/userSlice'
import { useSelector } from 'react-redux'
import useInputs from '../../hooks/useInputs/useInputs'
import './OperationInput.scss'

const initialInput = {
  date: new Date().toISOString().substring(0, 10),
  concept: '',
  amount: '',
  type: 'income'
}
const initialErrors = {
}

const OperationInput = ({ updateList }) => {
  const { id } = useSelector(selectCurrentUser)
  const [createOperation] = useCreateOperationMutation()
  const { input, errors, handleInputChange, checkErrors, resetState } = useInputs({ initialInput, initialErrors })

  const handleClick = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length || checkErrors()) { return alert('You must solve the errors before submitting a new game.') } else {
      try {
        await createOperation({ userId: id, opData: input })
        updateList()
      } catch (e) { console.log(e) }
    }
    resetState()
  }

  return (
    <div className='operation--register'>
      <div className='operation--inputs'>
        <div className='operation--subdivision'>
          <input type='date' className='operation--input' value={input.date} name='date' onChange={handleInputChange} />
          <input
            className={`operation--input ${errors.concept && 'operation--input--error'}`}
            placeholder='Concept'
            value={input.concept}
            name='concept'
            onChange={handleInputChange}
            onBlur={() => checkErrors('concept')}
          />
          {errors.concept && <p className='operation--error-msg'>{errors.concept}</p>}
        </div>
        <div className='operation--subdivision'>
          <select name='type' className='operation--input' value={input.type} onChange={handleInputChange}>
            <option className='operation--type-option' value='income' name='type'>Income</option>
            <option className='operation--type-option' value='expense' name='type'>Expense</option>
          </select>
          <input
            type='text'
            className={`operation--input ${errors.amount && 'operation--input--error'}`}
            placeholder='Amount'
            value={input.amount}
            name='amount'
            onChange={handleInputChange}
            onBlur={() => checkErrors('amount')}
          />
          {errors.amount && <p className='operation--error-msg'>{errors.amount}</p>}
        </div>
        <button onClick={handleClick}>Add Operation</button>
      </div>
    </div>
  )
}

export default OperationInput
