const users = require('../Models/usermodel')
const {getuser}= require('../Services/Auth')

function onlyauthuser(req,res,next){
    try{
    const user = getuser(req.cookies?.user)
    if(!user){
        return res.redirect("/user/login")
    }
    next()
}catch(err){
    return res.redirect("/user/login")
}
}

function adminauth(roles){
    return async function (req,res,next){
        try{
        const userrole = await users.findOne({email:req.cookies?.email})
        if(roles.includes(userrole.role)){
           return next()
        }else{
           return res.render("You are UnAuthorised to view this page")
        }
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = {
    onlyauthuser,
    adminauth,
}