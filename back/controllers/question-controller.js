const questionService = require("../services/question-service")

class QuestionController {
    async createIdQuestion(req, res, next) {
        try {
            const { typeId } = req.params
            const { question, answer } = req.body
            const newQuestion = await questionService.createIdQuestion(question, answer, typeId)
            return res.json(newQuestion)
        } catch (e) {
            next(e)
        }
    }

    async findAllIdQuestions(req, res, next) {
        try {

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

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new QuestionController()