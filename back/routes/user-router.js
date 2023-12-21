const Router = require('express')
const userController = require('../controllers/user-controller')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh/:refreshToken', userController.refresh)

module.exports = router