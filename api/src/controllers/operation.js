const {Operation, User} = require('../db.js')

const postOperation = async (req,res,next) => {
  const {userId} = req.params
  const {concept, mount, type} = req.body
  try{
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).send(`User not found with id:${userId}`)
    const newOperation = await user.createOperation({
      concept,
      mount,
      type
    })
    res.status(201).send(newOperation)

  }catch(error){console.log(error)}
}

const getOperationById = async(req,res,next) => {
  const {id} = req.params
  try{
    const operation = await Operation.findByPk(id)
    operation ? res.send(operation) : res.status(404).send(`Operation not found with id: ${id}`)
  }catch(error){console.log(error)}
}

const getOperationsByUser = async(req,res,next) => {
  const {userId} = req.params
  try{
    const operations = await Operation.findAll({where:{userId}})
    operations ? res.send(operation) : res.status(404).send(`None operations were found with userId: ${userId}`)
  }catch(error){console.log(error)}
}

module.exports = {
  postOperation
}