
/*
 * GET home page.
 */

exports.index = function(req, res){
  authenticated = req.isAuthenticated();
  if(authenticated) 
    res.redirect('/reader');
  else
    res.render('index', { title: appName, message: req.flash('error') });
};

exports.reader = function(req, res){
  authenticated = req.isAuthenticated();
  res.render('reader', { title: appName, user: {
                                              isLoggedIn: authenticated ,
                                              nickname: req.user.username,
                                              completename: req.user.name.first+" "+req.user.name.last
                                         } });
};


exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
};

exports.postlogin = function(req, res){
   res.redirect('/reader');
};
exports.signup = function(req, res){
  res.render('signup', { title: appName });
};
exports.postsignup = function(req, res){
   DB.createUser({
           name : { 
                  first: req.body.name
                , middle: req.body.middle 
                , last: req.body.last
           }           
           , type:  'user'
           , username: req.body.username
           , email: req.body.email
           , password: req.body.password
   }, function(err, userinfo){
          res.render('index', { title: appName });
   })

};