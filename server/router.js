require('./services/passport');
const Authentication = require('./controllers/authentication');
const passport = require('passport');
const path = require('path');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
	app.get('/secret', function (req, res) {
		console.log('ello')
	})
	app.get('/get-user', Authentication.getUser);
  app.get('/', function (req, res) {
		if (process.env.NODE_ENV === 'production') {
			res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
		}
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
}