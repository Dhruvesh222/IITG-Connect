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



    passport.use(new GoogleStrategy({
        clientID: '329819064124-ilethg06apk1se237pg48jhspuluqdfu.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback: true
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null,profile);
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
      
}