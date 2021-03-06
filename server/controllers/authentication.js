const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET)
}

exports.signin = function (req, res, next) {
	// User has already had their email and password auth'd
	// We just need to give them a token
	res.send({ name: req.user.username, id: req.user._id, token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	// See if a user with the given email exists

	if (!email) {
		return res.status(400).send({ error: 'Please provide a valid email address.' })
	}
	if (!username) {
		return res.status(400).send({ error: 'Please choose a username.' })
	}
	if (!password) {
		return res.status(400).send({ error: 'Please choose a password.' })
	}

	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		// If a user with a given email does exist, return an error
		if (existingUser) {
			return res.status(400).send({ error: 'Email is in use' });
		}

		const user = new User({
			email: email,
			username: username,
			password: password
		});

		user.save(function (err) {
			if (err) {
				return next(err);
			}
			res.json({ name: user.username, id: user._id, token: tokenForUser(user) });
		});
	});
}

exports.getUser = function (req, res) {
	if (req.headers && req.headers.token) {
		var token = req.headers.token;
		var decoded;
		try {
			decoded = jwt.decode(token, process.env.SECRET);
		} catch (e) {
			return res.status(401).send({ error: "Unauthorized Yo" });
		}
		var userId = decoded.sub;
		User.findOne({ _id: userId }).then(function (user) {
			return res.status(200).send({
				username: user.username,
				id: userId
			});
		});
	}
}