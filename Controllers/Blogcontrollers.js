const blogs = require('../Models/Blogmodel')
const users = require('../Models/usermodel')

 async function handlehomeget(req,res){
    const data = await blogs.find({})
    return res.render("home",{
        bloglist:data
    })
}

async function handleblogpost(req,res){
    const user = await users.findOne({email: req.cookies?.email})
    const body = req.body
    try{
    const newblog = await blogs.create({
        createdby: user._id,
        image: req.imageId,
        title: body.title,
        content: body.content
    })
    return res.render("BlogCreate",{
        msg:"Blog created successfully." 
    })
}catch(err){
    return res.render("BlogCreate",{
        msg:"Try Again..."
    })
} 
}

function handleblogget(req,res){
    return res.render('Blogcreate')
}

async function handleblogvisit(req,res){
    const blog = await blogs.findOne({_id: req.params.id})
    const author = blog.createdby
    const user = await users.findOne({_id: author})
    res.render('Blog',{
        blog: blog,
        user: user
    })
}

module.exports = {
    handlehomeget,
    handleblogget,
    handleblogpost,
    handleblogvisit
}