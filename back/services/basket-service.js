const { Basket, History } = require('../models/models')

class BasketService {
    async createBasket(userId, id, percentCorrectQuestions, title, resultQuestions) {
        const basket = await Basket.create({
            title: title,
            resultPercent: percentCorrectQuestions,
            userId: userId,
            typeId: id
        })
        await basket.save()
        for (let i = 0; i < resultQuestions.length; i++) {
            const history = await History.create({
                question: resultQuestions[i].question,
                status: resultQuestions[i].status,
                userId: userId,
                typeId: id,
                basketId: basket.id
            })
        }
        return { basket }
    }

    async getIdAllBasket(userId, typeId, limit, page) {
        if (limit == undefined) {
            limit = 12
        }

        if (page == undefined) {
            page = 1
        }

        let offset = page * limit - limit
        let baskets

        if (typeId === undefined) {
            baskets = await Basket.findAndCountAll({ limit: Number(limit), offset: Number(offset) })
        } else {
            baskets = await Basket.findAndCountAll({ where: { userId: userId, typeId: typeId } }, { limit: Number(limit), offset: Number(offset) })
        }
        return { baskets }
    }

    async getIdAllBasketHistory(basketId) {
        const histories = await History.findAll({ where: { basketId: basketId } })
        return { histories }
    }

    async deleteAll(userId) {
        await Basket.destroy({ where: { userId: userId } })
        await History.destroy({ where: { userId: userId } })
        if (limit == undefined) {
            limit = 12
        }

        if (page == undefined) {
            page = 1
        }

        let offset = page * limit - limit
        const baskets = await Basket.findAndCountAll({ limit: Number(limit), offset: Number(offset) })
        return { baskets }
    }
}

module.exports = new BasketService()