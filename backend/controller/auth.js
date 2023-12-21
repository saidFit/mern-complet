const Users = require('../models/auth')
const JwT   = require('jsonwebtoken')

// ? Create A token //
const CreateToken = (_id)=>{
    return JwT.sign({id:_id},process.env.JwT_SECRET)
}

const handleRegister = async(req,res) =>{
    const {firstName
           ,lastName
           ,email
           ,password
           ,imagePath
           ,friends
           ,location
           ,occupation
           ,viewedProfile
           ,impressions} = req.body
    try {

         const new_user =
          await Users.register (firstName
            ,lastName
            ,email
            ,password
            ,imagePath
            ,friends
            ,location
            ,occupation
            ,viewedProfile
            ,impressions
            )

         const token = CreateToken(new_user._id)
         res.status(200).json({new_user,token})   

    } catch (error) {
            res.status(400).json({error:error.message})
    }
}


const handleLogin  = async(req,res) =>{
     const {email,password} = req.body
    try {

        const user = await Users.login(email,password)
        const token = CreateToken(user._id)
        await delete user.password
        res.status(200).json({user,token})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}




module.exports = {handleRegister,handleLogin}