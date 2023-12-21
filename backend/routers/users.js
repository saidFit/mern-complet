const express = require('express')
const {AddRemoveFriend} = require('../controller/users')
const VerifyToken = require('../Middleware/VerifyToken')
const router  = express.Router()



router.put('/updateFriends/:id/:friendId',VerifyToken,AddRemoveFriend)




module.exports = router;