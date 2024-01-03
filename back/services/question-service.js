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

    async findAllQuestion(typeId, limit, page) {
        if (limit == undefined) {
            limit = 8
        }

        if (page == undefined) {
            page = 1
        }

        let offset = page * limit - limit
        let questions

        if (typeId === undefined) {
            questions = await Question.findAndCountAll({ limit: Number(limit), offset: Number(offset) })
        } else {
            questions = await Question.findAndCountAll({ where: { typeId: typeId } }, { limit: Number(limit), offset: Number(offset) })
        }

        return { questions }
    }

    async findAllIdQuestion(id) {
        const questions = await Question.findAll({ where: { typeId: id } })
        return { questions }
    }

    async destroyIdQuestion(id, limit, page) {
        await Question.destroy({ where: { id: id } })

        if (limit == undefined) {
            limit = 8
        }

        if (page == undefined) {
            page = 1
        }

        let offset = page * limit - limit

        const questions = await Question.findAndCountAll({ limit: Number(limit), offset: Number(offset) })
        return { questions }
    }
}

module.exports = new QuestionService()