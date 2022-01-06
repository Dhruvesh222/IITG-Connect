require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs'); 
const User = require('../models/User')

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
        // match user
        User.findOne({email:email})
        .then(user=>{
            if(!user){ 
                return done(null,false,{message:"This mail id is not registered"});
            }
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message:"Password is incorrect"});
                }
            })
        })
        .catch(err=>console.log(err))
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
      
}
