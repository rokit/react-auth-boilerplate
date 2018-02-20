const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
	app.get('/secret', function (req, res) {
		console.log('ello')
	})
	app.get('/get-user', Authentication.getUser);
  app.get('/', function (req, res) {
		console.log('res data', res)
    res.send({message: 'S3CR3T M3SS4G3'});
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
}