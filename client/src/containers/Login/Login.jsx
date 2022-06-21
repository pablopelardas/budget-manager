import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../slices/app/userSlice'
import { useLoginMutation } from '../../slices/api/authApiSlice'

const Login = () => {
  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const handleLogin = async (credentials) => {
    const userData = await login(credentials).unwrap()
    dispatch(setCredentials({ user: userData.user, accessToken: userData.accessToken }))
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    const input = emailRef.current
    input?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      handleLogin({ email, password })
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

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const spanStyle = { color: 'red', fontSize: '25px' }
  const content = isLoading
    ? <h1>Loading...</h1>
    : (
      <>
        <span
          style={spanStyle}
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live='assertive'
        >
          {errMsg}
        </span>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Login</h1>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              ref={emailRef}
              placeholder='Email'
              name='email'
              autoComplete='off'
              required
              onChange={handleEmailInput}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              autoComplete='off'
              required
              onChange={handlePasswordInput}
            />
          </div>
          <button
            className='login--btn'
            type='submit'
            disabled={isLoading}
          >
            Log in
          </button>
        </form>
      </>
      )

  return content
}

export default Login
