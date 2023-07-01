require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogRoutes')
const errorHandler = require('./utils/middleware')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/blogs', blogRouter)
app.use(errorHandler)

module.exports = app 