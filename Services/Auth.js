const jwt = require('jsonwebtoken');
const secret = "6875675475"
function setUser(user){
    const payload = {user}
   return jwt.sign(payload,secret)
}

function getuser(token){
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getuser
}   