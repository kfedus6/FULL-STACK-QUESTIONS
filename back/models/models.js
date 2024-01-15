const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true },
})

const Question = sequelize.define('question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question: { type: DataTypes.STRING, unique: true },
    answer: { type: DataTypes.TEXT, unique: true }
})

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, require: true }
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    resultPercent: { type: DataTypes.STRING }
})

const History = sequelize.define('history', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN }
})

User.hasMany(Type)
Type.belongsTo(User)

User.hasMany(Token)
Token.belongsTo(User)

User.hasMany(Basket)
Basket.belongsTo(User)

Type.hasMany(Question)
Question.belongsTo(Type)

Type.hasMany(Basket)
Basket.belongsTo(Type)

User.hasMany(History)
History.belongsTo(User)

Type.hasMany(History)
History.belongsTo(Type)

Basket.hasMany(History)
History.belongsTo(Basket)

module.exports = { User, Type, Question, Token, Basket, History }