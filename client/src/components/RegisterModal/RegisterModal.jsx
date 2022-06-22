import React from 'react'
import useInputs from '../../hooks/useInputs/useInputs'
import './RegisterModal.scss'
import { useRegisterMutation } from '../../slices/api/authApiSlice'

const UpdateOpModal = ({ isOpen, closeModal }) => {
  const handleModalContainerClick = (event) => event.stopPropagation()
  const [register] = useRegisterMutation()
  const initialErrors = {
    username: '',
    email: '',
    password: ''
  }
  const initialInput = {
    username: '',
    email: '',
    password: ''
  }
  // eslint-disable-next-line no-unused-vars
  const { input, errors, handleInputChange, checkErrors, resetState } = useInputs({ initialInput, initialErrors })

  const handleClick = async () => {
    if (Object.keys(errors).length || checkErrors()) { return alert('You must solve the errors before registering.') } else {
      try {
        await register({ name: input.username, email: input.email, password: input.password })
        resetState()
        closeModal()
      } catch (e) { console.log(e) }
    }
  }

  return (
    <article className={`register-modal ${isOpen && 'register-is-open'}`}>
      <div className='register-modal-container' onClick={handleModalContainerClick}>
        <div className='register--inputs'>
          <input
            className={`register--input ${errors.name && 'register--input--error'}`}
            placeholder='Username'
            value={input?.username}
            name='username'
            onChange={handleInputChange}
            onBlur={() => checkErrors('username')}
          />
          {errors.username && <p className='register--error-msg'>{errors.username}</p>}
          <input
            type='text'
            className={`register--input ${errors.email && 'register--input--error'}`}
            placeholder='Email'
            value={input?.email}
            name='email'
            onChange={handleInputChange}
            onBlur={() => checkErrors('email')}
          />
          {errors.email && <p className='register--error-msg'>{errors.email}</p>}
          <input
            type='password'
            className={`register--input ${errors.password && 'register--input--error'}`}
            placeholder='Password'
            value={input?.password}
            name='password'
            onChange={handleInputChange}
            onBlur={() => checkErrors('password')}
          />
          {errors.password && <p className='register--error-msg'>{errors.password}</p>}
          <button className='register--button' onClick={handleClick}>Register</button>
          <button className='cancel--button' onClick={() => closeModal()}>Cancel</button>
        </div>
      </div>
    </article>
  )
}

export default UpdateOpModal
