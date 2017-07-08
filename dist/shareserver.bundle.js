/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var express = __webpack_require__(1);
	var bodyParser = __webpack_require__(2);
	var cookieParser = __webpack_require__(3);
	var session = __webpack_require__(4);
	var passport = __webpack_require__(5);
	var passport_facebook = __webpack_require__(6);
	var passport_local = __webpack_require__(7);
	var flash = __webpack_require__(8);
	var app = express();
	var OTManager = __webpack_require__(9);
	var serverContext = new OTManager.ServerContext();
	var sessionManager = new OTManager.SessionManager(serverContext);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(flash());
	app.use(session({ secret: 'OT server', saveUninitialized: true, resave: true, cookie: { maxAge: 1000 * 60 * 60 * 48 } }));
	app.use(passport.initialize());
	app.use(passport.session());
	// Setup PORT
	var port = process.env.PORT || 3000;
	// Setup Authentication
	var clientID = process.env.FACEBOOK_APP_ID || "";
	var clientSecret = process.env.FACEBOOK_APP_SECRET || "";
	var clientCallbackURL = process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/auth/facebook/callback";
	// Routes
	var router = express.Router();
	var joinRouter = express.Router();
	// Middleware
	router.use(function (req, res, next) {
	    serverContext.log(1, "Request");
	    next();
	});
	joinRouter.use(function (req, res, next) {
	    serverContext.log(1, "Join Request");
	    next();
	});
	// HTML routes
	app.use('/', express.static('public'));
	app.use('/scripts', express.static('clientdist'));
	// Authentication and user management
	var FacebookStrategy = passport_facebook.Strategy;
	var LocalStrategy = passport_local.Strategy;
	passport.serializeUser(function (user, done) {
	    done(null, user.serializedID());
	});
	passport.deserializeUser(function (sid, done) {
	    var user = sessionManager.users.findBySerializedID(sid);
	    done(null, user);
	});
	passport.use(new FacebookStrategy({
	    clientID: clientID,
	    clientSecret: clientSecret,
	    callbackURL: clientCallbackURL,
	    profileFields: ['emails', 'displayName', 'name']
	}, function (token, refreshToken, profile, done) {
	    process.nextTick(function () {
	        var user = sessionManager.users.findByID('facebook', profile.id);
	        if (user)
	            return done(null, user);
	        else {
	            var o = { ns: 'facebook', id: profile.id, token: token };
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
	}));
	passport.use(new LocalStrategy(function (username, password, done) {
	    var user = sessionManager.users.findByID('local', username);
	    if (user == null)
	        return done(null, false, { message: 'No such user.' });
	    else if (!user.validPassword(password))
	        return done(null, false, { message: 'Incorrect password.' });
	    return done(null, user);
	}));
	// Middleware to protect API calls with authentication status
	function isLoggedIn(req, res, next) {
	    if (req.user)
	        return next();
	    req.session.redirect_to = req.originalUrl;
	    res.redirect('/login');
	}
	function isLoggedInAPI(req, res, next) {
	    if (req.user)
	        return next();
	    res.sendStatus(401); // Unauthorized
	}
	// Authenticated pages
	app.use('/pages', isLoggedIn, express.static('pages'));
	// Unauthenticated
	app.use('/unauth', express.static('pages'));
	// Authentication routes
	app.get('/', function (req, res) {
	    if (req.user)
	        res.redirect('/pages/index.html');
	    else
	        res.redirect('/login');
	});
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/login', failureRedirect: '/' }));
	app.get('/auth/local', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/', failureFlash: true }));
	app.get('/signup', function (req, res) {
	    res.redirect('/pages/signup.html');
	});
	app.get('/login', function (req, res) {
	    if (req.user) {
	        if (req.session.redirect_to) {
	            var url = req.session.redirect_to;
	            delete req.session.redirect_to;
	            res.redirect(url);
	        }
	        else
	            res.redirect('/pages/index.html');
	    }
	    else
	        res.redirect('/unauth/login.html');
	});
	app.post('/login', function (req, res) {
	    if (req.body.signup) {
	        if (sessionManager.users.findByID('local', req.body.username)) {
	            res.redirect('/unauth/login.html');
	            return;
	        }
	        else {
	            var o = { ns: 'local', id: req.body.username, password: req.body.password, name: req.body.username };
	            var user = sessionManager.users.createUser(o);
	        }
	    }
	    passport.authenticate('local', { successRedirect: '/',
	        failureRedirect: '/login',
	        failureFlash: true })(req, res, undefined);
	});
	app.get('/logout', function (req, res) {
	    req.logout();
	    res.redirect('/');
	});
	// API routes
	router.route('/sessions')
	    .get(isLoggedInAPI, function (req, res) {
	    serverContext.log(1, "listSessions");
	    sessionManager.listSessions(req, res);
	});
	router.route('/sessions/userview')
	    .post(isLoggedInAPI, function (req, res) {
	    serverContext.log(1, "userview");
	    sessionManager.userView(req, res);
	});
	router.route('/sessions/create')
	    .post(isLoggedInAPI, function (req, res) {
	    serverContext.log(1, "createSession");
	    sessionManager.createSession(req, res);
	});
	router.route('/sessions/connect/:session_id')
	    .post(isLoggedInAPI, function (req, res) {
	    serverContext.log(1, "connectSession");
	    sessionManager.connectSession(req, res, req.params.session_id);
	});
	router.route('/sessions/sendevent/:session_id')
	    .post(isLoggedInAPI, function (req, res) {
	    serverContext.log(1, "sendEvent");
	    serverContext.log(1, JSON.stringify(req.body));
	    sessionManager.sendEvent(req, res, req.params.session_id, req.body);
	});
	router.route('/sessions/receiveevent/:session_id')
	    .post(isLoggedInAPI, function (req, res) {
	    serverContext.log(1, "receiveEvent");
	    serverContext.log(1, JSON.stringify(req.body));
	    sessionManager.receiveEvent(req, res, req.params.session_id, req.body);
	});
	;
	// Api routes
	app.use('/api', router);
	// Join existing session
	joinRouter.route('/:session_id')
	    .get(isLoggedIn, function (req, res) {
	    var options = { root: './' };
	    res.sendFile('pages/index.html', options);
	});
	app.use('/join', joinRouter);
	app.listen(port);
	serverContext.log(0, "Listening on port " + port);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("passport-facebook");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("connect-flash");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OT = __webpack_require__(10);
	var fs = __webpack_require__(11);
	var UM = __webpack_require__(12);
	var Util = __webpack_require__(14);
	var StateVersion = 6.0;
	var ClientIDForServer = '-Server-';
	var clientQuiescentTimeout = process.env.CLIENT_QUIESCENT_TIMEOUT || 20000; // 20 seconds
	var sessionQuiescentTimeout = process.env.SESSION_QUIESCENT_TIMEOUT || 6000000; // 100 minutes
	var clientMaxCount = process.env.CLIENT_MAX_COUNT || 50;
	var maxEditLogSize = process.env.MAX_EDIT_LOG_SIZE || 500;
	var ServerContext = (function () {
	    function ServerContext() {
	        this.verbosity = process.env.VERBOSITY || 0;
	    }
	    ServerContext.prototype.flagIsSet = function (flag) {
	        return false;
	    };
	    ServerContext.prototype.flagValue = function (flag) {
	        return 0;
	    };
	    ServerContext.prototype.log = function (verbose, s) {
	        if (verbose <= this.verbosity)
	            console.log(s);
	    };
	    return ServerContext;
	}());
	exports.ServerContext = ServerContext;
	var Client = (function () {
	    // constructor
	    function Client(ctx, sid, cid, u) {
	        this.user = u;
	        this.user.sessions[sid] = true;
	        this.clientID = cid;
	        this.context = ctx;
	        this.lastActive = new Date();
	        this.longPollResponse = null;
	        this.longPollResponseBody = null;
	    }
	    Client.prototype.isZombie = function (fromDate, timeout) {
	        if (fromDate === undefined)
	            fromDate = new Date();
	        if (timeout === undefined)
	            timeout = clientQuiescentTimeout;
	        return ((fromDate.getTime() - this.lastActive.getTime()) > timeout);
	    };
	    Client.prototype.markAlive = function () {
	        this.lastActive = new Date();
	        return this;
	    };
	    Client.prototype.parkResponse = function (res, body) {
	        this.longPollResponse = res;
	        this.longPollResponseBody = body;
	    };
	    Client.prototype.unparkResponse = function () {
	        if (this.longPollResponse) {
	            this.context.log(2, "unparkResponse for client: " + String(this.clientID));
	            this.longPollResponse.json(this.longPollResponseBody);
	            this.longPollResponse = null;
	            this.longPollResponseBody = null;
	        }
	    };
	    return Client;
	}());
	exports.Client = Client;
	var Session = (function () {
	    // Constructor
	    function Session(ctx) {
	        this.context = ctx;
	        this.sessionID = Util.createGuid();
	        this.serverEngine = new OT.OTServerEngine(ctx, this.sessionID);
	        this.clients = [];
	        this.lastActive = new Date();
	        this.clientSequenceNo = 0;
	        this.statMaxClients = 0;
	        this.statRequestCount = 0;
	        this.context.log(0, "session(" + this.sessionID + "): created.");
	    }
	    Session.prototype.isZombie = function (fromDate, timeout) {
	        if (fromDate === undefined)
	            fromDate = new Date();
	        if (timeout === undefined)
	            timeout = sessionQuiescentTimeout;
	        return (this.clients.length == 0) && ((fromDate.getTime() - this.lastActive.getTime()) > timeout);
	    };
	    Session.prototype.unparkClients = function () {
	        for (var i = 0; i < this.clients.length; i++)
	            this.clients[i].unparkResponse();
	    };
	    Session.prototype.getUserList = function () {
	        var val = this.serverEngine.toValue();
	        val = val ? val['WellKnownName_users'] : val;
	        if (val == null)
	            val = {};
	        return val;
	    };
	    Session.prototype.getUserName = function (client) {
	        var val = this.getUserList();
	        return val[client.clientID];
	    };
	    Session.prototype.updateUserList = function () {
	        var now = new Date();
	        var val = this.getUserList();
	        var cedit = new OT.OTCompositeResource(this.sessionID, ClientIDForServer);
	        var medit = new OT.OTMapResource('WellKnownName_users');
	        cedit.edits.push(medit);
	        cedit.clock = this.serverEngine.serverClock();
	        for (var i = this.clients.length - 1; i >= 0; i--) {
	            var c = this.clients[i];
	            if (c.isZombie(now)) {
	                if (val[c.clientID] !== undefined)
	                    medit.edits.push([OT.OpMapDel, c.clientID, '']);
	                this.context.log(0, "session(" + this.sessionID + "): removing zombie client(" + c.clientID + ")");
	                this.clients.splice(i, 1);
	            }
	            else if (val[c.clientID] === undefined)
	                medit.edits.push([OT.OpMapSet, c.clientID, c.user.name]);
	        }
	        if (!medit.isEmpty()) {
	            cedit.clientSequenceNo = this.clientSequenceNo++;
	            this.serverEngine.addServer(cedit);
	        }
	    };
	    Session.prototype.compress = function () {
	        // Would probably make more sense to make how we compress dynamic based on how clients are behaving.
	        // Also, a better approach would be to just keep composed variants along size the main array and
	        // then more slowly age out the finer grained log entries. But just do this for now so the log
	        // doesn't grow without bound.
	        if (this.serverEngine.logServer.length > maxEditLogSize) {
	            // Just compress first 20%
	            var nCompress = Math.floor(maxEditLogSize / 5);
	            var cedit = this.serverEngine.logServer[0];
	            for (var i = 1; i < nCompress; i++)
	                cedit.compose(this.serverEngine.logServer[i]);
	            this.serverEngine.logServer.splice(1, nCompress - 1);
	            this.context.log(0, "session(" + this.sessionID + "): compressing log.");
	        }
	    };
	    // Connect
	    Session.prototype.connectSession = function (req, res) {
	        this.lastActive = new Date();
	        this.statRequestCount++;
	        var responseBody;
	        if (this.clients.length >= clientMaxCount) {
	            responseBody = { "result": 2, "message": 'Too many clients.' };
	        }
	        else {
	            var clientID = req.body.clientID ? req.body.clientID : Util.createGuid();
	            var client = this.findClient(clientID, req.user).markAlive();
	            this.context.log(0, "session(" + this.sessionID + "): creating client(" + client.clientID + ")");
	            responseBody = { result: 0, clientID: client.clientID, view: this.toView() };
	        }
	        this.context.log(1, "connectSession: " + JSON.stringify(responseBody));
	        res.json(responseBody);
	        this.updateUserList();
	    };
	    Session.prototype.nakedEditList = function (nextclock) {
	        var a;
	        if (nextclock === 0)
	            a = this.serverEngine.logServer;
	        else {
	            var nLog = this.serverEngine.logServer.length;
	            var i = void 0;
	            if (nLog == 0)
	                return [];
	            for (i = nLog - 1; i >= 0; i--)
	                if (this.serverEngine.logServer[i].clock == nextclock)
	                    break;
	                else if (this.serverEngine.logServer[i].clock < nextclock) {
	                    // FIX: really should fail this request if I requested a nextclock that was compressed out.
	                    // Really the only valid case this clause is catching is the end of the array case.
	                    i++;
	                    break;
	                }
	            if (i === -1)
	                return [];
	            a = this.serverEngine.logServer.slice(i);
	        }
	        var retA = [];
	        for (var i = 0; i < a.length; i++)
	            retA.push(a[i].toJSON());
	        return retA;
	    };
	    // Client Event
	    // IN: { clientID: id, Edit: OT.OTCompositeResource }
	    // OUT: { result: 0, EditList:[ OT.OTCompositeResource ] }
	    Session.prototype.sendEvent = function (req, res, body) {
	        this.lastActive = new Date();
	        this.statRequestCount++;
	        this.unparkClients();
	        var edit = OT.OTCompositeResource.constructFromObject(body["Edit"]);
	        var client = this.findClient(body["clientID"], req.user).markAlive();
	        var responseBody = null;
	        var nResult = this.serverEngine.addServer(edit);
	        if (nResult === OT.clockSuccess) {
	            // Drain any unsent actions (including this one)
	            responseBody = { result: 0,
	                clientID: client.clientID,
	                view: this.toView(),
	                EditList: this.nakedEditList(edit.clock + 1)
	            };
	        }
	        else {
	            // Clock unavailable
	            responseBody = { result: nResult, "message": "sendEvent: failure: " + nResult };
	        }
	        this.context.log(1, "sendEvent: " + JSON.stringify(responseBody));
	        res.json(responseBody);
	    };
	    // Receive Event
	    // IN: { clientID: id, NextClock: number }
	    // OUT: { "result": 0, "EditList": [ OT.OTCompositeResource ] }
	    Session.prototype.receiveEvent = function (req, res, body) {
	        this.lastActive = new Date();
	        this.statRequestCount++;
	        var client = this.findClient(body["clientID"], req.user).markAlive();
	        var nextClock = Number(body["NextClock"]);
	        var responseBody = null;
	        if (nextClock === NaN) {
	            responseBody = { result: 1, "message": "receiveEvent: invalid clock: " + body["NextClock"] };
	        }
	        else {
	            // Send any unsent edits
	            responseBody = { result: 0,
	                clientID: client.clientID,
	                view: this.toView(),
	                EditList: this.nakedEditList(nextClock) };
	            if (responseBody.EditList.length == 0) {
	                client.parkResponse(res, responseBody);
	                return;
	            }
	        }
	        this.context.log(1, "receiveEvent: " + JSON.stringify(responseBody));
	        res.json(responseBody);
	    };
	    Session.prototype.logStats = function () {
	        this.context.log(0, "session(" + this.sessionID + "): terminating.");
	        this.context.log(0, "session(" + this.sessionID + "): MaxClients(" + String(this.statMaxClients) + ")");
	        this.context.log(0, "session(" + this.sessionID + "): Requests(" + String(this.statRequestCount) + ")");
	    };
	    // Helpers
	    Session.prototype.findClient = function (cid, user) {
	        for (var i = 0; i < this.clients.length; i++) {
	            var c_1 = this.clients[i];
	            if (c_1.clientID === cid)
	                return c_1;
	        }
	        // Create on the fly - may be creating new or recreating a zombie client we've edited out
	        this.context.log(0, "session(" + this.sessionID + "): constructing client(" + cid + ")");
	        var c = new Client(this.context, this.sessionID, cid, user);
	        this.clients.push(c);
	        if (this.clients.length > this.statMaxClients)
	            this.statMaxClients = this.clients.length;
	        return c;
	    };
	    Session.prototype.toView = function () {
	        var o = {
	            sessionID: this.sessionID,
	            sessionName: this.serverEngine.getName(),
	            sessionType: this.serverEngine.getType(),
	            lastActive: this.lastActive.toJSON(),
	            clientCount: this.clients.length,
	            maxClients: this.statMaxClients,
	            requestCount: this.statRequestCount
	        };
	        return o;
	    };
	    Session.prototype.toJSON = function () {
	        return {
	            sessionID: this.sessionID,
	            lastActive: this.lastActive.toJSON(),
	            maxClients: this.statMaxClients,
	            engine: this.serverEngine.toJSON()
	        };
	    };
	    Session.prototype.fromJSON = function (o) {
	        this.sessionID = o.sessionID;
	        this.lastActive = new Date(o.lastActive);
	        this.statMaxClients = o.statMaxClients;
	        this.serverEngine.loadFromObject(o.engine);
	    };
	    return Session;
	}());
	exports.Session = Session;
	var SessionManager = (function () {
	    // constructor
	    function SessionManager(ctx) {
	        this.context = ctx;
	        this.sessions = [];
	        this.sessionMap = {};
	        this.bTimerSet = false;
	        this.bSaving = false;
	        this.nHouseKeeping = 0;
	        this.setHousekeepingTimer();
	        this.load();
	        this._users = new UM.Users(ctx);
	        this._users.load();
	    }
	    Object.defineProperty(SessionManager.prototype, "users", {
	        // User management
	        get: function () {
	            return this._users;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    // List Session
	    // OUT: { "result": 0, "sessions": [ { "session_id": string}* ] }
	    SessionManager.prototype.listSessions = function (req, res) {
	        var responseBody = { "result": 0 };
	        var aSession = [];
	        for (var i = 0; i < this.sessions.length; i++)
	            aSession.push({ "session_id": this.sessions[i].sessionID });
	        responseBody["sessions"] = aSession;
	        this.context.log(1, "listSessions: " + JSON.stringify(responseBody));
	        res.json(responseBody);
	        this.setHousekeepingTimer();
	    };
	    // User View
	    // OUT: { result: 0, user: { user info } }
	    SessionManager.prototype.userView = function (req, res) {
	        var responseBody = { result: 0 };
	        if (req.user == null) {
	            responseBody.result = 1;
	            responseBody.message = "No valid user.";
	        }
	        else
	            responseBody.user = req.user.toView(this);
	        res.json(responseBody);
	        this.setHousekeepingTimer();
	    };
	    // Create
	    // IN: {  }
	    // OUT: { result: 0, session_id: string }
	    SessionManager.prototype.createSession = function (req, res) {
	        var session = new Session(this.context);
	        this.sessions.push(session);
	        this.sessionMap[session.sessionID] = session;
	        var responseBody = { result: 0, view: session.toView() };
	        this.context.log(1, "createSession: " + JSON.stringify(responseBody));
	        res.json(responseBody);
	        this.bDirty = true;
	        this.setHousekeepingTimer();
	    };
	    // Connect
	    // OUT: { result: [0,1], message: "failure message", clientID: cid, session: { session_info } }
	    SessionManager.prototype.connectSession = function (req, res, session_id) {
	        var session = this.findSession(session_id);
	        if (session) {
	            session.connectSession(req, res);
	            this.bDirty = true;
	        }
	        else {
	            var responseBody = { "result": 1, "message": "connectSession: no such session: " + session_id };
	            this.context.log(1, "connectSession: " + JSON.stringify(responseBody));
	            res.json(responseBody);
	        }
	        this.setHousekeepingTimer();
	    };
	    // Send Event
	    // IN: { clientID: id, Edit: OT.OTCompositeResource }
	    // OUT: { result: 0, EditList:[ OT.OTCompositeResource ] }
	    SessionManager.prototype.sendEvent = function (req, res, session_id, body) {
	        var session = this.findSession(session_id);
	        if (session) {
	            session.sendEvent(req, res, body);
	            this.bDirty = true;
	        }
	        else {
	            var responseBody = { result: 1, "message": "sendEvent: no such session: " + session_id };
	            this.context.log(1, "sendEvent: " + JSON.stringify(responseBody));
	            res.json(responseBody);
	        }
	        this.setHousekeepingTimer();
	    };
	    // Receive Event
	    // IN: { clientID: id, NextClock: number }
	    // OUT: { "result": 0 "EditList": [ OT.OTCompositeResource ] }
	    SessionManager.prototype.receiveEvent = function (req, res, session_id, body) {
	        var session = this.findSession(session_id);
	        if (session)
	            session.receiveEvent(req, res, body);
	        else {
	            var responseBody = { "result": 1, "message": "receiveEvent: no such session: " + session_id };
	            this.context.log(1, "receiveEvent: " + JSON.stringify(responseBody));
	            res.json(responseBody);
	        }
	        this.setHousekeepingTimer();
	    };
	    // Helpers
	    SessionManager.prototype.findSession = function (session_id) {
	        var session = this.sessionMap[session_id];
	        return session ? session : null;
	    };
	    // housekeeping Timer
	    SessionManager.prototype.housekeepingOnTimer = function () {
	        this.nHouseKeeping++;
	        var now = new Date();
	        this.bTimerSet = false;
	        // Get rid of quiescent clients
	        for (var i = this.sessions.length - 1; i >= 0; i--) {
	            var session = this.sessions[i];
	            // Unpark any parked long-poll clients
	            session.unparkClients();
	            // Update user list
	            session.updateUserList();
	            // Compress session log
	            session.compress();
	            // Delete if necessary
	            if (session.isZombie(now)) {
	                session.logStats();
	                this.sessions.splice(i, 1);
	                delete this.sessionMap[session.sessionID];
	            }
	        }
	        // Preserve state for restart every once in a while
	        if ((this.nHouseKeeping % 2) == 0)
	            this.save();
	        // Do it again
	        this.setHousekeepingTimer();
	    };
	    // Set timer for housekeeping
	    SessionManager.prototype.setHousekeepingTimer = function () {
	        theManager = this;
	        if (!this.bTimerSet && this.sessions.length > 0) {
	            if (this.sessions.length > 0) {
	                this.bTimerSet = true;
	                setTimeout(function () { theManager.housekeepingOnTimer(); }, 5000);
	            }
	            else
	                this.save();
	        }
	    };
	    SessionManager.prototype.toJSON = function () {
	        var o = { version: StateVersion, sessions: {} };
	        var oSessions = o.sessions;
	        for (var i = 0; i < this.sessions.length; i++) {
	            var session = this.sessions[i];
	            oSessions[session.sessionID] = session.toJSON();
	        }
	        return o;
	    };
	    SessionManager.prototype.fromJSON = function (o) {
	        // Ignore unknown versions
	        var version = o['version'];
	        if (version === undefined || version != StateVersion)
	            return;
	        // Load sessions
	        o = o['sessions'];
	        if (o === undefined)
	            return;
	        for (var p in o)
	            if (o.hasOwnProperty(p)) {
	                var session = new Session(this.context);
	                //session.sessionID = p;
	                session.fromJSON(o[p]);
	                this.sessions.push(session);
	                this.sessionMap[session.sessionID] = session;
	            }
	    };
	    SessionManager.prototype.save = function () {
	        try {
	            this.users.save();
	            if (this.bDirty && !this.bSaving) {
	                var s = JSON.stringify(this);
	                this.bSaving = true;
	                fs.writeFile('state/state.json', s, function (err) {
	                    theManager.bSaving = false;
	                    theManager.bDirty = false;
	                    if (err)
	                        throw err;
	                });
	                this.context.log(0, "SessionManager: state saved");
	            }
	        }
	        catch (err) {
	            this.context.log(0, "SessionManager: save state failed: " + err);
	        }
	    };
	    SessionManager.prototype.load = function () {
	        try {
	            var s = fs.readFileSync('state/state.json', 'utf8');
	            var o = JSON.parse(s);
	            this.fromJSON(o);
	            this.bDirty = false;
	        }
	        catch (err) {
	            this.context.log(0, "SessionManager: load state failed: " + err);
	        }
	    };
	    return SessionManager;
	}());
	exports.SessionManager = SessionManager;
	var theManager;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("@terrencecrowley/ot-js");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var fs = __webpack_require__(11);
	var bcrypt = __webpack_require__(13);
	var StateVersion = 4.0;
	var User = (function () {
	    function User(o) {
	        if (o != undefined)
	            this.fromJSON(o);
	        else {
	            this.ns = '';
	            this.id = '';
	            this.token = '';
	            this.name = '';
	            this.email = '';
	            this.hash = '';
	            this.sessions = {};
	        }
	    }
	    User.prototype.serializedID = function () {
	        return this.ns + '/' + this.id;
	    };
	    User.prototype.validPassword = function (pw) {
	        return bcrypt.compareSync(pw, this.hash);
	    };
	    User.prototype.toJSON = function () {
	        var o = { sid: this.serializedID(), token: this.token, name: this.name, email: this.email, sessions: this.sessions };
	        if (this.hash)
	            o.hash = this.hash;
	        return o;
	    };
	    User.prototype.fromJSON = function (o) {
	        this.ns = o.ns;
	        this.id = o.id;
	        this.token = o.token;
	        this.name = o.name;
	        this.email = o.email;
	        if (o.hash)
	            this.hash = o.hash;
	        if (o.password)
	            this.hash = bcrypt.hashSync(o.password, 8);
	        this.sessions = o.sessions;
	        if (this.sessions == null)
	            this.sessions = {};
	    };
	    User.prototype.toView = function (sm) {
	        var o = { ns: this.ns, id: this.id, name: this.name, sessions: [] };
	        var aS = o.sessions;
	        for (var p in this.sessions)
	            if (this.sessions.hasOwnProperty(p)) {
	                var s = sm.findSession(p);
	                if (s)
	                    aS.push(s.toView());
	            }
	        return o;
	    };
	    return User;
	}());
	exports.User = User;
	var Users = (function () {
	    // Constructor
	    function Users(ctx) {
	        this.context = ctx;
	        this.users = [];
	        this.bDirty = false;
	        this.bSaving = false;
	        UserManager = this;
	    }
	    Users.prototype.findByID = function (ns, id) {
	        for (var i = 0; i < this.users.length; i++)
	            if (this.users[i].ns == ns && this.users[i].id == id)
	                return this.users[i];
	        return null;
	    };
	    Users.prototype.findBySerializedID = function (sid) {
	        var i = sid.indexOf('/');
	        if (i == -1)
	            return this.findByID('', sid);
	        var ns = sid.substr(0, i);
	        var id = sid.substr(i + 1);
	        for (var i_1 = 0; i_1 < this.users.length; i_1++)
	            if (this.users[i_1].ns == ns && this.users[i_1].id == id)
	                return this.users[i_1];
	        return null;
	    };
	    Users.prototype.createUser = function (o) {
	        var u = new User(o);
	        this.users.push(u);
	        this.bDirty = true;
	        return u;
	    };
	    Users.prototype.toJSON = function () {
	        var o = { version: StateVersion, users: [] };
	        var aUsers = o.users;
	        for (var i = 0; i < this.users.length; i++)
	            aUsers.push(this.users[i].toJSON());
	        return o;
	    };
	    Users.prototype.fromJSON = function (o) {
	        if (o.version == StateVersion) {
	            for (var i = 0; i < o.users.length; i++)
	                this.users.push(new User(o.users[i]));
	        }
	        this.bDirty = false;
	    };
	    Users.prototype.save = function () {
	        try {
	            if (this.bDirty && !this.bSaving) {
	                var s = JSON.stringify(this);
	                this.bSaving = true;
	                fs.writeFile('state/users.json', s, function (err) {
	                    UserManager.bSaving = false;
	                    UserManager.bDirty = false;
	                    if (err)
	                        throw err;
	                });
	                this.context.log(0, "UserManager: state saved");
	            }
	        }
	        catch (err) {
	            this.context.log(0, "UserManager: save state failed: " + err);
	        }
	    };
	    Users.prototype.load = function () {
	        try {
	            var s = fs.readFileSync('state/users.json', 'utf8');
	            var o = JSON.parse(s);
	            if (o.version == StateVersion)
	                this.fromJSON(o);
	            this.bDirty = false;
	        }
	        catch (err) {
	            this.context.log(0, "UserManager: load state failed: " + err);
	        }
	    };
	    return Users;
	}());
	exports.Users = Users;
	var UserManager;


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("bcryptjs");

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function createGuid() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
	        return v.toString(16);
	    });
	}
	exports.createGuid = createGuid;


/***/ }
/******/ ]);
//# sourceMappingURL=shareserver.bundle.js.map