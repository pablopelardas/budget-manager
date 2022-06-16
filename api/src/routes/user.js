const {Router} = require('express') 
const {getUserById} = require('../controllers/user.js');
const { authenticateToken } = require('../middlewares/authenticateToken.js');
const router = Router();

// Get user by id
router.get('/:id',authenticateToken, getUserById)

module.exports = {
  router
}