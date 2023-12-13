const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../errors/api-error')
const tokenService = require('./token-service')

class UserService {
    async registration(nickname, email, password) {
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            throw ApiError.badRequest(`There is a user with an email ${email}`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({ nickname: nickname, email: email, password: hashPassword })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            throw ApiError.badRequest(`User with this email ${email} was not found`)
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            throw ApiError.badRequest('Wrong password')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized('Unauthorized user')
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized('Unauthorized user')
        }
        const user = await User.findOne({ where: { id: userData.id } })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService()