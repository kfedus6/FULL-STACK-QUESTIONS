const { Type, User } = require('../models/models')
const ApiError = require('../errors/api-error')

class TypeService {
    async createIdType(title, userId) {
        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            next(ApiError.unauthorized('Unauthorized user'))
        }
        const auditTitle = await Type.findOne({ where: { title: title } })
        if (auditTitle) {
            if (title === auditTitle.title) {
                next(ApiError.badRequest(`The ${title} already exists`))
            }
        }
        const type = await Type.create({
            title: title,
            userId: userId
        })
        type.save()
        const types = await Type.findAll({ where: { userId: userId } })
        return { types }
    }

    async findAllIdType(userId) {
        const types = await Type.findAll({ where: { userId: userId } })
        return { types }
    }

    async findOneIdType(userId, id) {
        const type = await Type.findOne({ where: { id: id } })
        return { type }
    }
}

module.exports = new TypeService()