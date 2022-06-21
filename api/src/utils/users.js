const {User, Operation} = require('../db.js')

const getUserFromDbByField = async(field, value) => {
    const user = await User.findOne({
      where: {
        [field]:value
      },
      include:[
        {
          model: Operation,
          attributes: ['concept','amount','type'],  
        }
      ]
    })
    if (!user) return null;
     return user.dataValues;
}

module.exports = {
  getUserFromDbByField,
}