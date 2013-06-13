
/*
 * GET home page.
 */

exports.index = function(req, res){
  authenticated = req.isAuthenticated();
  if(authenticated) 
    res.redirect('/reader');
  else
    res.render('index', { title: appName});
};

exports.reader = function(req, res){
  authenticated = req.isAuthenticated();
  // console.log(req);
  res.render('reader', { title: appName, user: {
                                              isLoggedIn: authenticated ,
                                              nickname: req.user.username
                                         } });
};

exports.login = function(req, res){
  res.render('login', { title: appName, message: req.flash('error') });
};
exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
};

exports.postlogin = function(req, res){
   authenticated = req.isAuthenticated();
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