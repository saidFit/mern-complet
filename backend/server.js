// TODO:import fondamentals //
const express     = require('express')
const bodyParser  = require('body-parser')
const mongoose    = require('mongoose')
const cors        = require('cors')
const dotenv      = require('dotenv')
const multer      = require('multer')
const helmet      = require('helmet')
const path        = require('path')
const { fileURLToPath } = require("url")

// TODO:VerifyToken//
const VerifyToken = require('./Middleware/VerifyToken')

dotenv.config()
// TODO:HandleController //
const { handleRegister } = require('./controller/auth')
const { CreateNewPost } = require('./controller/post')

// TODO:Routers //
const RouterAuth = require('./routers/auth')
const RouterUsers= require('./routers/users')
const RouterPosts= require('./routers/posts')


// TODO:middleware//
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname,'public/assets')))


// TODO:middleware routers//
app.use('/auth',RouterAuth)
app.use('/users',RouterUsers)
app.use('/post',RouterPosts)

// TODO:File Storage //
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,"public/assets")
    },
    filename:function (req,file,cb) {
        cb(null,file.originalname)
    }
})


// TODO:Upload images //
const upload = multer({ storage })
app.post('/auth/register',upload.single('image'),handleRegister)
app.post('/post/newPost',upload.single('image'),VerifyToken,CreateNewPost)



//TODO:connect to database //
const PORT      = process.env.PORT || 3003
const MONGO_URL = process.env.MONGO_URL
mongoose.set('strictQuery', true)
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server has Ported ${PORT}`))
}).catch((err) => {
    console.log(err)
})
