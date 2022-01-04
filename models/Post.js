const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    user_id : {
        type: String,
        required : true,
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    author:{
        type: String,
    }
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;