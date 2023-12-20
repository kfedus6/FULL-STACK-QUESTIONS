const Router = require('express')
const typeController = require('../controllers/type-controller')

const router = new Router()

router.post('/:id', typeController.createIdType)
router.get('/', typeController.findAllIdTypes)
router.patch('/:id', typeController.updateIdType)
router.delete('/:id', typeController.destroyIdType)

module.exports = router