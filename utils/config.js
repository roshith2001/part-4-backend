require('dotenv').config()

const MONGODB_URI = process.env.MONGO_URI
const TEST_URI = process.env.TEST_URI
const PORT = process.env.PORT
const uri = 
    process.env.NODE_ENV === 'test' 
    ? 
        TEST_URI
        : 
        MONGODB_URI

module.exports = {
    uri,
    PORT
}