const {Router} = require('express') 
const {postOperation, getOperationById, getOperationsByUser, getOperationsHistory} = require('../controllers/operation.js')
const router = Router();

// Post new user to database
router.post('/user/:userId', postOperation)
router.get('/user/:userId', getOperationsByUser)
router.get('/history/:userId', getOperationsHistory)

router.get('/:id', getOperationById)

module.exports = {
  router
}