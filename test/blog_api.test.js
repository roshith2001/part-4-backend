const mongoose = require('mongoose')
const Blog = require('../models/mongo')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const blogs = [
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

beforeEach(async() => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
  blogObject = new Blog(blogs[2])
  await blogObject.save()
})

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

test.only('new blog detail is added to db', async() => {
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

  const response = await api.get('/api/blogs')
  const blogTitles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(blogs.length + 1)
  expect(blogTitles).toContain('Jupiter Mazha')
})

afterAll(async ()=> {
    await mongoose.connection.close()
})