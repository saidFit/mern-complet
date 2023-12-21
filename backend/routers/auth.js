const express = require('express')
const router  = express.Router()

// TODO:fucntion called //
const {handleLogin} =require('../controller/auth')
const VerifyToken = require('../Middleware/VerifyToken')

router.post('/login',VerifyToken,handleLogin)

module.exports = router;
