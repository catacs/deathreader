
var passport = require('passport');
var index = require('./routes/index');
var auth = require('./authentication');

module.exports = function(server) {
    
    server.get('/', index.index);
    server.get('/logout', index.logout);
    server.get('/reader', passport.ensureAuthenticated, index.reader);
    server.post('/',  passport.authenticate('local', 
                                              {failureRedirect: '/',
                                               failureFlash: true,
                                               badRequestMessage: 'Please fill all values'
                                               }),
                                               index.postlogin);
    server.get('/signup', index.signup);
    server.post('/signup', index.postsignup);
    
    //authetication
    server.get('/auth/google', passport.authenticate('google'));
    server.get('/auth/google/return', passport.authenticate('google', 
                                    { 
                                        successRedirect: '/reader',
                                        failureRedirect: '/' 
                                    }));
    server.get('/auth/facebook', passport.authenticate('facebook'));
    server.get('/auth/facebook/return', passport.authenticate('facebook', 
                                    { 
                                        successRedirect: '/reader',
                                        failureRedirect: '/' 
                                    }));
    server.get('/auth/twitter', passport.authenticate('twitter'));
    server.get('/auth/twitter/return', passport.authenticate('twitter', 
                                    { 
                                        successRedirect: '/reader',
                                        failureRedirect: '/' 
                                    }));
    server.get('*', function(req, res){
        res.render(404);
    });
}