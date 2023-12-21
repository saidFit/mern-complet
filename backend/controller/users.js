const Users = require('../models/auth')



const AddRemoveFriend = async(req,res) =>{
   const {id} = req.params
   const {friendId} = req.params

   try {
    
        const user      = await Users.findById({_id:id})
        const friend_db = await Users.findById({_id:friendId})
        const friend    =   user.friends.find((friend) => friend._id == friendId)

        if(friend){
         console.log('true')
         user.friends = user.friends.filter(friend => friend._id != friendId)

        }else{
         const {_id,firstName,lastName,email,imagePath,location,occupation} = friend_db
         const FormattedFriend = {_id,firstName,lastName,email,imagePath,location,occupation}
          user.friends.push(FormattedFriend)
        }

        await user.save()
        res.status(200).json(user)
   } catch (error) {
      
      res.status(400).json({error:error.message})
   }

}



module.exports = {AddRemoveFriend};