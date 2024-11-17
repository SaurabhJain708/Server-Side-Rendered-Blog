const mongoose = require('mongoose')
const users = require('../Models/usermodel')
const {setUser,getuser} = require('../Services/Auth')

function handlelogout(req,res){
    res.clearCookie("user")
    res.clearCookie("email")
    return res.redirect('/user/login')
}
function handleSignUpget(req,res){
   return res.render('SignUp')
}

function handleloginget(req,res){
    return res.render('Login')
 }

async function handleSignUppost(req,res){
    const alreadyuser = await users.findOne({email: req.body.email})
    const body = req.body

    if(!alreadyuser){
        try{
        const newuser = await users.create({
            name: body.name,
            profileimg: req.profileImg,
            email: body.email,
            password: body.password
        })
        res.status(201).send("User created successfully...")
        return res.redirect('/user/login')
    }catch(err){
        res.status(500).send("An error occured")
        console.log(err)
        res.redirect("/user/signup")
    }
    }
    else{
        return res.redirect("/user/login")
    }
}

async function handleuserloginpost(req,res){
    try{
    const realuser = await users.findOne({email: req.body.email})
    const body = req.body
    if(!realuser){
        return res.redirect('/user/signup')
    }
        const isMatch = realuser.verifyPassword(body.password)

        if(isMatch){
            const token = setUser(realuser)
            res.cookie("user",token)
            res.cookie("email",body.email) 
            req.user = realuser
            return res.redirect("/blogs/home")
        }else{
            res.render('Login',{
                err:" Invalid email or password"
            })
        }
    }catch(err){
        console.log(err)
        res.redirect('/user/login')
    }
}

module.exports = {
    handleSignUpget,
    handleloginget,
    handleSignUppost,
    handleuserloginpost,
    handlelogout
}