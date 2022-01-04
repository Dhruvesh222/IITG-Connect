const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const { findById } = require("../models/Post");
const multer = require('multer');
const path = require('path');
const { route } = require("./homeroutes");

router.use(express.static(__dirname+"./public/"));

const storage = multer.diskStorage({
  destination : (req,file,callback)=>{
    callback(null,'./public/profile_images');
  },
  filename : (req,file,callback)=>{
    callback(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
})

//middleware to upload images
const upload = multer({storage:storage}).single('profileImage_file'); 

router.post('/login_m',(req,res,next)=>{
  passport.authenticate("local", {
    successRedirect: "/users/profile_update",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
})

//login routes
router.route("/login")
  .get((req, res,next) => {
    res.render("login");
  })
  .post((req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/users/",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  });

//Register routes
router.route("/register")
  .get((req, res) => {
    res.render("register", { userinfo: req.userinfo });
  })
  .post((req, res,next) => {
    console.log(req.body);
    const {name,email,password,password2,} = req.body;
    let errors = [];
    // doing validation check
    if (!password && password.length < 6) {
      errors.push({ msg: "Password should be atleast 6 characters long" });
    }
    if (password !== password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (errors.length) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      //validation passed
      User.findOne({ email: email })
        .then((user) => {
          if (user) {
            errors.push({ msg: "this email is already registered" });
            res.render("register", {errors,name});
          } else {
            const newuser = new User({
              name,
              email,
              password: password
            });
            //hash password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newuser.password, salt, (err, hash) => {
                if (err) throw err;
                //set password to hashed
                newuser.password = hash;
                //save the user to the database
                newuser
                  .save()
                  .then((user) => {
                    req.flash(
                      "success_msg",
                      "You are now registered and can login"
                    );
                    // res.redirect("/users/login");
                    res.redirect(307,'/users/login_m');
                  })
                  .catch((err) => console.log(err));
              });
            });
          }
        })
        .catch((err) => console.log(err));
    }
  });

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "you have succesfully logged out");
  res.redirect("/users/login");
});

// profile route (only after login ensured)
router.get("/profile", ensureAuthenticated, (req, res) => {
  // res.render("profile", {
  //   userinfo: req.user,
  // });
  res.redirect(req.user.id);
});

// profile update route (only after login ensured)
router.get("/profile_update", ensureAuthenticated, (req, res) => {
  res.render("profile_update", {userinfo: req.user});
});

// update profile
router.post('/profile_update',ensureAuthenticated,(req,res)=>{
  const {roll,github,linkedin,insta,facebook,branch,degree,clubs,skills,contact,degYear,birthdate} = req.body;
  User.findByIdAndUpdate({_id:req.user.id},
    {
      $set: {
        roll,
        github: github,
      linkedin : linkedin,
      insta : insta,
      facebook,
      branch,
      degree,
      clubs,
      skills,
      contact,
      degYear,
      birthdate
      }
    }).then(result=>{
      console.log(result);
      req.flash("success_msg", "you have succesfully updated the profile");
      res.redirect('/users/profile')
    }).catch(err=>console.log(err))
})


router.post('/update_name',upload ,ensureAuthenticated,(req,res)=>{
  const {name,email} = req.body;
  let profile_image = 'default.png';
  if(req.file){
    profile_image = req.file.filename;
  }
  console.log(name);
  User.findByIdAndUpdate({_id:req.user.id},
    {
      $set: {
        name,
        email,
        profile_image
      }
    }, {
      upsert: true
    }).then(result=>{
      // console.log(result);
      req.flash("success_msg", "you have succesfully updated the profile");
      res.redirect('/users/profile_update')
    }).catch(err=>console.log(err))
})

router.post('/update_password',ensureAuthenticated,(req,res)=>{
  const {oldpassword,password,password1} = req.body;
  let errors = [];
  bcrypt.compare(oldpassword,req.user.password,(err,ismatched)=>{
    if(err){
      throw err
    }else if(ismatched){
      if(password===password1){
        bcrypt.hash(password,10,(err,hash)=>{
          User.findByIdAndUpdate({_id:req.user.id},
            {
              $set: {
                password:hash
              }
            }).then(result=>{
              // console.log(result);
              req.flash("success_msg", "you have succesfully updated the password");
              res.redirect('/users/profile')
            }).catch(err=>console.log(err))
        })
      }else{
        req.flash("error_msg","confirm password didn't matched");
        res.redirect('/users/profile');
      }
    }else{
      req.flash("error_msg","old password is wrong");
      res.redirect('/users/profile');
    }
  })
  
})


router.get('/',ensureAuthenticated,async (req,res)=>{
  let usersarray = await User.find()
  usersarray.sort((a,b)=>{
    return b.followers.length - a.followers.length;
  })
  // console.log(JSON.stringify(usersarray));
  // User.find().limit(3).toArray((err,usersarray)=>{
    return res.render('users',{userinfo:req.user,usersarray});
    // })
    // return res.send(JSON.stringify(usersarray));
})

router.get('/:id',ensureAuthenticated,async(req,res)=>{
  const view_id = req.params.id;
  const user_id = req.user._id.toString();
  try{
    const viewUser = await User.findById(view_id);
    const currentUser = await User.findById(user_id);
    if(viewUser){
      let follow = currentUser.following.includes(view_id);
      console.log(follow);
      res.render('peruser.ejs',{userinfo:req.user,viewUser,follow});
    }else{
      res.redirect('/dashboard');
    }
  }catch(err){
    console.log(err);
  }
})

router.get('/:id/followers',ensureAuthenticated,async(req,res)=>{
  const view_id = req.params.id;
  const user_id = req.params.id.toString();
  try{
    let followersarray = [];
    const viewUser = await User.findById(view_id);
    const currentUser = await User.findById(user_id);
    const users = await User.find();
    if(viewUser){
      users.forEach(element=>{
        if(viewUser.followers.includes(element._id)){
          followersarray.push(element);
        }
      })
      console.log(followersarray);
      res.render('follow',{userinfo:req.user,viewUser,usersarray:followersarray,follow:"followers"});
    }else{
      res.redirect('/dashboard');
    }
  }catch(err){
    console.log(err);
  }
})

router.get('/:id/followings',ensureAuthenticated,async(req,res)=>{
  const view_id = req.params.id;
  const user_id = req.params.id.toString();
  try{
    let followersarray = [];
    const viewUser = await User.findById(view_id);
    const currentUser = await User.findById(user_id);
    const users = await User.find();
    if(viewUser){
      users.forEach(element=>{
        if(viewUser.following.includes(element._id)){
          followersarray.push(element);
        }
      })
      res.render('follow',{userinfo:req.user,viewUser,usersarray:followersarray,follow:"followings"});
    }else{
      res.redirect('/dashboard');
    }
  }catch(err){
    console.log(err);
  }
})

router.post('/:id/follow',ensureAuthenticated,async (req,res)=>{
  const view_id = req.params.id;
  const user_id = req.user._id.toString();
  console.log(view_id);
  console.log(user_id);
  try{
    const viewUser = await User.findById(view_id);
    const currentUser = await User.findById(user_id);
    console.log(viewUser);
    console.log(currentUser);
    if(!currentUser.following.includes(view_id)){
      await currentUser.updateOne({$push: {following : view_id}});
      await viewUser.updateOne({$push: {followers : user_id}});
      req.flash("success_msg","u started following "+viewUser.name);
    }
    res.redirect('/users/'+view_id);
  }catch(err){ 
    console.log(err);
  }
})

router.post('/:id/unfollow',ensureAuthenticated,async (req,res)=>{
  const view_id = req.params.id;
  const user_id = req.user._id.toString();
  try{
    const viewUser = await User.findById(view_id);
    const currentUser = await User.findById(user_id);
    if(currentUser.following.includes(view_id)){
      await currentUser.updateOne({$pull: {following : view_id}});
      await viewUser.updateOne({$pull: {followers : user_id}});
      req.flash("success_msg","u unfollowed "+viewUser.name);
    }
    res.redirect('/users/'+view_id);
  }catch(err){ 
    console.log(err);
  }
})


router.get('/:id/posts/',ensureAuthenticated,async(req,res)=>{
  const view_id = req.params.id;
  const user_id = req.user._id;
  let postsarray = [];
  try{
      const viewUser = await User.findById(view_id);
      const posts = await Post.find();
      posts.forEach(element => {
          if(element.user_id==view_id){
            postsarray.push(element);
          }
      });
      postsarray.reverse();
      // console.log(posts);
      res.render("peruserpost",{userinfo:req.user,postsarray,viewUser});
  }catch(err){
      console.log(err);
  }
})

module.exports = router;

// const {email,password} = req.body;
// let errors = [];
// console.log(req.body);
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//         User.findOne({email:email,password:hash})
//         .then((user)=>{
//             if(user){
//                 res.send('dashboard');
//             }else{
//                 errors.push({msg:"invalid email/password"});
//                 res.render('login',{errors})
//             }
//         })
//         .catch(err=>console.log(err))
//     })
// })
