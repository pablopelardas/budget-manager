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
    const operations = await Operation.findAll({where:{userId}, order:[['createdAt' , 'DESC']], limit: 10})
    operations ? res.send(operations) : res.status(404).send(`None operations were found with userId: ${userId}`)
  }catch(error){console.log(error)}
}

const getUserBalance = async(req,res,next) => {
  const {userId} = req.params
  try{
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).send(`User not found with id:${userId}`)
    let operations = await Operation.findAll({where:{userId}})
    operations = operations.map(op => parseInt(op.type === 'income' ? op.mount : -op.mount))
    const balance = operations.length ?  operations.reduce((acc, nextMount) => acc + nextMount) : 0
    res.send({balance})
  }catch(error){console.log(error)}
}

module.exports = {
  postOperation,
  getOperationById,
  getOperationsByUser,
  getUserBalance
}