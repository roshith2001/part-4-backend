const Blog = require('../models/mongo')
const initialBlogs = [
    {
      "title": "June 13",
      "author": "Roshith Krishna P",
      "url": "www.google.com",
      "likes": 4,
      "id": "649dc47babf23115bcc6c5f4"
    },
    {
      "title": "Harry Potter and the lost Charm",
      "author": "J.K. Rowling",
      "url": "www.harry.com",
      "likes": 144,
      "id": "649eaf016b5783a62e134c33"
    },
    {
      "title": "Where Stars met Sun",
      "author": "John Joseph",
      "url": "www.wsms.com",
      "likes": 52,
      "id": "649eafc26b5783a62e134c35"
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

  module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
  }