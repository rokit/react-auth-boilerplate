const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');

// const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

var env = process.env.NODE_ENV || 'dev'

module.exports = function (app) {
	app.get('/secret', function (req, res) {
		console.log('ello')
	})
	app.get('/get-user', Authentication.getUser);
  app.get('/', function (req, res) {
		console.log('res data', res)
		if (env !== 'dev') {
			res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
		}
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
}