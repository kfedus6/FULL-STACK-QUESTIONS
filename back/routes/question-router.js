const Router = require('express')
const questionController = require('../controllers/question-controller')

const router = new Router()

router.post('/:typeId', questionController.createIdQuestion)
router.get('/', questionController.findAllQuestions)
router.patch('/:id', questionController.updateIdQuestion)
router.delete('/:id', questionController.destroyIdQuestion)

module.exports = router