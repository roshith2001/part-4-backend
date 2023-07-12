const blogRouter = require('express').Router()

const Blog = require('../models/mongo')

blogRouter.post('/', async(req, res, next) => {
    const body = req.body

    if(!body.url || !body.title){
        return res.status(400).json({error: 'Missing Data'})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    const result = await blog.save()
    try{
        res.status(201).json(result)
    }
    catch(error){
        next(error)
    }
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

blogRouter.delete('/:id', async(req, res, next) => {
    const result = await Blog.findByIdAndDelete(req.params.id)
    try{
        return res.status(204).json(result)
    }
    catch(error){
        next(error)
    }
})

module.exports = blogRouter