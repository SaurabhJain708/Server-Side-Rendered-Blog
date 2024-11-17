const express = require('express')
const blogrouter = express.Router()
const {adminauth}= require('../Middlewares/usermiddlewares')
const {handleblogget,handleblogpost,handlehomeget,handleblogvisit} = require('../Controllers/Blogcontrollers')
const {uploads} = require('../Middlewares/multer')

blogrouter.get('/home',handlehomeget)
blogrouter.get('/create',handleblogget)
blogrouter.post('/create',uploads.single('image'),handleblogpost)
blogrouter.get('/view/:id',handleblogvisit)
module.exports = blogrouter;