const mongoose = require('mongoose')
require('./config')

const productSchema =  new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const product = mongoose.model('users',productSchema)

module.exports = product  