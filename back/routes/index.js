const Router = require('express')
const userRouter = require('./user-router')
const typeRouter = require('./type-router')
const questionRouter = require('./question-router')

const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/question', questionRouter)

module.exports = router