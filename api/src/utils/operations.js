const {Operation} = require('../db.js')

const getBalance = async (userId) => {
  try{
    let operations = await Operation.findAll({where:{userId}})
    operations = operations.map(op => parseInt(op.type === 'income' ? op.mount : -op.mount))
    const balance = operations.length ?  operations.reduce((acc, nextMount) => acc + nextMount) : 0
    return balance
  }catch(error){return error}
}

module.exports = {
  getBalance
}