const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGO_URI

console.log('connecting to ',uri)

mongoose.connect(uri)
.then(result => console.log('Connected to Database Successfully'))
.catch(error => console.log('Error Connecting to Database', error))

mongoose.set('strictQuery', false)

const blogScheme = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3
    },
    author: String,
    url: String,
    likes: Number
})

blogScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogScheme)



