const questionService = require("../services/question-service")

class QuestionController {
    async createIdQuestion(req, res, next) {
        try {
            const { typeId } = req.params
            const { question, answer } = req.body
            const questions = await questionService.createIdQuestion(question, answer, typeId)
            return res.json(questions)
        } catch (e) {
            next(e)
        }
    }

    async findAllQuestions(req, res, next) {
        try {
            let { typeId, limit, page } = req.query
            const questions = await questionService.findAllQuestion(typeId, limit, page)
            return res.json(questions)
        } catch (e) {
            next(e)
        }
    }

    async findAllIdQuestions(req, res, next) {
        try {
            const { id } = req.params
            const questions = await questionService.findAllIdQuestion(id)
            return res.json(questions)
        } catch (e) {
            next(e)
        }
    }

    async updateIdQuestion(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async destroyIdQuestion(req, res, next) {
        try {
            const { id } = req.params
            const { limit, page } = req.query
            const questions = await questionService.destroyIdQuestion(id, limit, page)
            return res.json(questions)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new QuestionController()