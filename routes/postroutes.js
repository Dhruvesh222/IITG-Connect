const express = require("express");
const Post = require('../models/Post');
const User = require('../models/User');
const { ensureAuthenticated } = require("../config/auth");
const { findOne } = require("../models/Post");
const router = express.Router();

// create a post
router.get('/',ensureAuthenticated,(req,res)=>{
    res.render("create_post",{userinfo:req.user,postinfo:undefined});
})

router.post('/',ensureAuthenticated,(req,res)=>{
    const {title,description} = req.body;
    // console.log(req.body);
    const author = req.user.name;
    const user_id = req.user._id;
    const date = Date;
    const newpost = new Post({title,description,user_id,author});
    newpost.save()
    .then(post=>{
        // console.log(post);
        req.flash("success_msg","your blog has been posted successfully");
        res.redirect('/users/'+req.user._id.toString()+"/posts");
    }).catch(err=>{
        console.log("err is ",err);

    })
})



router.get('/:id',ensureAuthenticated,async(req,res)=>{
    const post_id = req.params.id;
    try{
        const post = await Post.findById(post_id);
        const view_id = post.user_id;
        const viewUser = await User.findById(view_id);
        // console.log(post);
        res.render("postdetails",{userinfo:req.user,post,viewUser});
    }catch(err){
        console.log(err);
    }
})

router.get('/:id/update',ensureAuthenticated,async(req,res)=>{
    const post_id = req.params.id;
    try{
        const post = await Post.findById(post_id);
        const view_id = post.user_id;
        if(view_id!=req.user._id){
            req.flash("error_msg","you cannot update this post");
            res.redirect("/posts/"+post_id);
        }
        // const viewUser = await User.findById(view_id);
        // console.log(post);
        res.render("create_post",{userinfo:req.user,postinfo:post});
    }catch(err){
        console.log(err);
    }
})

router.post('/:id/update',ensureAuthenticated,async(req,res)=>{
    const post_id = req.params.id;
    try{
        const post = await Post.findById(post_id);
        const view_id = post.user_id;
        if(view_id!=req.user._id){
            req.flash("error_msg","you cannot update this post");
            res.redirect("/posts/"+post_id);
        }
        await post.updateOne({$set:req.body});
        req.flash("succcess_msg","U have successfully updated the post");
        res.redirect("/posts/"+post_id);
    }catch(err){
        console.log(err);
    }
})

router.post('/:id/delete',ensureAuthenticated,async(req,res)=>{
    const post_id = req.params.id;
    const user_id = req.user._id.toString();
    try{
        const post = await Post.findById(post_id);
        const view_id = post.user_id;
        if(view_id!=req.user._id){
            req.flash("error_msg","you cannot delete this post");
            res.redirect("/posts/"+post_id);
        }
        await post.deleteOne();
        req.flash("success_msg","U have successfully deleted the post");
        res.redirect("/users/"+user_id+"/posts");
    }catch(err){
        console.log(err);
    }
})





// update a post
// get a post 
// get timeline
// delete a post
//  


module.exports = router;
