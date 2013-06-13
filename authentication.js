
// dependencies for authentication

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./models/user');


passport.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { 
    req.username=req.param('email');
    return next(); 
  }
  res.redirect('/login');
}


// Define local strategy for Passport
passport.use(new LocalStrategy({
    usernameField : 'username'
}, function(username, password, done) {
        console.log('localStrategy')
        User.authenticate(username, password, function(err, user,info) {
            if(!user)
               return done(err, user,info.message);
            else
                return done(err, user);
        });
}));


// serialize user on login
passport.serializeUser(function(user, done) {
    done(null, user.id);
});


// deserialize user on logout
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
      console.log(identifier)
      console.log(profile)
      done(null, null);
    /*User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });*/
  }
));


passport.use(new FacebookStrategy({
    clientID: "reader_facebook_nodejs",
    clientSecret: "reader_facebook_secretid_739d986940ccfc497095a777d8f28fe6",
    callbackURL: "http://localhost:3000/auth/facebook/return"
  },
  function(accessToken, refreshToken, profile, done) {
    /*User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });*/
  }
));

passport.use(new TwitterStrategy({
    consumerKey: "reader_twitter_nodejs",
    consumerSecret: "reader_twitter_secretid_739d986940ccfc497095a777d8f28fe6",
    callbackURL: "http://localhost:3000/auth/twitter/return"
  },
  function(token, tokenSecret, profile, done) {
    /*User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });*/
  }
));