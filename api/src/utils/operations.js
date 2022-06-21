const {Operation} = require('../db.js')

const getBalance = async (userId) => {
  try{
    let operations = await Operation.findAll({where:{userId}})
    operations = operations.map(op => parseInt(op.type === 'income' ? op.amount : -op.amount))
    const balance = operations.length ?  operations.reduce((acc, nextAmount) => acc + nextAmount) : 0
    return balance
  }catch(error){return error}
}

module.exports = {
  getBalance
}