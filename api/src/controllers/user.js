const {User, Operation} = require('../db.js')
const { getBalance } = require('../utils/operations.js')

const getUserById = async(req,res,next) => {
  const {id} = req.params
  try{
    let user = await User.findByPk(id,{
      include:[
        {
          model: Operation,
          attributes: ['concept','mount','type'],  
        }
      ]
    })
    if (!user) return res.status(404).send(`User not found with id:${id}`)
    const balance = await getBalance(id);
    console.log(balance)
    user = {...user.dataValues, balance}
    res.send(user)
    // user ? res.send({user}) : res.status(404).send(`User not found`)
  }catch(error){console.log(error)}
}

module.exports = {
  getUserById
}