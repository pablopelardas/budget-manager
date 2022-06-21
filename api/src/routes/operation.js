const {Router} = require('express') 
const {postOperation, getOperationById, getLastOperationsByUser, getOperationsHistory} = require('../controllers/operation.js')
const router = Router();

// Post new user to database
router.post('/create/:userId', postOperation)
router.get('/last/:userId', getLastOperationsByUser)
router.get('/history/:userId', getOperationsHistory)

router.get('/:id', getOperationById)

module.exports = {
  router
}