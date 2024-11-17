const express = require('express')
const router = express.Router()
const {profuploads} = require('../Middlewares/multer')
const {handleSignUpget,handleloginget,handleSignUppost,handleuserloginpost,handlelogout} = require("../Controllers/controllers.js")

router.get("/signup",handleSignUpget)
router.post("/signup",profuploads.single('image'),handleSignUppost)
router.get("/login",handleloginget)
router.post("/login",handleuserloginpost) 
router.post("/logout",handlelogout)

module.exports={
    router
}  