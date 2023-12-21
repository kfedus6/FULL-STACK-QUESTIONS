const ApiError = require('../errors/api-error')
const tokenService = require('../services/token-service')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorized('Користувач не авторизований'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized('Користувач не авторизований'));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorized('Користувач не авторизований'));
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorized('Користувач не авторизований'));
    }
}