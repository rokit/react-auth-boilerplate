const express = require('express');
const path = require('path');
const session = require("express-session")
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
});

const userSchema = mongoose.Schema({
	username: String,
	password: String
});

userSchema.methods.validPassword = function( pwd ) {
	return ( this.password === pwd );
};


var User = mongoose.model('User', userSchema);
// var asdf = new user({ username: 'a', password: 'a' });
// asdf.save()

const PORT = process.env.PORT || 5000;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
function(username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	});
}
));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(session({ 
	secret: "hmm",
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/secret', function (req,res) {
// 	console.log('called secret')
// });

// Answer API requests.
app.get('/api', function (req, res) {
	console.log('api called')
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// app.get('/users', function (req, res) {
// 	User.findOne({username: 'a'}, function(err, users) {
// 		res.send(users);
// 	});
// });

// custom logged in middleware

// function loggedIn(req, res, next) {
// 	console.log('loggedIn called')
	
// 	if (req.user) {
// 		console.log('we have a user')
// 			next();
// 	} else {
// 		console.log('we do not have a user')
		
// 			req.method = 'get'; 
// 			res.redirect('/signin');
// 	}
// }

app.post('/signin',
passport.authenticate('local'),
function(req, res) {
	// If this function gets called, authentication was successful.
	// `req.user` contains the authenticated user.
	res.send({authenticated: 1, username: req.user.username});
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
