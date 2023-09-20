const blogRouter = require('express').Router()

const Blog = require('../models/mongo')
const User = require('../models/user')

blogRouter.post('/', async(req, res, next) => {
    const body = req.body
    const user = await User.findById(body.id)

    if(!body.url || !body.title){
        return res.status(400).json({error: 'Missing Data'})
    }

    const blog = new Blog({
        title: body.title, 
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const result = await blog.save()
    if (!user.blog) {
        user.blog = [];
    }
      
    user.blog = user.blog.concat(result._id);
    console.log(user.blog);
    await user.save()
    try{
        res.status(201).json(result)
    }
    catch(error){
        next(error)
    }
})

blogRouter.get('/', async(req, res, next) => {
    const result = await Blog.find({}).populate('user', {name: 1})
    try{
        res.json(result)
    }
    catch(error){
        next(error)
    }    
})

blogRouter.get('/:id', async(req, res, next) => {
    const result = await Blog.findById(req.params.id)
    try{
        if(result){
            res.json(result)
        }
    }
    catch(error){
        if (error.name === 'CastError') {
            // Handle invalid ID error
            return res.status(400).json({ error: 'Invalid ID' });
        next(error)
    }
} 
})

blogRouter.put('/:id', async(req, res, next) => {
    const body = req.body

    const updateContent = body
   

    await Blog.findByIdAndUpdate(req.params.id, updateContent, {new: true})
    try{
        const updatedBlogs = await Blog.find({})
        res.status(200).json(updatedBlogs)
    }
    catch(error){
        next(error)
    }
})

blogRouter.delete('/:id', async(req, res, next) => {
    const result = await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
})

module.exports = blogRouter