import React from 'react'
import { useCreateOperationMutation } from '../../slices/api/userApiSlice'
import { selectCurrentUser } from '../../slices/app/userSlice'
import { useSelector } from 'react-redux'

const initialInput = {
  date: new Date().toISOString().substring(0, 10),
  concept: '',
  amount: '',
  type: 'income'
}

const OperationInput = ({ updateList }) => {
  const { id } = useSelector(selectCurrentUser)
  const [createOperation] = useCreateOperationMutation()
  const [input, setInput] = React.useState(initialInput)
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = React.useState({
    concept: 'field required',
    amount: 'field required'
  })

  const handleInputChange = (e) => {
    setInput(prevState => {
      return {
        ...prevState,
        [e.target.name]: [e.target.value].toString()
      }
    })
    checkErrors()
  }

  const checkErrors = (field = null) => {
    const newErrors = {}
    if (field) {
      switch (field) {
        case 'concept':
          console.log('checking concept')
          if (!/^[\w-ñ.,'"`!¡?¿\s]+$/.test(input.concept)) {
            setErrors({
              ...errors,
              concept: 'Concept field is required and it must be alphanumeric.'
            })
          }
          return
        case 'amount':
          console.log('checking amount')
          if (!/^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/.test(input.amount)) {
            setErrors({
              ...errors,
              amount: 'Description field is required and it must be alphanumeric.'
            })
          }
          return
        default:
          break
      }
    }
    if (!input.concept.length) newErrors.concept = 'Concept field is required'
    if (!input.amount) newErrors.amount = 'Amount field is required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return true
    else return false
  }

  const handleClick = async (e) => {
    e.preventDefault()
    console.log('2 veces')
    if (Object.keys(errors).length || checkErrors()) { return alert('You must solve the errors before submitting a new game.') } else {
      try {
        await createOperation({ userId: id, opData: input })
        updateList()
      } catch (e) { console.log(e) }
    }
    setInput(prevState => ({ ...initialInput, type: prevState.type }))
  }

  return (
    <div>
      <input type='date' className='operation--date' value={input.date} name='date' onChange={handleInputChange} />
      <input
        className='operation--concept'
        placeholder='Concept'
        value={input.concept}
        name='concept'
        onChange={handleInputChange}
        onBlur={() => checkErrors('concept')}
      />
      <select name='type' className='operation--type' value={input.type} onChange={handleInputChange}>
        <option className='operation--type-option' value='income' name='type'>Income</option>
        <option className='operation--type-option' value='expense' name='type'>Expense</option>
      </select>
      <input
        type='text'
        className='operation--amount'
        placeholder='Amount'
        value={input.amount}
        name='amount'
        onChange={handleInputChange}
        onBlur={() => checkErrors('amount')}
      />
      <button onClick={handleClick}>Add Operation</button>
    </div>
  )
}

export default OperationInput
