var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User =  require('./models/user');

// connect to database
module.exports = {

    // initialize DB
    open : function(dbToUse) {
        mongoose.connect(dbToUse, function(err)
          {
              if(err) 
                  log.trace(err);
          });
        // Event when connected to mongoDB
        mongoose.connection.on('open', function() {
            log.info('We have connected to mongodb');
        });
        // Event when connecting to mongoDB
        mongoose.connection.on('connecting', function() {
            log.info('We are connecting to mongodb');
        });
        //Event when disconnecting from mongodb
        mongoose.connection.on('disconnecting', function() {
            log.info('We are disconnecting from mongodb');
        });
        //event when disconnected from mongodb
        mongoose.connection.on('disconnected', function() {
            log.info('We are disconnected from mongodb');
        });


    },
    // disconnect from database
    close : function() {
        mongoose.disconnect();
    },
    
    createUser: function(userInfo, cb){
        var userToSave =  new User(userInfo);

        userToSave.save(function(err) {
            if(err) {
                log.error('User: Failed ' + userInfo.email+" \n"+err);
                return cb(err, null);
            }
            else {
                log.info('User: added ' + userInfo.email);
                return cb(null, userInfo); 
            }
        });
    },
    getUser: function(userinfo, cb){
        
    },
    updateUser:  function(userinfo, cb){
        
    },
    deleteUser: function(userinfo, cb){
        
    },
    createFeedURL: function(url, user, cb){
        
    },
    getFeedURL: function(url, user, cb){
        
    },
    updateFeedURL:  function(url, user, cb){
        
    },
    deleteFeedURL: function(url, user, cb){
        
    },
    createFeed: function(feed, user, cb){
        
    },
    getFeed: function(feed, user, cb){
        
    },
    updateFeed:  function(feed, user, cb){
        
    },
    deleteFeed: function(feed, user, cb){
        
    }
}