import React from 'react'

const useInputs = ({ initialInput, initialErrors }) => {
  const [input, setInput] = React.useState(initialInput)
  const [errors, setErrors] = React.useState(initialErrors)

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
          if (!/^[\w-ñ.,'"`!¡?¿\s]+$/.test(input.concept)) {
            setErrors({
              ...errors,
              concept: 'Concept field is required and it must be alphanumeric.'
            })
          }
          return
        case 'amount':
          if (!/^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/.test(input.amount)) {
            setErrors({
              ...errors,
              amount: 'Description field is required and it must be alphanumeric.'
            })
          }
          return
        case 'username':
          if (!/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/.test(input.username)) {
            setErrors({
              ...errors,
              username: 'Username field is required and it must be alphanumeric (can contain "-",".","_").'
            })
          }
          return
        case 'email':
          if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
            setErrors({
              ...errors,
              email: 'Email field is required and it must be a valid email.'
            })
          }
          return
        case 'password':
          if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)) {
            setErrors({
              ...errors,
              password: 'Password field is required and it must be at least 8 characters long and contain at least one letter and one number.'
            })
          }
          return
        default:
          break
      }
    }
    const keys = Object.keys(input)
    keys.forEach(key => {
      if (!input[key]) {
        newErrors[key] = `${key} field is required.`
      }
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return true
    else return false
  }

  const resetState = () => {
    setInput(prevState => ({ ...initialInput, type: prevState?.type }))
    setErrors(initialErrors)
  }

  return {
    input,
    errors,
    handleInputChange,
    checkErrors,
    resetState,
    setInput
  }
}

export default useInputs
