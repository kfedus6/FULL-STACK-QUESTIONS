const Router = require('express')
const basketController = require('../controllers/basket-controller')

const router = new Router()

router.post('/:userId/:id', basketController.createBasket)
router.get('/', basketController.getIdAllBasket)
router.get('/history/:basketId', basketController.getIdAllBasketHistory)

module.exports = router