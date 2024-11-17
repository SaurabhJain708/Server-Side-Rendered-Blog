const express = require('express')
const app = express()
const port = 3000
const {router} = require('./Routes/userroutes')
const blogrouter = require('./Routes/routes')
const cookieParser = require('cookie-parser');
const ConnectMongodb = require('./Connections/mongoconnection')
const { onlyauthuser } = require('./Middlewares/usermiddlewares')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const mongoURI = process.env.MONGO_URI;
ConnectMongodb(mongoURI)
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use("/user",router)
app.use("/blogs",onlyauthuser,blogrouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})