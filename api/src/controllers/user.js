const {User} = require('../db.js')

const getUserById = async(req,res,send) => {
  const {id} = req.params
  try{
    const user = await User.findByPk(id)
    user ? res.send(user) : res.status(404).send(`User not found`)
  }catch(error){console.log(error)}
}

const postUser = async (req, res, send)=>{
  const {name, email} = req.body
  try{
    const user = await User.create({name, email})
    res.status(201).send(user)
  }catch(err){console.log(err)}
}

module.exports = {
  getUserById,
  postUser
}