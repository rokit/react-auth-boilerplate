const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

exports.serialize = function (user, done) {
	done(null, user.id);
}

exports.deserialize = function (id, done) {
	User.findById(id, function (err, user) {
		if (err) { return done(err); }
		done(null, user);
	});
}

// create local strategy
const localOptions = {usernameField: 'email'};
exports.local = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is correct email and password
  // otherwise call done with false
  User.findOne({email: email}, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    })
  })
});

// create jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: process.env.SECRET
};
exports.jwt = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that
	// otherwise, call done without a user object
	console.log('visiting a page')
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});