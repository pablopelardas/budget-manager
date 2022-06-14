const {Router} = require('express') 
const {postOperation} = require('../controllers/operation.js')
const router = Router();

// Post new user to database
router.post('/:userId', postOperation)

module.exports = {
  router
}