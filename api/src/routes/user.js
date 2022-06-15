const {Router} = require('express') 
const {getUserById, postUser} = require('../controllers/user.js')
const router = Router();

// Post new user to database
router.post('/', postUser)

// Get user by id
router.get('/:id', getUserById)

module.exports = {
  router
}