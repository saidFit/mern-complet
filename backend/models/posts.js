const mongoose = require('mongoose')

const {Schema} = mongoose;

const PostSchema = new Schema({

    userId:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userImagePath:{
        type:String,
        required:true
    },
    PostImagePath:{
        type:String,
    },
    likes:{
        type:Map,
        of:Boolean
    },
    comments:{
        type:Array,
        default:[]
    },
    discription:String,
    location: String,

},{timestamps:true})


module.exports = mongoose.model('post',PostSchema)