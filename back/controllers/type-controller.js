const typeService = require("../services/type-service")

class TypeController {
    async createIdType(req, res, next) {
        try {
            const { title } = req.body
            const { userId } = req.params
            const type = await typeService.createIdType(title, userId)
            return res.json(type)
        } catch (e) {
            next(e)
        }
    }

    async findAllIdTypes(req, res, next) {
        try {
            const { userId } = req.params
            const types = await typeService.findAllIdType(userId)
            return res.json(types)
        } catch (e) {
            next(e)
        }
    }

    async findOneIdType(req, res, next) {
        try {
            const { userId, id } = req.params
            const type = await typeService.findOneIdType(userId, id)
            return res.json(type)
        } catch (e) {
            next(e)
        }
    }

    async updateIdType(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async destroyIdType(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TypeController()