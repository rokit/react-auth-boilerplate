require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const mongoose = require('mongoose');
const User = require('./models/user');

const passport = require('passport');
const strategies = require('./services/passport')
const authentication = require('./controllers/authentication');

mongoose.Promise = global.Promise;
mongoose.connection.openUri(process.env.MONGODB)

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
	});

} else {
	passport.serializeUser(strategies.serialize);
	passport.deserializeUser(strategies.deserialize);
	
	passport.use(strategies.local)
	passport.use(strategies.jwt)

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(bodyparser.json({ type: '*/*' }));
	app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

	// routing
	app.get('/secret', function (req, res) {
		console.log('ello')
	})
	app.get('/get-user', authentication.getUser);
	app.get('/', function (req, res) {
		if (process.env.NODE_ENV === 'production') {
			res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
		}
	});
	app.post('/signup', authentication.signup);
	app.post('/signin', passport.authenticate('local'), authentication.signin);

	const port = process.env.PORT || 5000;
	app.listen(port, function () {
		console.log(`Listening on port ${port}`);
	});
}