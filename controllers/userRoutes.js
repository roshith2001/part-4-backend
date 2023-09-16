const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async(req,res, next) => {
    const {username, name, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    try{
        const newUserSaved = await newUser.save()
        res.status(201).json(newUserSaved)
    }
    catch(error){
        next(error)
    }
})

userRouter.get('/', async(req,res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

module.exports = userRouter
