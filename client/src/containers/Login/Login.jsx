import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../slices/app/userSlice'
import { useLoginMutation } from '../../slices/api/authApiSlice'
import useModal from '../../hooks/useModal/useModal'
import RegisterModal from '../../components/RegisterModal/RegisterModal'
import useInputs from '../../hooks/useInputs/useInputs'
import './Login.scss'

const Login = () => {
  const [isOpen, openModal, closeModal] = useModal(false)
  const emailRef = useRef()
  const errRef = useRef()
  const { input, handleInputChange, errors, checkErrors, resetState } = useInputs({ email: '', password: '' }, { email: '', password: '' })

  const [errMsg, setErrMsg] = useState('')

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const handleLogin = async (credentials) => {
    try {
      const userData = await login(credentials).unwrap()
      dispatch(setCredentials({ user: userData.user, accessToken: userData.accessToken }))
      resetState()
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    const input = emailRef.current
    input?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(errors).length || checkErrors()) { return alert('You must solve the errors before registering.') } else {
      try {
        handleLogin({ email: input.email, password: input.password })
      } catch (err) {
        if (!err.data) {
          setErrMsg('Server error')
        } else if (err.originalStatus === 400) {
          setErrMsg('Invalid credentials')
          // eslint-disable-next-line no-constant-condition
        } else if (err.originalStatus === 401 || 403) {
          setErrMsg('Wrong email or password')
        } else {
          setErrMsg('Server error')
        }
      }
      const error = errRef.current
      error?.focus()
    }
  }

  const handleRegister = () => {
    openModal()
  }

  const spanStyle = { color: 'red', fontSize: '25px' }
  const content = isLoading
    ? <h1>Loading...</h1>
    : (
      <section className='login--container'>
        <span
          style={spanStyle}
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live='assertive'
        >
          {errMsg}
        </span>
        <form className='login--form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='login--input-container'>
            <label htmlFor='email'>Email</label>
            <input
              className='login--input'
              type='email'
              ref={emailRef}
              placeholder='Email'
              name='email'
              autoComplete='off'
              value={input?.email}
              onChange={handleInputChange}
              onBlur={() => checkErrors('email')}
            />
            {errors?.email && <p className='login--error-msg'>{errors?.email}</p>}
          </div>
          <div className='login--input-container'>
            <label htmlFor='password'>Password</label>
            <input
              className='login--input'
              type='password'
              placeholder='Password'
              name='password'
              autoComplete='off'
              value={input?.password}
              onChange={handleInputChange}
              onBlur={() => checkErrors('password')}
            />
            {errors?.password && <p className='login--error-msg'>{errors?.password}</p>}
          </div>
          <button
            className='login--button'
            type='submit'
            disabled={isLoading}
          >
            Log in
          </button>
        </form>
        <button className='register--button' onClick={handleRegister}>Register</button>
        <RegisterModal isOpen={isOpen} closeModal={closeModal} />
      </section>
      )

  return content
}

export default Login
