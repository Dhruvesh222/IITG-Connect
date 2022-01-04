const mongoose = require('mongoose');
const schema = mongoose.Schema;

// const postSchema = new schema({
//     title:{
//         type:String,
//     },
//     post : {
//         type: String,
//     }
// })

const userSchema = new schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        min:10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    github: {
        type: String,
    },
    insta: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    facebook: {
        type: String,
    },
    degree: {
        type: String,
    },
    branch: {
        type: String,
    },
    roll : {
        type: Number,
    },
    followers: {
        type : Array,
        default : [],
    },
    following: {
        type : Array,
        default : [],
    },
    profile_image: {
        type: String,
        default : "default.png",
    },
    clubs : {
        type:Array,
    },
    skills : {
        type:Array
    },
    codeforces : {
        type : String,
    },
    codechef : {
        type : String,
    },
    contact:{
        type:String,
    },
    degYear : {
        type : Number,
    },
    birthdate : {
        type : String,
    }

},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User;




