const Blog = require('../models/mongo')
const User = require('../models/user')
const initialBlogs = [
    {
      "title": "June 13",
      "author": "Roshith Krishna P",
      "url": "www.google.com",
      "likes": 4
    },
    {
      "title": "Harry Potter and the lost Charm",
      "author": "J.K. Rowling",
      "url": "www.harry.com",
      "likes": 144
    },
    {
      "title": "Where Stars met Sun",
      "author": "John Joseph",
      "url": "www.wsms.com",
      "likes": 52
    }
  ]

  const nonExistingId = async() => {
    const nonExistingBlog = new Blog({content: 'will delete soon'})
    await nonExistingBlog.save()
    await nonExistingBlog.deleteOne()

    return nonExistingBlog._id.toString()
  }

  const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

  module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
  }