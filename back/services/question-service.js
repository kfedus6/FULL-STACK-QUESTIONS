const { Question, Type } = require('../models/models')
const ApiError = require('../errors/api-error')

class QuestionService {
    async createIdQuestion(question, answer, typeId) {
        const findType = await Type.findOne({ where: { id: typeId } })
        const newQuestion = await Question.create({
            question: question,
            answer: answer,
            typeId: findType.id
        })
        return { newQuestion }
    }
}

module.exports = new QuestionService()