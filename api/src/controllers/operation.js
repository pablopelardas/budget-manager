const {Operation, User} = require('../db.js')

const postOperation = async (req,res,next) => {
  const {userId} = req.params
  console.log(req.body)
  const {date ,concept, amount, type} = req.body
  try{
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).send(`User not found with id:${userId}`)
    const newOperation = await user.createOperation({
      concept,
      amount,
      type,
      date
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

const getLastOperationsByUser = async(req,res,next) => {
  const {userId} = req.params
  try{
    const operations = await Operation.findAll({where:{userId}, order:[['createdAt' , 'DESC']], limit: 10})
    operations ? res.send(operations) : res.status(404).send(`None operations were found with userId: ${userId}`)
  }catch(error){console.log(error)}
}

const getOperationsHistory = async(req,res,next) => {
  const {userId} = req.params
  const {type} = req.query
  try{
    let options = {
      where:{userId},
      order:[['createdAt' , 'DESC']],
    };
    if (type) options = {...options, where:{userId,type}}
    const operations = await Operation.findAll(options)
    operations ? res.send(operations) : res.status(404).send(`None operations were found with userId: ${userId}`)
  }catch(error){console.log(error)}
}

const deleteOperation = async(req,res,next) => {
  const {userId} = req.params
  const {operationId} = req.body
  try{
    const operation = await Operation.findByPk(operationId)
    const user = await User.findByPk(userId)
    if (!operation) return res.status(404).send(`Operation not found with id: ${operationId}`)
    if (operation.dataValues.userId != userId) return res.status(403).send(`Operation not found with that userId: ${userId}`)
    user.removeOperation(operation)
    operation.destroy()
    return res.status(204).send()
  }catch(error){console.log(error)}
}

const updateOperation = async(req,res,next) => {
  const {operationId} = req.params
  const {concept, amount, date} = req.body
  try{
    const operation = await Operation.findByPk(operationId)
    if (!operation) return res.status(404).send(`Operation not found with id: ${operationId}`)
    operation.update({concept, amount, date})
    console.log(operation)
    return res.status(204).send()
  }catch(error){console.log(error)}
}


module.exports = {
  postOperation,
  getOperationById,
  getLastOperationsByUser,
  getOperationsHistory,
  deleteOperation,
  updateOperation
}