const mongoose = require('mongoose')
const Blog = require('../models/mongo')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('getting all blogs', ()=>{
  test('blogs are returned in json', async() => {
    await api
    .get('/api/blogs') 
    .expect(200)
    .expect('Content-Type', /application\/json/) 
  })
  
  test('check id to be defined', async() => {
    const response = await api.get('/api/blogs')
    const body = response.body
  
    body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('blogs returned with a specofoc id', () => {
  test('returning a blog with specified id', async() => {
    const blogsFromDB = await helper.blogsInDb()
    const blogToGet = blogsFromDB[0]
    await api.get(`/api/blogs/${blogToGet.id}`)
    .expect(200)
  })
})

describe('insering blogs to db', () => {
  test('new blog detail is added to db', async() => {
    const newBlog = {
      "title": "Jupiter Mazha",
      "author": "Roshith Krishna P",
      "url": "www.karikku.com",
      "likes": 94,
      "id": "649dc47adbf93115bcc6c5f4"
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    const blogTitles = blogsAtEnd.map(r => r.title)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogTitles).toContain('Jupiter Mazha')
  })
  
  test('Like is given in the new data', async() => {
    const newBlogWithoutLikes = {
      "title": "Jupiter Mazha",
      "author": "Roshith Krishna P",
      "url": "www.karikku.com",
      "id": "649dc47adbf93115bcc6c5f4"
    }
  
    const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    expect(response.body.likes).toBe(0)
  })
  
  
  test('Title and URL is not given in the new data', async() => {
    const newBlogWithMissingData = {
      "author": "Roshith Krishna P",
      "likes": 98,
      "id": "649dc47adbf93115bcc6c5f4"
    }
  
    const response = await api
    .post('/api/blogs')
    .send(newBlogWithMissingData)
    .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('updating a blog', () => {
  test('upadting a blog with valid id', async() => {
    const blogFromDB = await helper.blogsInDb()
    const blogToUpdate = blogFromDB[0]
    const toUpdate = {
      likes: 12
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(toUpdate)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    console.log(updatedBlog)
    expect(updatedBlog.likes).not.toBe(blogToUpdate.likes)
  })
})

describe('deleting a blog', () => {
  test('deleting a blog with valid id', async() => {
    const blogFromDB = await helper.blogsInDb()
    const blogToDelete = blogFromDB[0]
    console.log(blogToDelete)
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const content = blogsAtEnd.map(result => result.title)
    expect(content).not.toContain(blogToDelete.title)
  })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})