require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogRoutes')
const userRouter = require('./controllers/userRoutes')
const errorHandler = require('./utils/middleware')
const app = express()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)

console.log(config)
console.log('connecting to ',config.uri)

mongoose.connect(config.uri)
.then(result => console.log('Connected to Database Successfully'))
.catch(error => console.log('Error Connecting to Database', error))

mongoose.set('strictQuery', false)
app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use(errorHandler)

module.exports = app 