const basketService = require("../services/basket-service")

class BasketController {
    async createBasket(req, res, next) {
        try {
            const { userId, id } = req.params
            const { percentCorrectQuestions, title, resultQuestions } = req.body
            const basket = await basketService.createBasket(userId, id, percentCorrectQuestions, title, resultQuestions)
            return res.json(basket)
        } catch (e) {
            next(e)
        }
    }

    async getIdAllBasket(req, res, next) {
        try {
            let { userId, typeId, limit, page } = req.query
            const baskets = await basketService.getIdAllBasket(userId, typeId, limit, page)
            return res.json(baskets)
        } catch (e) {
            next(e)
        }
    }

    async getIdAllBasketHistory(req, res, next) {
        try {
            const { basketId } = req.params
            const histories = await basketService.getIdAllBasketHistory(basketId)
            return res.json(histories)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BasketController()