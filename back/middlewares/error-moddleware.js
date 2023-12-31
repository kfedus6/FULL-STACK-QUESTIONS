const ApiError = require('../errors/api-error')

module.exports = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Error Server' })
}