class BasketController {
    async createBasket(req, res, next) {
        try {
            const { userId, id } = req.params
            const { percentCorrectQuestions, title, resultQuestions } = req.body
            console.log(userId, id, percentCorrectQuestions, title, resultQuestions)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BasketController()