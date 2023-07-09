const blogRouter = require('express').Router()

const Blog = require('../models/mongo')

blogRouter.post('/', (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
    .then(result => res.status(201).json(result))
    .catch(error => next(error))
})

blogRouter.get('/', async(req, res, next) => {
    const result = await Blog.find({})
    try{
        res.json(result)
    }
    catch(error){
        next(error)
    }    
})

blogRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(result => res.status(201).json(result))
    .catch(error => next(error))
})

module.exports = blogRouter