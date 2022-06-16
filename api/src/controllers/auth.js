const { createUserInDb, generateAccessToken, updateRefreshToken, verifyRefreshToken } = require('../utils/auth.js');
const {getUserFromDbByField} = require('../utils/users.js');


require('dotenv').config()
const bcrypt = require('bcrypt')

const registerUser = async (req,res,next) => {
  let user;
  try{
    //Hash password and define user props
    const password = await bcrypt.hash(req.body.password, 10)
    user = {name: req.body.name, email: req.body.email, password}
    req.body ={
      email: user.email,
      password: req.body.password
    }
    // Verify if user exists
    const userExists = await getUserFromDbByField('email', user.email)
    if (userExists) return res.status(400).send(`User already exists`)
    // Create user
    await createUserInDb(user)
    res.sendStatus(201)
  }catch(error){next(error)}
}

const loginUser = async (req,res,next) => {
  let user;
  try{
    //Verify if user exists
    user = await getUserFromDbByField('email', req.body.email)
    if (!user) return res.status(404).send(`User not found`)
    //Verify password
    if (!await bcrypt.compare(req.body.password, user.password)) return res.status(400).send(`Password incorrect`)
    const accessToken = generateAccessToken(user)
    const refreshToken = await updateRefreshToken(user)
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) // 1 day
    res.send({
      user: {
        name: user.name,
        email: user.email,
        id: user.id
      },
      accessToken
    })
  }catch(error){next(error)}
}

const handleRefreshToken = async (req,res,next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).send(`No token found, unauthorized`)
  const refreshToken = cookies.jwt;
  try{
    const user = await getUserFromDbByField('refreshToken', refreshToken)
    if (!user) return res.status(401).send(`No token found, unauthorized`)
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === 'string') res.send({accesToken: newToken})
    else res.status(newToken.status).send(newToken.message)
  }catch(error){next(error)}
}

const getUserAuth = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).send(`No token found, unauthorized`)
  const refreshToken = cookies.jwt;
  try{
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    if (!user) return next({status:404 , message:'No session found'})
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === 'string'){
    return res.send({
      user: {
        name : user.name,
        email : user.email,
        id: user.id
        },
      accessToken: newToken
    })
    } else res.status(newToken.status).send(newToken.message)
  }catch(error){next(error)}
}

const logoutUser = async (req,res,next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).send(`No token found, unauthorized`)
  const refreshToken = cookies.jwt;
  try{
 // Is refreshToken in db?
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    // If we dont find a user with the refreshToken, we proceed to clear the cookie
    if (!user) {
      res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
      return res.sendStatus(204)
    }
    // Delete refreshToken in db
    await updateRefreshToken(user, true) // errase true
    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.sendStatus(204)
    // if (!user)    
  }catch(error){return next(error)}
}

module.exports = {
  registerUser,
  loginUser,
  handleRefreshToken,
  getUserAuth,
  logoutUser
}