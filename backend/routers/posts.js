const express = require('express')
const { UpdateLikes, GetSingleUser, GetAllPosts, UpdateComment } = require('../controller/post')
const VerifyToken = require('../Middleware/VerifyToken')
const router  = express.Router()



// TODO:REST API handle//
router.get('/getPosts',VerifyToken,GetAllPosts)
router.get('/getSingleUser/:userId',VerifyToken,GetSingleUser)
router.put('/updateLikes/:PostId/:userId',VerifyToken,UpdateLikes)
router.put('/updateComments/:PostId/:userId',VerifyToken,UpdateComment)

module.exports = router