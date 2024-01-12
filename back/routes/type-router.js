const Router = require('express')
const typeController = require('../controllers/type-controller')

const router = new Router()

router.post('/:userId', typeController.createIdType)
router.get('/:userId', typeController.findAllIdTypes)
router.get('/:userId/:id', typeController.findOneIdType)
router.patch('/:id', typeController.updateIdType)
router.delete('/:id', typeController.destroyIdType)

module.exports = router