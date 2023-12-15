require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const models = require('./models/models')
const errorMiddleware = require('./middlewares/error-moddleware')
const router = require('./routes/index')

const server = express(router)
const PORT = process.env.PORT || 5000

server.use(express.json())
server.use(cookieParser())
server.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
server.use('/api', router)
server.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()