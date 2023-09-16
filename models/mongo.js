const mongoose = require('mongoose')

const blogScheme = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3
    },
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
})

blogScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogScheme)



