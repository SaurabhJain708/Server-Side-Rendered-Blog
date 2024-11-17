const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    profileimg:{
        type: String,
        default:"../public/images/download.png"
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        enum: ["NORMAL","ADMIN"],
        default: "NORMAL"
    },
    salt:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    }
}, {timestamps: true})

userSchema.pre('save',function(next){
    const user = this
    if (!user.isModified('password')) return next();
    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = crypto
        .pbkdf2Sync(user.password, user.salt, 10000, 64, 'sha512')
        .toString('hex');

    next();
})

userSchema.methods.verifyPassword = function (inputPassword) {
    const hashedInputPassword = crypto
        .pbkdf2Sync(inputPassword, this.salt, 10000, 64, 'sha512')
        .toString('hex');
    return this.password === hashedInputPassword;
};
const users = mongoose.model('users',userSchema)

module.exports = users;