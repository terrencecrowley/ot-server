import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";
import * as passport_facebook from "passport-facebook";
import * as passport_local from "passport-local";
import flash = require("connect-flash");
import * as UM from "./users";

let app = express();

import * as OTManager from './serversession';

let serverContext: OTManager.ServerContext = new OTManager.ServerContext();
var sessionManager: OTManager.SessionManager = new OTManager.SessionManager(serverContext);
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(session({secret: 'OT server', saveUninitialized: true, resave: true, cookie: { maxAge: 1000 * 60 * 60 * 48 } }));
app.use(passport.initialize());
app.use(passport.session());

// Setup PORT
let port = process.env.PORT || 3000;

// Setup Authentication
let clientID = process.env.FACEBOOK_APP_ID || "";
let clientSecret = process.env.FACEBOOK_APP_SECRET || "";
let clientCallbackURL = process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/auth/facebook/callback";

// Routes
let router = express.Router();
let joinRouter = express.Router();

// Middleware
router.use(function(req, res, next) {
	serverContext.log(1, "Request");
	next();
});
joinRouter.use(function(req, res, next) {
	serverContext.log(1, "Join Request");
	next();
});

// HTML routes
app.use('/', express.static('public'));
app.use('/scripts', express.static('clientdist'));

// Authentication and user management
let FacebookStrategy = passport_facebook.Strategy;
let LocalStrategy = passport_local.Strategy;

passport.serializeUser(function(user: UM.User, done: any) {
	done(null, user.serializedID());
	});

passport.deserializeUser(function(sid: any, done: any) {
	let user: UM.User = sessionManager.users.findBySerializedID(sid);
	done(null, user);
	});

passport.use(new FacebookStrategy(
		{
			clientID: clientID,
			clientSecret: clientSecret,
			callbackURL: clientCallbackURL,
			profileFields: ['emails', 'displayName', 'name']
		},

		function(token, refreshToken, profile, done) {

			process.nextTick(function() {
				let user: UM.User = sessionManager.users.findByID('facebook', profile.id);
				if (user)
					return done(null, user);
				else
				{
					let o: any = { ns: 'facebook', id: profile.id, token: token };
					if (profile.name)
						o.name = profile.name.givenName + ' ' + profile.name.familyName;
					else
						o.name = 'anon';
					if (profile.emails)
						o.email = profile.emails[0].value;
					else
						o.email = 'someone@anywhere.com';
					user = sessionManager.users.createUser(o);
					done(null, user);
				}
			});
		})
	);

passport.use(new LocalStrategy(
	function(username: any, password: any, done: any) {
			let user: UM.User = sessionManager.users.findByID('local', username);

			if (user == null)
				return done(null, false, { message: 'No such user.' });
			else if (! user.validPassword(password))
				return done(null, false, { message: 'Incorrect password.' });

			return done(null, user);
		}));

// Middleware to protect API calls with authentication status
function isLoggedIn(req: any, res: any, next: any) {
	if (req.user)
		return next();
	req.session.redirect_to = req.originalUrl;
	res.redirect('/login');
}

function isLoggedInAPI(req: any, res: any, next: any) {
	if (req.user)
		return next();
	res.sendStatus(401); // Unauthorized
}
  
// Authenticated pages
app.use('/pages', isLoggedIn, express.static('pages'));

// Unauthenticated
app.use('/unauth', express.static('pages'));

// Authentication routes
app.get('/', function(req: any, res: any) {
	if (req.user)
		res.redirect('/pages/index.html');
	else
		res.redirect('/login');
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { successRedirect: '/login', failureRedirect: '/' }));

app.get('/auth/local', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/', failureFlash: true } ));

app.get('/signup', function(req: any, res: any) {
	res.redirect('/pages/signup.html');
	});

app.get('/login', function(req: any, res: any) {
		if (req.user)
		{
			if (req.session.redirect_to)
			{
				let url: string = req.session.redirect_to;
				delete req.session.redirect_to;
				res.redirect(url);
			}
			else
				res.redirect('/pages/index.html');
		}
		else
			res.redirect('/unauth/login.html');
	});

app.post('/login', function(req: any, res: any) {
	if (req.body.signup)
	{
		if (sessionManager.users.findByID('local', req.body.username))
		{
			res.redirect('/unauth/login.html');
			return;
		}
		else
		{
			let o: any = { ns: 'local', id: req.body.username, password: req.body.password, name: req.body.username };
			let user: any = sessionManager.users.createUser(o);
		}
	}
	passport.authenticate('local', { successRedirect: '/',
									 failureRedirect: '/login',
									 failureFlash: true })(req, res, undefined);
	});

app.get('/logout', function(req: any, res: any) {
	req.logout();
	res.redirect('/');
	});

// API routes
router.route('/sessions')

	// Respond with list of sessions
	.get(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "listSessions");
		sessionManager.listSessions(req, res);
		});

router.route('/sessions/userview')
	.post(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "userview");
		sessionManager.userView(req, res);
		});

router.route('/sessions/create')
	.post(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "createSession");
		sessionManager.createSession(req, res);
		});

router.route('/sessions/connect/:session_id')
	.post(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "connectSession");
		sessionManager.connectSession(req, res, req.params.session_id);
		});

router.route('/sessions/leave/:session_id')
	.post(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "leaveSession");
		sessionManager.leaveSession(req, res, req.params.session_id);
		});

router.route('/sessions/sendevent/:session_id')
	.post(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "sendEvent");
		serverContext.log(1, JSON.stringify(req.body));
		sessionManager.sendEvent(req, res, req.params.session_id, req.body);
		});

router.route('/sessions/receiveevent/:session_id')
   	.post(isLoggedInAPI, function(req, res) {
		serverContext.log(1, "receiveEvent");
		serverContext.log(1, JSON.stringify(req.body));
		sessionManager.receiveEvent(req, res, req.params.session_id, req.body);
		});;
   
// Api routes
app.use('/api', router);

// Join existing session
joinRouter.route('/:session_id')
	.get(isLoggedIn, function(req, res) {
		let options: any = { root: './' };
		res.sendFile('pages/index.html', options);
		});
app.use('/join', joinRouter);

app.listen(port);
serverContext.log(0, "Listening on port " + port);
