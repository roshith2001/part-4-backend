const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('when there is initially one user in the db', () => {
    beforeEach(async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('mykaad', 10)
        console.log(passwordHash)
        const userOne = new User({
            username: 'roshithkrishnap',
            name: 'Rishikesh',
            passwordHash
        })

        await userOne.save()
    })

    test('new user is added', async() => {
        const usersAtStart = await helper.usersInDb()
        console.log(usersAtStart)

        const newUser = {
            username: 'vikingKolathara',
            name: 'Kolathara Viking Club',
            password: 'AThingOfDestiny'
        }
        await api
        .post('/api/user')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        console.log(usersAtEnd)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const userNames = usersAtEnd.map(user => user.username)
        expect(userNames).toContain(newUser.username)
    })

    test('creates an error if a new user has existing username',async() => {

        const usersAtStart = await helper.usersInDb()

        const newUserWithSameUserName = {
            username: 'roshithkrishnap',
            name: 'Kolathara Viking Club',
            password: 'AThingOfDestiny'
        }
        const result = await api
        .post('/api/user')
        .send(newUserWithSameUserName)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(result.body.error).toContain("expected `username` to be unique")
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    afterAll(async() => {
        await mongoose.connection.close()
    })
})