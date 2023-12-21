const mongoose = require('mongoose')
const bcrypt   = require('bcrypt')
const {Schema} =mongoose


const AuthenticationSchema  = new Schema({

    firstName:{
        type:String,
        required:true,
        min:4,
        max:15
    },
    lastName:{
        type:String,
        required:true,
        min:4,
        max:15
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    imagePath:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number

},{timestamps:true})



AuthenticationSchema.statics.register = async function

 (  firstName
    ,lastName
    ,email
    ,password
    ,imagePath
    ,friends
    ,location
    ,occupation
    ,viewedProfile
    ,impressions
    
    ){

    try {
        const user = await this.findOne({email})
         if(user){
            
            throw Error('this email already used...')
         }
         const salt = await bcrypt.genSalt()
         const hashPassword = await bcrypt.hash(password,salt)
         const new_user = await this.create({
            firstName
            ,lastName
            ,email
            ,password:hashPassword
            ,imagePath
            ,friends
            ,location
            ,occupation
            ,viewedProfile:Math.floor(Math.random() * 10000)
            ,impressions:Math.floor(Math.random() * 10000)
         })
         
         return new_user

    } catch (error) {
         throw error
    }

}


AuthenticationSchema.statics.login = async function (email,password) {

    try {
        
        const user = await this.findOne({email})
        if(!user){
            throw Error('this email not exist')
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            throw Error('this password not match')
        }
        return user

    } catch (error) {
        throw error
    }
}


module.exports = mongoose.model('user',AuthenticationSchema)