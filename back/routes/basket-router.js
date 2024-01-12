const Router = require('express')
const basketController = require('../controllers/basket-controller')

const router = new Router()

router.post('/:userId/:id', basketController.createBasket)

module.exports = router