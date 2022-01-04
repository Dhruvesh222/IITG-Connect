const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

const passport = require('passport');
const { findById } = require('../models/User');


// Welcome Page
router.get('/',(req,res)=>{
    // console.log(req.user)
    // console.log(process.env.PORT);
    console.log(__dirname);
    req.session.isAuth = true;
    console.log(req.session.id);
    if(req.session.page_views){
        console.log("visited the page for ",req.session.page_views++);
        console.log(req.session.secret);
        console.log(req.session.cookie.maxAge);
    }else{
        req.session.page_views = 1;
        console.log("you visted the page for the first time");
    }
    res.render('index',{
        userinfo : req.user
    });
})

// Dashboard Page
router.get('/dashboard',ensureAuthenticated,async(req,res)=>{
    const user_id = req.user._id.toString();
    try{
        let postsarray = [];
        const allposts = await Post.find();
        allposts.forEach(post => {
            if(req.user.following.includes(post.user_id)){
                postsarray.push(post);
            }
        });
        postsarray.reverse();
        res.render('dashboard',{userinfo : req.user,postsarray});
    }catch(err){
        console.log(err);
    }
})


//google redirect
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users');
  });
module.exports = router;