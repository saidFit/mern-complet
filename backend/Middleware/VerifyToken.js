const JwT = require('jsonwebtoken')


const VerifyToken  = async (req,res,next) =>{

    try {
        let token = req.header('Authorization')

        if(!token){
            return res.status(400).send('Authorization is required!')
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length)
        }
        const verified =    JwT.verify(token,process.env.JwT_SECRET) // TODO:return (id of user) if token has been verifing;
        req.user       = verified
        // console.log(req.user.id)
        next()
    } catch (error) {
        throw error
    }
}


module.exports = VerifyToken