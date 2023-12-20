const Router = require('express')
const questionController = require('../controllers/question-controller')

const router = new Router()

router.post('/:id', questionController.createIdQuestion)
router.get('/:id', questionController.findAllIdQuestions)
router.patch('/:id', questionController.updateIdQuestion)
router.delete('/:id', questionController.destroyIdQuestion)

module.exports = router