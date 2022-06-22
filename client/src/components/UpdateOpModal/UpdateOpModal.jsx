import React from 'react'
import useInputs from '../../hooks/useInputs/useInputs'
import './UpdateOpModal.scss'
import formatDate from '../../utils/formatDate'
import { useUpdateOperationMutation } from '../../slices/api/userApiSlice'

const UpdateOpModal = ({ opData, isOpen, closeModal, updateList }) => {
  const handleModalContainerClick = (event) => event.stopPropagation()
  const [updateOperation] = useUpdateOperationMutation()
  const initialErrors = {
    concepts: '',
    amount: ''
  }
  const initialInput = {
    concepts: '',
    amount: '',
    date: '',
    type: ''
  }
  // eslint-disable-next-line no-unused-vars
  const { input, errors, handleInputChange, checkErrors, resetState, setInput } = useInputs({ initialInput, initialErrors })

  React.useEffect(() => {
    if (typeof opData === 'object' && Object.keys(opData).length) {
      setInput({ ...opData, date: formatDate(opData.date) })
    }
  }, [opData])

  const handleClick = async () => {
    if (Object.keys(errors).length || checkErrors()) { return alert('You must solve the errors before updating a new game.') } else {
      try {
        await updateOperation({ operationId: opData.id, opData: input })
        await updateList()
        resetState()
        closeModal()
      } catch (e) { console.log(e) }
    }
  }

  return (
    <article className={`modal ${isOpen && 'is-open'}`}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        <div className='operation--inputs'>
          <input type='date' className='operation--input' value={input?.date} name='date' onChange={handleInputChange} />
          <input
            className={`operation--input ${errors.concept && 'operation--update--concept--error'}`}
            placeholder='Concept'
            value={input?.concept}
            name='concept'
            onChange={handleInputChange}
            onBlur={() => checkErrors('concept')}
          />
          {errors.concept && <p>{errors.concept}</p>}

          <span className={`operation--type ${opData?.type === 'income' ? 'op-update-income' : 'op-update-expense'}`}>{opData?.type}</span>
          <input
            type='text'
            className={`operation--input ${errors.amount && 'operation--update--amount--error'}`}
            placeholder='Amount'
            value={input?.amount}
            name='amount'
            onChange={handleInputChange}
            onBlur={() => checkErrors('amount')}
          />
          {errors.amount && <p>{errors.amount}</p>}
          <button className='update--button' onClick={handleClick}>Update Operation</button>

          <button className='cancel--button' onClick={() => closeModal()}>Cancel</button>
        </div>
      </div>
    </article>
  )
}

export default UpdateOpModal
