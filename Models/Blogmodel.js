const mongoose = require('mongoose')
const users = require('./usermodel')

const blogSchema = new mongoose.Schema({
    Visits: [],
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: users,
        required:true
    },
    image:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
        maxlength: 20,
    },
    content:{
        type: String,
        required: true,
        maxlength: 95,
    },
},{timestamps: true})

const blogs = mongoose.model('blogs',blogSchema)

module.exports = blogs;