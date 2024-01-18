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

    async getIdAllBasket(userId) {
        const baskets = await Basket.findAll({ where: { userId: userId } })
        return { baskets }
    }

    async getIdAllBasketHistory(basketId) {
        const histories = await History.findAll({ where: { basketId: basketId } })
        return { histories }
    }
}

module.exports = new BasketService()