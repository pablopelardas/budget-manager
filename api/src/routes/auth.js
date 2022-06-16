const {Router} = require('express'); 
const { registerUser, loginUser, handleRefreshToken, logoutUser, getUserAuth } = require('../controllers/auth');
const router = Router();

// Register new user to database
router.post('/register', registerUser)
// Login user
router.post('/login', loginUser)
// Refresh token
router.get('/refresh', handleRefreshToken)
//Logout
router.get('/logout', logoutUser)
//get authentication on reload
router.get('/', getUserAuth)

module.exports = {
  router
}