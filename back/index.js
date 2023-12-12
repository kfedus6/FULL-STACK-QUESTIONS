require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const models = require('./models/models')
const router = require('./routes/index')

const server = express(router)
const PORT = process.env.PORT || 5000

server.use(express.json())
server.use(cors())
server.use('/api', router)

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