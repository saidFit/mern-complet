const Posts = require('../models/posts')
const Users = require('../models/auth')
const { post } = require('../routers/auth')


// TODO:getAllPosts //
const GetAllPosts = async(req,res) =>{
    try {
         const posts = await Posts.find()
         res.status(200).json(posts)
    } catch (error) {
         res.status(404).json({error:error.message})
    }
}

// TODO:getSingleUser
const GetSingleUser = async(req,res) =>{
    const {userId} = req.params
    try {
         const user = await Users.findOne({userId})
         const posts= await Posts.find({userId})
         res.status(200).json({user,posts})

    } catch (error) {
         res.status(401).json({error:error.message})
    }
}
// TODO:PostNewPost//
const CreateNewPost = async(req,res) =>{
     const {userId,discription,PostImagePath} = req.body
    try {
        const user = await Users.findById(userId)
        const newPost = new Posts({
            userId,
            firstName:user.firstName,
            lastName :user.lastName,
            userImagePath:user.imagePath,
            PostImagePath:PostImagePath,
            likes:{},
            comments:[],
            discription:discription,
            location:user.location
        })
        await newPost.save()

        const posts = await Posts.find({})
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// TODO:updateLikes//

const UpdateLikes = async(req,res) =>{
    const {PostId,userId} = req.params;

    try {
        const postLiked    = await Posts.findById(PostId)
        const userMakeLike = await Users.findById(userId)
        const IsLiked      = postLiked.likes.get(userId)

        if(IsLiked){
            console.log(true)
            postLiked.likes.delete(userId)
        }else{
            console.log(false)
            postLiked.likes.set(userId,true)
        }

        const PostUpdated = await Posts.findByIdAndUpdate(
            PostId,
            {likes:postLiked.likes},
            {new:true}

        )
        res.status(200).json(PostUpdated)

    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


// TODO:UpdateComment //

const UpdateComment = async(req,res) =>{
       console.log(req.user)
       const {PostId,userId} = req.params
       const {comment} = req.body
    try {
          const Post            = await Posts.findById(PostId)
          const userMakeComment = await Users.findById(userId)
          const {firstName,lastName,imagePath} = userMakeComment
          const UserFormat = {firstName,lastName,imagePath,comment}

          Post.comments.push(UserFormat)
        //   await Post.save()
        await Posts.findByIdAndUpdate(
            PostId,
            {comments:Post.comments}
        )
          const posts = await Posts.find()
          res.status(200).json(posts)
    } catch (error) {
        
    }
}








module.exports =
 {
    CreateNewPost,
    UpdateLikes,
    GetAllPosts,
    GetSingleUser,
    UpdateComment
}