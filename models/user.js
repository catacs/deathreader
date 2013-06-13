
/** User Schema for Reader **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passport = require('passport');
var bcrypt = require('bcrypt');

// Define schema
var UserSchema = new Schema({
    name : { 
        first: { type: String, required: true }
      , middle: { type: String, required: false } 
      , last: { type: String, required: true  }
    }
  , type:  { type: String, enum: ['user','admin'], required: true  }
  , username: { type: String, unique: true }
  , email: { type: String, unique: true   }
  , salt:  { type: String, required: true }
  , hash:  { type: String, required: true }
});


UserSchema
.virtual('password')
.get(function () {
  return this._password;
})

.set(function (password) {
  this._password = password;
  var salt = this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function(username, password, callback) {
  this.findOne({ 'username': username }, function(err, user) {
      console.log("dentro "+err+" "+user)
      if (err) { 
            console.log('Error '+err)
            return callback(err,false,{ message: 'Error connecting database' }); 
      }
      else{
 
              if (!user) 
              {
              	log.info('User '+username+' not found'); 
              	return callback(null, false,{ message: 'User does not exist or password incorrect' });
              }
              user.verifyPassword(password, function(err, passwordCorrect) {
                if (err) {
                	log.warn('User: '+user.username+' Failed verifying password');
                	return callback(err,false,{ message: 'Error connecting database' }); 
                }
                else
                {
                    if (!passwordCorrect) { 
                    	log.warn('User: '+user.username+' Password incorrect');
                    	return callback(null, false,{ message: 'User does not exist or password incorrect' }); 
                    }
                    log.info('User: '+user.username+' signed in');
                    return callback(null, user,null);
                }
              });
      
      }
    });
});

module.exports = mongoose.model('User', UserSchema);