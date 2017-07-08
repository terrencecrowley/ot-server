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
	var $ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var ScratchControl = __webpack_require__(4);
	var AgreeControl = __webpack_require__(8);
	var ChatControl = __webpack_require__(13);
	var NameControl = __webpack_require__(14);
	var QueryControl = __webpack_require__(15);
	var MenuControl = __webpack_require__(17);
	var ChessControl = __webpack_require__(19);
	var PlanControl = __webpack_require__(21);
	var StatusControl = __webpack_require__(23);
	var SessionC = __webpack_require__(24);
	var CS = __webpack_require__(9);
	var ClientActions = __webpack_require__(10);
	var app_1 = __webpack_require__(25);
	var BrowserContext = (function () {
	    function BrowserContext() {
	    }
	    BrowserContext.prototype.flagIsSet = function (flag) {
	        return false;
	    };
	    BrowserContext.prototype.flagValue = function (flag) {
	        return 0;
	    };
	    BrowserContext.prototype.log = function (verbose, s) {
	        // logMessage(s);
	    };
	    return BrowserContext;
	}());
	var Actions = (function () {
	    function Actions(app) {
	        this.app = app;
	    }
	    Actions.prototype.fire = function (id, arg) {
	        switch (id) {
	            case ClientActions.Home:
	                this.app.actionHome();
	                break;
	            case ClientActions.NewScratch:
	                this.app.actionNewScratch();
	                break;
	            case ClientActions.NewChess:
	                this.app.actionNewChess();
	                break;
	            case ClientActions.NewPlan:
	                this.app.actionNewPlan();
	                break;
	            case ClientActions.NewAgree:
	                this.app.actionNewAgree();
	                break;
	            case ClientActions.ToggleChat:
	                this.app.actionToggleChat();
	                break;
	            case ClientActions.JoinSession:
	                this.app.actionJoinSession(arg);
	                break;
	            case ClientActions.Query:
	                this.app.actionQuery(arg);
	                break;
	            case ClientActions.Menu:
	                this.app.actionMenu(arg);
	                break;
	            case ClientActions.DoneEdits:
	                this.app.actionDone(arg);
	                break;
	        }
	    };
	    return Actions;
	}());
	var App = (function () {
	    // constructor
	    function App() {
	        this.context = new BrowserContext();
	        this.clientSession = new CS.ClientSession(this.context);
	        this.forceRender = this.forceRender.bind(this);
	        this.bRender = false;
	        // Bind so I can use as generic callbacks
	        this.actions = new Actions(this);
	        this.statusControl = new StatusControl.StatusControl(this.context, this.clientSession, this.forceRender);
	        this.chatControl = new ChatControl.ChatControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.nameControl = new NameControl.NameControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.queryControl = new QueryControl.QueryControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.menuControl = new MenuControl.MenuControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.sessionControl = new SessionC.SessionControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.scratchControl = new ScratchControl.ScratchControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.agreeControl = new AgreeControl.AgreeControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.chessControl = new ChessControl.ChessControl(this.context, this.clientSession, this.forceRender, this.actions);
	        this.planControl = new PlanControl.PlanControl(this.context, this.clientSession, this.forceRender, this.actions);
	    }
	    App.prototype.render = function () {
	        if (this.bRender) {
	            ReactDOM.render(React.createElement(app_1.ReactApp, { mode: this.mode(), name: this.clientSession.user.name, url: this.urlForJoin, status: this.statusControl.status, actions: this.actions, sessionControl: this.sessionControl, nameControl: this.nameControl, queryControl: this.queryControl, menuControl: this.menuControl, chatControl: this.chatControl, chessControl: this.chessControl, planControl: this.planControl, scratchControl: this.scratchControl, agreeControl: this.agreeControl }), document.getElementById("root"));
	            this.bRender = false;
	            if ($('#autofocus'))
	                $('#autofocus').focus();
	        }
	    };
	    App.prototype.forceRender = function () {
	        if (!this.bRender) {
	            this.bRender = true;
	            setTimeout(function () { theApp.render(); }, 1);
	        }
	    };
	    Object.defineProperty(App.prototype, "urlForJoin", {
	        get: function () {
	            var s = '';
	            if (this.clientSession.session.sessionID != '') {
	                s = document.location.protocol + '//' + document.location.hostname;
	                if (document.location.port)
	                    s += ':' + document.location.port;
	                s += '/join/' + this.clientSession.session.sessionID;
	            }
	            return s;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    App.prototype.reTick = function () {
	        setTimeout(function () { theApp.tick(); }, this.clientSession.speed.speed);
	    };
	    App.prototype.initialize = function () {
	        var p = document.location.pathname;
	        var sessionID = '';
	        if (p.length > 6 && p.substr(0, 6) === '/join/')
	            sessionID = document.location.pathname.substr(6); // Remove "/join/"
	        this.clientSession.setSession(sessionID);
	        this.forceRender();
	        this.reTick();
	    };
	    App.prototype.mode = function () {
	        if (this.clientSession.session.getType())
	            return this.clientSession.session.getType();
	        return '';
	    };
	    App.prototype.actionHome = function () {
	        this.clientSession.reset('');
	    };
	    App.prototype.actionNewChess = function () {
	        this.clientSession.reset('chess');
	    };
	    App.prototype.actionNewPlan = function () {
	        this.clientSession.reset('plan');
	    };
	    App.prototype.actionNewScratch = function () {
	        this.clientSession.reset('scratch');
	    };
	    App.prototype.actionNewAgree = function () {
	        this.clientSession.reset('agree');
	    };
	    App.prototype.actionToggleChat = function () {
	        this.chatControl.toggle();
	    };
	    App.prototype.actionJoinSession = function (sid) {
	        this.clientSession.setSession(sid);
	    };
	    App.prototype.actionQuery = function (props) {
	        this.queryControl.query(props);
	    };
	    App.prototype.actionMenu = function (props) {
	        this.menuControl.menu(props);
	    };
	    App.prototype.actionDone = function (ok) {
	        this.statusControl.doneEdits(ok);
	        this.sessionControl.doneEdits(ok);
	        this.scratchControl.doneEdits(ok);
	        this.agreeControl.doneEdits(ok);
	        this.chatControl.doneEdits(ok);
	        this.nameControl.doneEdits(ok);
	        this.chessControl.doneEdits(ok);
	        this.planControl.doneEdits(ok);
	        this.queryControl.doneEdits(ok);
	        this.menuControl.doneEdits(ok);
	    };
	    App.prototype.tick = function () {
	        this.clientSession.tick();
	        this.reTick();
	    };
	    return App;
	}());
	;
	var theApp = null;
	function StartupApp() {
	    theApp = new App();
	    theApp.initialize();
	}
	$(StartupApp);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OTE = __webpack_require__(5);
	// Helper function for setting range of a textarea.
	function selectRange(el, start, end) {
	    if ('selectionStart' in el) {
	        el.selectionStart = start;
	        el.selectionEnd = end;
	    }
	    else if (el.setSelectionRange) {
	        el.setSelectionRange(start, end);
	    }
	    else if (el.createTextRange) {
	        var range = el.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', end);
	        range.moveStart('character', start);
	        range.select();
	    }
	}
	var ScratchControl = (function () {
	    function ScratchControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.textValue = '';
	        this.selectionStart = 0;
	        this.selectionEnd = 0;
	        this.elTextArea = null;
	        this.captureElementCB = this.captureElementCB.bind(this);
	        this.notifyData = this.notifyData.bind(this);
	        this.notifyLocalChange = this.notifyLocalChange.bind(this);
	        this.notifyJoin = this.notifyJoin.bind(this);
	        this.clientSession = cs;
	        cs.onData('text', this.notifyData);
	        cs.onJoin('text', this.notifyJoin);
	        this.editUtil = null;
	    }
	    ScratchControl.prototype.reset = function () {
	        this.textValue = '';
	        this.selectionStart = 0;
	        this.selectionEnd = 0;
	    };
	    ScratchControl.prototype.doneEdits = function (ok) {
	    };
	    ScratchControl.prototype.notifyData = function (cs, a) {
	        if (a === undefined)
	            this.reset();
	        else {
	            var s = a;
	            if (s) {
	                var cursor = this.editUtil.extractCursor(cs.session.clientEngine.stateLocal);
	                cursor = cursor ? cursor[cs.clientID] : undefined;
	                var ss = cursor && cursor.selectionStart ? cursor.selectionStart : undefined;
	                var se = cursor && cursor.selectionEnd ? cursor.selectionEnd : ss;
	                this.setTextValue(s, ss, se);
	            }
	        }
	    };
	    ScratchControl.prototype.notifyJoin = function (cs) {
	        if (cs.session.clientEngine)
	            this.editUtil = new OTE.OTEditUtil(this.context, cs.session.sessionID, cs.clientID, 'text');
	        else
	            this.editUtil = null;
	    };
	    ScratchControl.prototype.pushIntoTextArea = function () {
	        if (this.elTextArea) {
	            if (this.elTextArea.value !== this.textValue
	                || this.elTextArea.selectionStart != this.selectionStart
	                || this.elTextArea.selectionEnd != this.selectionEnd) {
	                this.elTextArea.value = this.textValue;
	                selectRange(this.elTextArea, this.selectionStart, this.selectionEnd);
	                this.reRender();
	            }
	        }
	    };
	    ScratchControl.prototype.setTextValue = function (s, selectionStart, selectionEnd) {
	        this.textValue = s;
	        if (selectionStart !== undefined)
	            this.selectionStart = selectionStart;
	        if (selectionEnd !== undefined)
	            this.selectionEnd = selectionEnd;
	        this.pushIntoTextArea();
	    };
	    ScratchControl.prototype.notifyLocalChange = function (sNewVal, s, e) {
	        var css = this.clientSession.session;
	        if (css.clientEngine) {
	            var objOld = css.clientEngine.toValue();
	            var sOldVal = (objOld && objOld['text']) ? objOld['text'] : '';
	            if (sOldVal != sNewVal || s != this.selectionStart || e != this.selectionEnd) {
	                var edit = this.editUtil.computeEdit(sOldVal, sNewVal);
	                this.editUtil.injectCursor(edit, s, e);
	                if (edit.length > 0)
	                    css.addLocal(edit);
	            }
	        }
	        this.setTextValue(sNewVal, s, e);
	    };
	    ScratchControl.prototype.captureElementCB = function (el) {
	        this.elTextArea = el;
	        this.pushIntoTextArea();
	    };
	    return ScratchControl;
	}());
	exports.ScratchControl = ScratchControl;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(6), __webpack_require__(7));
		else if(typeof define === 'function' && define.amd)
			define(["@terrencecrowley/ot-js", "diff-match-patch"], factory);
		else if(typeof exports === 'object')
			exports["ot-editutil"] = factory(require("@terrencecrowley/ot-js"), require("diff-match-patch"));
		else
			root["ot-editutil"] = factory(root["@terrencecrowley/ot-js"], root["diff-match-patch"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
	return /******/ (function(modules) { // webpackBootstrap
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
		var OT = __webpack_require__(1);
		var DMP = __webpack_require__(2);
		var DiffMatchPatch = new DMP.diff_match_patch();
		var DIFF_DELETE = DMP.DIFF_DELETE;
		var DIFF_INSERT = DMP.DIFF_INSERT;
		var DIFF_EQUAL = DMP.DIFF_EQUAL;
		var OTEditUtil = (function () {
		    // Constructor
		    function OTEditUtil(ctx, rid, cid, name) {
		        this.context = ctx;
		        this.resourceID = rid;
		        this.clientID = cid;
		        this.resourceName = name;
		    }
		    //
		    // Function: insertAtStart
		    //
		    // Description:
		    //	Generate an OTCompositeResource to insert a string at the start of a buffer of the given size.
		    //
		    OTEditUtil.prototype.insertAtStart = function (s, nCurrentLen) {
		        var edit = new OT.OTCompositeResource(this.resourceID, this.clientID);
		        var sEdit = new OT.OTStringResource(this.resourceName);
		        sEdit.edits.push([OT.OpInsert, s.length, s]);
		        sEdit.edits.push([OT.OpCursor, 0, '']);
		        sEdit.edits.push([OT.OpRetain, nCurrentLen, '']);
		        edit.edits.push(sEdit);
		        return edit;
		    };
		    //
		    // Function: insertAtEnd
		    //
		    // Description:
		    //	Generate an OTCompositeResource to insert a string at the end of a buffer of the given size.
		    //
		    OTEditUtil.prototype.insertAtEnd = function (s, nCurrentLen) {
		        var edit = new OT.OTCompositeResource(this.resourceID, this.clientID);
		        var sEdit = new OT.OTStringResource(this.resourceName);
		        sEdit.edits.push([OT.OpRetain, nCurrentLen, '']);
		        sEdit.edits.push([OT.OpInsert, s.length, s]);
		        sEdit.edits.push([OT.OpCursor, 0, '']);
		        edit.edits.push(sEdit);
		        return edit;
		    };
		    //
		    // Function: injectCursor
		    //
		    // Inject start/end cursor positions into an existing string resource.
		    //
		    OTEditUtil.prototype.injectCursor = function (edit, start, end) {
		        if (start === undefined)
		            return;
		        if (end === undefined)
		            end = start;
		        var sEdit = edit.findResource(this.resourceName);
		        if (sEdit == null)
		            return;
		        var cEdit = new OT.OTStringResource(this.resourceName);
		        if (start != 0)
		            cEdit.edits.push([OT.OpRetain, start, '']);
		        cEdit.edits.push([OT.OpCursor, 0, this.clientID]);
		        if (end != start) {
		            cEdit.edits.push([OT.OpRetain, end - start, '']);
		            cEdit.edits.push([OT.OpCursor, 1, this.clientID]);
		        }
		        var nFinal = sEdit.finalLength();
		        if (end != nFinal)
		            cEdit.edits.push([OT.OpRetain, nFinal - end, '']);
		        sEdit.compose(cEdit);
		    };
		    //
		    // Function: extractCursor
		    //
		    // Extract cursor information by client. Returns an object indexed by clientID with an object with
		    // properties startSelection, endSelection.
		    //
		    OTEditUtil.prototype.extractCursor = function (edit) {
		        var cursors = {};
		        var sEdit = edit.findResource(this.resourceName);
		        if (sEdit == null)
		            return cursors;
		        var pos = 0;
		        for (var i = 0; i < sEdit.length; i++) {
		            var a = sEdit.edits[i];
		            switch (a[0]) {
		                case OT.OpInsert:
		                    pos += a[1];
		                    break;
		                case OT.OpDelete:
		                    break;
		                case OT.OpRetain:
		                    pos += a[1];
		                    break;
		                case OT.OpCursor:
		                    if (a[2] != '') {
		                        var sel = cursors[a[2]]; // a[2] is clientID
		                        if (sel === undefined) {
		                            sel = {};
		                            cursors[a[2]] = sel;
		                        }
		                        if (a[1] == 0)
		                            sel['selectionStart'] = pos; // 0 is selectionStart
		                        else
		                            sel['selectionEnd'] = pos; // 1 is selectionEnd
		                    }
		                    break;
		                case OT.OpSet:
		                    pos += a[1];
		                    break;
		            }
		        }
		        return cursors;
		    };
		    //
		    // Function: computeEdit
		    //
		    // Description:
		    //	Given an old and new string, generate the (minimal) edits list necessary to convert the old
		    //	string into the new string.
		    //
		    // 	This is useful if you're not actually tracking the specfic edit operations happening to the
		    //	underlying string but rather just examining old and new values and trying to transmit
		    //	minimal diffs.
		    //
		    //	There are various good algorithms for computing the "edit distance" between two strings.
		    //	Here I've used the google DiffMatchPatch algorithm.
		    //
		    OTEditUtil.prototype.computeEdit = function (sOld, sNew) {
		        var edit = new OT.OTCompositeResource(this.resourceID, this.clientID);
		        var sEdit = new OT.OTStringResource(this.resourceName);
		        var diffs = DiffMatchPatch.diff_main(sOld, sNew);
		        if (diffs)
		            for (var i = 0; i < diffs.length; i++) {
		                var diff = diffs[i];
		                var s = diff[1];
		                switch (diff[0]) {
		                    case DIFF_DELETE:
		                        sEdit.edits.push([OT.OpDelete, s.length, '']);
		                        break;
		                    case DIFF_INSERT:
		                        sEdit.edits.push([OT.OpInsert, s.length, s]);
		                        break;
		                    case DIFF_EQUAL:
		                        sEdit.edits.push([OT.OpRetain, s.length, '']);
		                        break;
		                }
		            }
		        edit.edits.push(sEdit);
		        return edit;
		    };
		    return OTEditUtil;
		}());
		exports.OTEditUtil = OTEditUtil;
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		module.exports = __webpack_require__(6);
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = __webpack_require__(7);
	
	/***/ }
	/******/ ])
	});
	;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["ot-js"] = factory();
		else
			root["ot-js"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
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
		function __export(m) {
		    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
		}
		__export(__webpack_require__(1));
		__export(__webpack_require__(3));
		__export(__webpack_require__(4));
		__export(__webpack_require__(5));
		__export(__webpack_require__(6));
		__export(__webpack_require__(7));
		__export(__webpack_require__(2));
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var OT = __webpack_require__(2);
		var TestUnitSize = 4;
		var TestCounter = 0;
		// Array Ops
		exports.OpInsert = 1;
		exports.OpDelete = 2;
		exports.OpRetain = 3;
		exports.OpCursor = 4; // 2nd arg is 0/1 for start/end of region, 3rd arg is clientID
		exports.OpSet = 5;
		exports.OpTmpRetain = 6;
		var OTalignEdgesType;
		(function (OTalignEdgesType) {
		    OTalignEdgesType[OTalignEdgesType["AlignForCompose"] = 0] = "AlignForCompose";
		    OTalignEdgesType[OTalignEdgesType["AlignForTransform"] = 1] = "AlignForTransform";
		})(OTalignEdgesType || (OTalignEdgesType = {}));
		;
		;
		// Operates on a single "OTSingleArrayEdit", parameterized by an object that manipulates the underlying
		// array-like value stored as the third property of the 3-element edit object.
		var OTSingleArrayEditor = (function () {
		    function OTSingleArrayEditor(raw) {
		        this.raw = raw;
		    }
		    OTSingleArrayEditor.prototype.copy = function (a) { return [a[0], a[1], this.raw.copy(a[2])]; };
		    // Static Predicates for MoveAction
		    OTSingleArrayEditor.prototype.isDelete = function (a) { return a[0] == exports.OpDelete; };
		    OTSingleArrayEditor.prototype.isNotDelete = function (a) { return a[0] != exports.OpDelete; };
		    OTSingleArrayEditor.prototype.isCursor = function (a) { return a[0] == exports.OpCursor; };
		    OTSingleArrayEditor.prototype.isNotCursor = function (a) { return a[0] != exports.OpCursor; };
		    OTSingleArrayEditor.prototype.isTmpRetain = function (a) { return a[0] == exports.OpTmpRetain; };
		    OTSingleArrayEditor.prototype.isNotTmpRetainOrDelete = function (a) { return (a[0] != exports.OpTmpRetain && a[0] != exports.OpDelete); };
		    OTSingleArrayEditor.prototype.isTmpRetainOrDelete = function (a) { return (a[0] == exports.OpTmpRetain || a[0] == exports.OpDelete); };
		    // Other static predicates
		    OTSingleArrayEditor.prototype.isIgnore = function (a) { return a[0] < 0; };
		    OTSingleArrayEditor.prototype.isNoOp = function (a) { return a[1] === 0 && a[0] != exports.OpCursor; };
		    OTSingleArrayEditor.prototype.isEqual = function (a1, a2) { return a1[0] == a2[0] && a1[1] == a2[1] && this.raw.equal(a1[2], a2[2]); };
		    // Helpers
		    OTSingleArrayEditor.prototype.appendValue = function (a, s) { a[2] = this.raw.append(a[2], s); a[1] = a[1] + this.raw.length(s); };
		    OTSingleArrayEditor.prototype.empty = function (a) { a[0] = exports.OpCursor; a[1] = 0; a[2] = this.raw.empty(); };
		    OTSingleArrayEditor.prototype.setIgnore = function (a) { if (a[0] > 0)
		        a[0] = -a[0]; };
		    OTSingleArrayEditor.prototype.substr = function (aIn, pos, len) {
		        var sSource = aIn[2];
		        if (len > 0 && pos + len <= this.raw.length(sSource))
		            aIn[2] = this.raw.substr(sSource, pos, len);
		        aIn[1] = len;
		    };
		    OTSingleArrayEditor.prototype.substrFromRaw = function (aIn, pos, len, s) {
		        var sSource = s;
		        if (len > 0 && pos + len <= this.raw.length(sSource))
		            aIn[2] = this.raw.substr(sSource, pos, len);
		        aIn[1] = len;
		    };
		    OTSingleArrayEditor.prototype.copyWithSubstr = function (aIn, pos, len) {
		        var aOut = this.copy(aIn);
		        this.substr(aOut, pos, len);
		        return aOut;
		    };
		    return OTSingleArrayEditor;
		}());
		exports.OTSingleArrayEditor = OTSingleArrayEditor;
		;
		var OTStringOperations = (function () {
		    function OTStringOperations() {
		    }
		    OTStringOperations.prototype.underlyingTypeName = function () { return 'string'; };
		    OTStringOperations.prototype.empty = function () { return ''; };
		    OTStringOperations.prototype.insert = function (a, pos, aInsert) {
		        var s = a;
		        var sInsert = aInsert;
		        return s.substr(0, pos) + sInsert + s.substr(pos);
		    };
		    OTStringOperations.prototype.delete = function (a, pos, len) {
		        var s = a;
		        return s.substr(0, pos) + s.substr(pos + len);
		    };
		    OTStringOperations.prototype.set = function (a, pos, aSet) {
		        var s = a;
		        var sSet = aSet;
		        return s.substr(0, pos) + sSet + s.substr(pos + sSet.length);
		    };
		    OTStringOperations.prototype.append = function (a, aAppend) {
		        var s = a;
		        var sAppend = aAppend;
		        return s + sAppend;
		    };
		    OTStringOperations.prototype.substr = function (a, pos, len) {
		        var s = a;
		        return s.substr(pos, len);
		    };
		    OTStringOperations.prototype.substrOf = function (a, pos, len, aSub) {
		        // a unused if not updated with return value contents
		        var sSub = aSub;
		        return sSub.substr(pos, len);
		    };
		    OTStringOperations.prototype.constructN = function (n) {
		        var x = ' ';
		        var s = '';
		        for (;;) {
		            if (n & 1)
		                s += x;
		            n >>= 1;
		            if (n)
		                x += x;
		            else
		                break;
		        }
		        return s;
		    };
		    OTStringOperations.prototype.equal = function (a1, a2) {
		        var s1 = a1;
		        var s2 = a2;
		        return s1 === s2;
		    };
		    OTStringOperations.prototype.copy = function (a) { return a; };
		    OTStringOperations.prototype.length = function (a) { return a.length; };
		    return OTStringOperations;
		}());
		exports.OTStringOperations = OTStringOperations;
		;
		var OTArrayOperations = (function () {
		    function OTArrayOperations() {
		    }
		    OTArrayOperations.prototype.underlyingTypeName = function () { return 'array'; };
		    OTArrayOperations.prototype.empty = function () { return []; };
		    OTArrayOperations.prototype.insert = function (a, pos, aInsert) {
		        var arr = a;
		        var arrInsert = aInsert;
		        var arrReturn = Array(arr.length + arrInsert.length);
		        var i, j;
		        for (i = 0; i < pos; i++)
		            arrReturn[i] = arr[i];
		        for (j = 0; j < arrInsert.length; j++)
		            arrReturn[i + j] = arrInsert[j];
		        for (i = pos; i < arr.length; i++)
		            arrReturn[i + j] = arr[i];
		        return arrReturn;
		    };
		    OTArrayOperations.prototype.delete = function (a, pos, len) {
		        var arr = a;
		        arr.splice(pos, len);
		        return arr;
		    };
		    OTArrayOperations.prototype.set = function (a, pos, aSet) {
		        var arr = a;
		        var arrSet = aSet;
		        for (var i = 0; i < arrSet.length; i++)
		            arr[i + pos] = arrSet[i];
		        return arr;
		    };
		    OTArrayOperations.prototype.append = function (a, aAppend) {
		        var arr = a;
		        var arrAppend = aAppend;
		        return arr.concat(arrAppend);
		    };
		    OTArrayOperations.prototype.substr = function (a, pos, len) {
		        var arr = a;
		        return arr.slice(pos, pos + len);
		    };
		    OTArrayOperations.prototype.substrOf = function (a, pos, len, aSub) {
		        // a unused if not updated with return value contents
		        var arrSub = aSub;
		        return arrSub.slice(pos, pos + len);
		    };
		    OTArrayOperations.prototype.constructN = function (n) {
		        return new Array(n);
		    };
		    OTArrayOperations.prototype.equal = function (a1, a2) {
		        var arr1 = a1;
		        var arr2 = a2;
		        if (arr1.length != arr2.length)
		            return false;
		        for (var i = 0; i < arr1.length; i++)
		            if (arr1[i] !== arr2[i])
		                return false;
		        return true;
		    };
		    OTArrayOperations.prototype.copy = function (a) {
		        var arr = a;
		        var arrRet = new Array(arr.length);
		        for (var i = 0; i < arr.length; i++)
		            arrRet[i] = arr[i];
		        return arrRet;
		    };
		    OTArrayOperations.prototype.length = function (a) {
		        return a.length;
		    };
		    return OTArrayOperations;
		}());
		exports.OTArrayOperations = OTArrayOperations;
		;
		var OTArrayLikeResource = (function (_super) {
		    __extends(OTArrayLikeResource, _super);
		    function OTArrayLikeResource(ed, rname) {
		        _super.call(this, rname, ed.raw.underlyingTypeName());
		        this.editor = ed;
		    }
		    OTArrayLikeResource.prototype.copy = function () {
		        return null; // Needs to be overridden
		    };
		    OTArrayLikeResource.prototype.moveEdits = function (newA, iStart, iEnd, pred) {
		        if (iEnd == undefined)
		            iEnd = this.edits.length - 1;
		        for (; iStart <= iEnd; iStart++) {
		            var a = this.edits[iStart];
		            if (!this.editor.isIgnore(a) && (pred == undefined || pred(a)))
		                newA.push(a);
		        }
		    };
		    OTArrayLikeResource.prototype.equal = function (rhs) {
		        if (this.length != rhs.length)
		            return false;
		        for (var i = 0; i < this.length; i++)
		            if (!this.editor.isEqual(this.edits[i], rhs.edits[i]))
		                return false;
		        return true;
		    };
		    // Function: OTArrayLikeResource::effectivelyEqual
		    //
		    // Description:
		    //	A looser definition than operator==. Returns true if two actions would result in the
		    //	same final string. This ignores no-ops like OpCursor and allows different orderings of
		    //	inserts and deletes at the same location.
		    //
		    //  Played around with different algorithms, but the simplest is probably just to apply
		    //	the two actions and see if I get the same final string. Came up with an interesting
		    //	algorithm of walking through comparing hashes, but that was not robust to operations
		    //	being split into fragments and interposed with alternate ops (OpCursor or interleaving of Ins/Del)
		    //	that still leave the string the same. If unhappy with this approach (which scales with size
		    //	of string to edit rather than complexity of the edit), the other approach would be to canonicalize
		    //	the edit operations (including removing cursor operations and normalizing order of deletes).
		    //	(Added that version of the algorithm under #ifdef). Could also dynamically choose approach based
		    //	on relative size of arrays.
		    //
		    OTArrayLikeResource.prototype.effectivelyEqual = function (rhs) {
		        // Exactly equal is always effectively equal
		        if (this.equal(rhs))
		            return true;
		        if (this.originalLength() != rhs.originalLength())
		            return false;
		        // Preferred algorithm
		        var s = this.editor.raw.constructN(this.originalLength());
		        var sL = this.apply(s);
		        var sR = rhs.apply(s);
		        return sL === sR;
		        // Alternate algorithm (see above)
		        //let aL: OTArrayLikeResource = this.copy();
		        //let aR: OTArrayLikeResource = rhs.copy();
		        //aL.fullyCoalesce();
		        //aR.fullyCoalesce();
		        //return aL.equal(aR);
		    };
		    OTArrayLikeResource.prototype.basesConsistent = function (rhs) {
		        if (this.originalLength() != rhs.originalLength()) {
		            console.log("Logic Failure: transform: Bases Inconsistent.");
		            throw ("Logic Failure: transform: Bases Inconsistent.");
		        }
		    };
		    OTArrayLikeResource.prototype.originalLength = function () {
		        var len = 0;
		        for (var i = 0; i < this.length; i++) {
		            var a = this.edits[i];
		            if (a[0] == exports.OpRetain || a[0] == exports.OpDelete || a[0] == exports.OpSet)
		                len += a[1];
		        }
		        return len;
		    };
		    OTArrayLikeResource.prototype.finalLength = function () {
		        var len = 0;
		        for (var i = 0; i < this.length; i++) {
		            var a = this.edits[i];
		            if (a[0] == exports.OpRetain || a[0] == exports.OpInsert || a[0] == exports.OpSet)
		                len += a[1];
		        }
		        return len;
		    };
		    OTArrayLikeResource.prototype.apply = function (aValue) {
		        if (aValue == null)
		            aValue = this.editor.raw.empty();
		        var pos = 0;
		        for (var i = 0; i < this.length; i++) {
		            var a = this.edits[i];
		            switch (a[0]) {
		                case exports.OpRetain:
		                    pos += a[1];
		                    break;
		                case exports.OpCursor:
		                    break;
		                case exports.OpDelete:
		                    aValue = this.editor.raw.delete(aValue, pos, a[1]);
		                    break;
		                case exports.OpInsert:
		                    aValue = this.editor.raw.insert(aValue, pos, a[2]);
		                    pos += a[1];
		                    break;
		                case exports.OpSet:
		                    aValue = this.editor.raw.set(aValue, pos, a[2]);
		                    pos += a[1];
		                    break;
		            }
		        }
		        return aValue;
		    };
		    OTArrayLikeResource.prototype.coalesce = function (bDeleteCursor) {
		        if (bDeleteCursor === void 0) { bDeleteCursor = false; }
		        if (this.length == 0)
		            return;
		        // coalesce adjoining actions and delete no-ops
		        var newA = [];
		        var aLast;
		        for (var i = 0; i < this.length; i++) {
		            var aNext = this.edits[i];
		            if (this.editor.isNoOp(aNext) || (bDeleteCursor && aNext[0] == exports.OpCursor))
		                continue;
		            if (newA.length > 0 && aNext[0] == aLast[0]) {
		                if (aNext[0] == exports.OpInsert || aNext[0] == exports.OpSet)
		                    this.editor.appendValue(aLast, aNext[2]);
		                else
		                    aLast[1] += aNext[1];
		            }
		            else {
		                newA.push(aNext);
		                aLast = aNext;
		            }
		        }
		        this.edits = newA;
		    };
		    // Function: fullyCoalesce
		    //
		    // Description:
		    //	Heavier duty version of coalesce that fully normalizes so that two actions that result in same
		    //	final edit are exactly the same. This normalizes order of insert/deletes and deletes OpCursor,
		    //	and then does coalesce.
		    //
		    OTArrayLikeResource.prototype.fullyCoalesce = function () {
		        // TODO
		        this.coalesce(true);
		    };
		    // Function: Invert
		    //
		    // Description:
		    //	Given an action, convert it to its inverse (action + inverse) = identity (retain(n)).
		    //
		    //	Note that in order to compute the inverse, you need the input state (e.g. because in order to invert
		    //	OpDelete, you need to know the deleted characters.
		    //
		    OTArrayLikeResource.prototype.invert = function (sInput) {
		        var pos = 0; // Tracks position in input string.
		        for (var i = 0; i < this.length; i++) {
		            var a = this.edits[i];
		            switch (a[0]) {
		                case exports.OpCursor:
		                    break;
		                case exports.OpRetain:
		                    pos += a[1];
		                    break;
		                case exports.OpInsert:
		                    a[2] = '';
		                    a[0] = exports.OpDelete;
		                    break;
		                case exports.OpDelete:
		                    a[2] = this.editor.copyWithSubstr(sInput, pos, a[1]);
		                    a[0] = exports.OpInsert;
		                    pos += a[1];
		                    break;
		                case exports.OpSet:
		                    a[2] = this.editor.copyWithSubstr(sInput, pos, a[1]);
		                    pos += a[1];
		                    break;
		            }
		        }
		    };
		    // Function: alignEdges
		    //
		    // Description:
		    //	Slice up this action sequence so its edges align with the action sequence I am going to
		    //	process it with. The processing (compose or transform) determines which actions Slice
		    //	takes into account when moving the parallel counters forward. When processing for
		    //	compose, deletes in rhs can be ignored. When processing for transform, inserts in both
		    //	lhs and rhs can be ignored.
		    //	
		    OTArrayLikeResource.prototype.alignEdges = function (rhs, st) {
		        var posR = 0;
		        var posL = 0;
		        var iL = 0;
		        var newA = [];
		        var aAfter = undefined;
		        var aL = undefined;
		        for (var iR = 0; iR < rhs.length; iR++) {
		            var aR = rhs.edits[iR];
		            switch (aR[0]) {
		                case exports.OpCursor:
		                    break;
		                case exports.OpInsert:
		                    break;
		                case exports.OpDelete:
		                    posR += aR[1];
		                    break;
		                case exports.OpSet:
		                    posR += aR[1];
		                    break;
		                case exports.OpRetain:
		                    posR += aR[1];
		                    break;
		            }
		            // Advance iL/posL to equal to posR
		            while (posL < posR && (aAfter != undefined || iL < this.length)) {
		                if (aAfter == undefined) {
		                    aL = this.edits[iL];
		                    newA.push(aL);
		                    iL++;
		                }
		                else {
		                    aL = aAfter;
		                }
		                switch (aL[0]) {
		                    case exports.OpCursor:
		                        break;
		                    case exports.OpInsert:
		                        if (st == OTalignEdgesType.AlignForCompose)
		                            posL += aL[1];
		                        break;
		                    case exports.OpDelete:
		                        if (st == OTalignEdgesType.AlignForTransform)
		                            posL += aL[1];
		                        break;
		                    case exports.OpSet:
		                        posL += aL[1];
		                        break;
		                    case exports.OpRetain:
		                        posL += aL[1];
		                        break;
		                }
		                // Split this one if it spans boundary
		                if (posL > posR) {
		                    var nRight = posL - posR;
		                    var nLeft = aL[1] - nRight;
		                    aAfter = this.editor.copyWithSubstr(aL, nLeft, nRight);
		                    this.editor.substr(aL, 0, nLeft);
		                    newA.push(aAfter);
		                    posL = posR;
		                }
		                else
		                    aAfter = undefined;
		            }
		        }
		        // Append any we missed
		        this.moveEdits(newA, iL);
		        this.edits = newA;
		    };
		    OTArrayLikeResource.prototype.getCursorCache = function () {
		        var cursorCache = {};
		        for (var i = 0; i < this.length; i++) {
		            var a = this.edits[i];
		            if (a[0] == exports.OpCursor && a[2] != null)
		                cursorCache[a[2]] = '';
		        }
		        return cursorCache;
		    };
		    // Function: compose
		    //
		    // Description:
		    //	compose the current action with the action passed in. This alters the current action.
		    //
		    //	Basic structure is to walk through the RHS list of actions, processing each one in turn.
		    //	That then drives the walk through the left hand side and the necessary edits. I use
		    //	"posR" and "posL" to work through equivalent positions in the two strings being edited.
		    //	Deletions in the LHS don't effect posL because they don't show up in the input string to RHS.
		    //	Similarly, insertions in the RHS don't effect posR since they have no equivalent string location
		    //	in the LHS.	(Note transform follows similar structure but different logic for how posR and posL
		    //	track each other since in that case they are effectively referencing the same input string.)
		    //
		    OTArrayLikeResource.prototype.compose = function (rhs) {
		        var cursorCache = rhs.getCursorCache();
		        if (this.length == 0) {
		            this.edits = rhs.edits.map(this.editor.copy, this.editor);
		            return;
		        }
		        else if (rhs.edits.length == 0)
		            return;
		        if (this.finalLength() != rhs.originalLength()) {
		            console.log("Logic Failure: compose: Bases Inconsistent.");
		            throw ("Logic Failure: compose: Bases Inconsistent.");
		        }
		        // Break overlapping segments before start to simplify logic below.
		        this.alignEdges(rhs, OTalignEdgesType.AlignForCompose);
		        // Iterate with parallel position markers in two arrays
		        var posR = 0;
		        var posL = 0;
		        var iL = 0;
		        var bDone;
		        var newA = [];
		        for (var iR = 0; iR < rhs.length; iR++) {
		            var aR = rhs.edits[iR];
		            switch (aR[0]) {
		                case exports.OpRetain:
		                    posR += aR[1];
		                    break;
		                case exports.OpSet:
		                case exports.OpDelete:
		                case exports.OpInsert:
		                case exports.OpCursor:
		                    // Advance to cursor location
		                    bDone = false;
		                    while (!bDone && iL < this.length) {
		                        var aL = this.edits[iL];
		                        switch (aL[0]) {
		                            case exports.OpCursor:
		                                // Only copy old cursor locations if they aren't empty and aren't duplicated in this rhs.
		                                if (aL[2] != '' && cursorCache[aL[2]] === undefined)
		                                    newA.push(aL);
		                                iL++;
		                                break;
		                            case exports.OpSet:
		                            case exports.OpRetain:
		                            case exports.OpInsert:
		                                if (posL == posR)
		                                    bDone = true;
		                                else {
		                                    posL += aL[1];
		                                    newA.push(aL);
		                                    iL++;
		                                }
		                                break;
		                            case exports.OpDelete:
		                                newA.push(aL);
		                                iL++; // Move past since deletes are not referenced by RHS
		                                break;
		                        }
		                    }
		                    if (aR[0] == exports.OpDelete) {
		                        // Remove sequence of cursor, insert, retains, sets, replaced by delete.
		                        // Note that insert/delete cancel each other out, so there is a bit of complexity there.
		                        var nChange = aR[1];
		                        var nRemain = aR[1];
		                        for (; nChange > 0 && iL < this.length; iL++) {
		                            var aL = this.edits[iL];
		                            switch (aL[0]) {
		                                case exports.OpCursor:
		                                    // Only copy old cursor locations if they aren't empty and aren't duplicated in this rhs.
		                                    if (aL[2] != '' && cursorCache[aL[2]] === undefined)
		                                        newA.push(aL);
		                                    break;
		                                case exports.OpDelete:
		                                    newA.push(aL);
		                                    break;
		                                case exports.OpSet:
		                                case exports.OpRetain:
		                                case exports.OpInsert:
		                                    nRemain -= aL[0] == exports.OpInsert ? aL[1] : 0;
		                                    nChange -= aL[1];
		                                    // Don't copy into new array
		                                    break;
		                            }
		                        }
		                        // Now add in the delete
		                        if (nRemain > 0)
		                            newA.push([exports.OpDelete, nRemain, '']);
		                    }
		                    else if (aR[0] == exports.OpSet) {
		                        // Process sequence of cursor, insert, retains, sets
		                        var nChange = aR[1];
		                        for (; nChange > 0 && iL < this.length; iL++) {
		                            var aL = this.edits[iL];
		                            var opL = exports.OpInsert;
		                            switch (aL[0]) {
		                                case exports.OpCursor:
		                                    // Only copy old cursor locations if they aren't empty and aren't duplicated in this rhs.
		                                    if (aL[2] != '' && cursorCache[aL[2]] === undefined)
		                                        newA.push(aL);
		                                    break;
		                                case exports.OpDelete:
		                                    newA.push(aL);
		                                    break;
		                                case exports.OpSet:
		                                case exports.OpRetain:
		                                    opL = exports.OpSet;
		                                // fallthrough
		                                case exports.OpInsert:
		                                    // A Set composed with Insert becomes Insert of Set content
		                                    this.editor.substrFromRaw(aL, aR[1] - nChange, aL[1], aR[2]);
		                                    aL[0] = opL;
		                                    nChange -= aL[1];
		                                    newA.push(aL);
		                                    break;
		                            }
		                        }
		                    }
		                    else {
		                        // Add in the RHS operation at proper location
		                        newA.push(this.editor.copy(aR));
		                    }
		                    break;
		            }
		        }
		        // copy any remaining actions, excluding cursors duplicated in rhs
		        this.moveEdits(newA, iL, this.length - 1, function (e) { return (e[0] != exports.OpCursor) || (e[2] != '' && cursorCache[e[2]] === undefined); });
		        this.edits = newA;
		        this.coalesce();
		    };
		    OTArrayLikeResource.prototype.performTransformReorder = function (bForceRetainBeforeInsert, newA, iBegin, iEnd) {
		        if (iBegin < 0 || iBegin > iEnd)
		            return;
		        if (bForceRetainBeforeInsert) {
		            this.moveEdits(newA, iBegin, iEnd, this.editor.isTmpRetainOrDelete);
		            this.moveEdits(newA, iBegin, iEnd, this.editor.isNotTmpRetainOrDelete); // Is Insert or Cursor
		        }
		        else {
		            this.moveEdits(newA, iBegin, iEnd, this.editor.isNotTmpRetainOrDelete); // Is Insert or Cursor
		            this.moveEdits(newA, iBegin, iEnd, this.editor.isTmpRetainOrDelete);
		        }
		    };
		    // Function: normalizeNewRetainsAfterTransform
		    //
		    // Description:
		    //	Helper function for transform() that does a post-processing pass to ensure that all
		    //	Retains are properly ordered with respect to Inserts that occur at the same location
		    //	(either before or after, depending on whether we are transforming based on server or client side).
		    //	This ensures that the transform process is not sensitive to precise ordering of Inserts and
		    //	Retains (since that ordering doesn't actually change the semantics of the edit performed and
		    //	therefore should not result in a difference in processing here). And yes, it's a subtle issue
		    //	that may not actually occur in real edits produced by some particular editor but does arise when
		    //	testing against randomly generated edit streams.
		    //
		    //	A side consequence is also normalizing the ordering of inserts and deletes which also doesn't
		    //	change the semantics of the edit but ensures we properly detect conflicting insertions.
		    //
		    //	The way to think of this algorithm is that Set's and Retains (pre-existing, not new TmpRetains) form
		    //	hard boundaries in the ordering. The series of Cursor/TmpRetain/Insert/Deletes between Sets and Retains
		    //	are re-ordered by this algorithm. TmpRetain's get pushed to the front or the back depending on the bForce
		    //	flag passed in (which reflects which operation had precedence).
		    //
		    OTArrayLikeResource.prototype.normalizeNewRetainsAfterTransform = function (bForceRetainBeforeInsert) {
		        if (this.length == 0)
		            return;
		        var i = 0;
		        var newA = [];
		        var iLastEdge = 0;
		        // Normalize ordering for newly insert retains so they are properly ordered
		        // with respect to inserts occurring at the same location.
		        for (i = 0; i < this.length; i++) {
		            var a = this.edits[i];
		            if (a[0] == exports.OpSet || a[0] == exports.OpRetain) {
		                this.performTransformReorder(bForceRetainBeforeInsert, newA, iLastEdge, i - 1);
		                newA.push(a);
		                iLastEdge = i + 1;
		            }
		        }
		        this.performTransformReorder(bForceRetainBeforeInsert, newA, iLastEdge, this.length - 1);
		        // One last time to switch TmpRetain to Retain
		        for (i = 0; i < newA.length; i++)
		            if ((newA[i])[0] == exports.OpTmpRetain)
		                (newA[i])[0] = exports.OpRetain;
		        this.edits = newA;
		    };
		    OTArrayLikeResource.prototype.transform = function (prior, bPriorIsService) {
		        if (this.length == 0 || prior.length == 0)
		            return;
		        // Validate
		        this.basesConsistent(prior);
		        // Break overlapping segments before start to simplify logic below.
		        this.alignEdges(prior, OTalignEdgesType.AlignForTransform);
		        var posR = 0; // These walk in parallel across the consistent base strings (only retains, sets and deletes count)
		        var posL = 0;
		        var iL = 0;
		        var bDone;
		        var newA = [];
		        for (var iR = 0; iR < prior.length; iR++) {
		            var aR = prior.edits[iR];
		            switch (aR[0]) {
		                case exports.OpCursor:
		                    // No-op
		                    break;
		                case exports.OpInsert:
		                    {
		                        // Converts to a retain.
		                        // Need to find spot to insert retain. After loop, iL will contain location
		                        for (; iL < this.length; iL++) {
		                            if (posR == posL)
		                                break;
		                            var aL = this.edits[iL];
		                            if (this.editor.isIgnore(aL))
		                                continue;
		                            if (aL[0] != exports.OpCursor && aL[0] != exports.OpInsert)
		                                posL += aL[1];
		                            newA.push(aL);
		                        }
		                        var nRetain = aR[1];
		                        newA.push([exports.OpTmpRetain, nRetain, '']);
		                        posR += nRetain;
		                        posL += nRetain;
		                    }
		                    break;
		                case exports.OpSet:
		                    // Somewhat unintuitively, if prior is *not* service, then it will actually get applied *after*
		                    // the service instance of OpSet and so should take precedence. Therefore if prior is not service,
		                    // we need to go through and convert "OpSets" that overlap to be this content. If prior is service,
		                    // we can just treat them as "retains" since they have no effect on our operations.
		                    if (bPriorIsService)
		                        posR += aR[1];
		                    else {
		                        var nRemaining = aR[1];
		                        while (nRemaining > 0 && iL < this.length) {
		                            var aL = this.edits[iL];
		                            if (this.editor.isIgnore(aL)) {
		                                iL++;
		                                continue;
		                            }
		                            var valL = aL[1];
		                            if (aL[0] == exports.OpCursor || aL[0] == exports.OpInsert) {
		                                iL++;
		                                newA.push(aL);
		                            }
		                            else {
		                                if (posR >= posL + valL) {
		                                    // Not there yet
		                                    posL += valL;
		                                    iL++;
		                                    newA.push(aL);
		                                }
		                                else {
		                                    if (aL[0] == exports.OpDelete || aL[0] == exports.OpRetain) {
		                                        if (valL <= nRemaining) {
		                                            posR += valL;
		                                            posL += valL;
		                                            nRemaining -= valL;
		                                            iL++;
		                                            newA.push(aL);
		                                        }
		                                        else {
		                                            // Not subsumed, but means that I didn't encounter an OpSet
		                                            posR += nRemaining;
		                                            nRemaining = 0;
		                                        }
		                                    }
		                                    else {
		                                        if (aL[1] <= nRemaining) {
		                                            posR += valL;
		                                            posL += valL;
		                                            this.editor.substrFromRaw(aL, aR[1] - nRemaining, valL, aR[2]);
		                                            nRemaining -= valL;
		                                            iL++;
		                                            newA.push(aL);
		                                        }
		                                        else {
		                                            // don't advance posL or iL because we will re-process the left over
		                                            // part for the next action. Simply edit the data in place.
		                                            // Set [0, nRemaining] of aL.Data to [aR[1]-nRemaining, nRemaining]
		                                            //aL.Data.delete(0, nRemaining);
		                                            //aL.Data.InsertValue(0, aR.Data, aR[1]-nRemaining, nRemaining);
		                                            aL[2] = aR[2].substr(aR[1] - nRemaining) + aL[2].substr(nRemaining);
		                                            posR += nRemaining;
		                                            nRemaining = 0;
		                                        }
		                                    }
		                                }
		                            }
		                        }
		                    }
		                    break;
		                case exports.OpDelete:
		                    {
		                        var nRemaining = aR[1];
		                        var nDelay = 0;
		                        var iDelay = void 0;
		                        // Retains, sets and deletes are subsumed by prior deletes
		                        for (; nRemaining > 0 && iL < this.length; iL++) {
		                            var aL = this.edits[iL];
		                            if (this.editor.isIgnore(aL)) {
		                                if (nDelay > 0)
		                                    nDelay++;
		                                continue;
		                            }
		                            if (aL[0] == exports.OpCursor || aL[0] == exports.OpInsert) {
		                                if (nDelay == 0)
		                                    iDelay = iL;
		                                nDelay++;
		                            }
		                            else {
		                                if (posR >= posL + aL[1]) {
		                                    // Go ahead and push any delayed actions
		                                    for (var j = iDelay; nDelay > 0; nDelay--, j++) {
		                                        var aD = this.edits[j];
		                                        if (!this.editor.isIgnore(aD))
		                                            newA.push(aD);
		                                    }
		                                    // Prior to the deleted content
		                                    posL += aL[1];
		                                    newA.push(aL);
		                                }
		                                else {
		                                    // Retain/set/delete is fully subsumed.
		                                    posR += aL[1];
		                                    posL += aL[1];
		                                    nRemaining -= aL[1];
		                                    this.editor.setIgnore(aL);
		                                    if (nDelay > 0)
		                                        nDelay++;
		                                }
		                            }
		                        }
		                        // We want to reprocess any trailing insert/cursors so we recognize conflicting inserts even when
		                        // deletes intervene.
		                        if (nDelay > 0)
		                            iL = iDelay;
		                    }
		                    break;
		                case exports.OpRetain:
		                    // Just advance cursor
		                    posR += aR[1];
		                    break;
		            }
		        }
		        this.moveEdits(newA, iL);
		        this.edits = newA;
		        this.normalizeNewRetainsAfterTransform(bPriorIsService);
		        this.coalesce();
		    };
		    //
		    // Function: generateRandom
		    //
		    // Description:
		    //	Generate action containing a sequence of retain, insert, delete, cursor with the initial
		    //	state of the string being nInitial. Make sure I always generate at least one insert or delete.
		    //	Always operate in units of 4 (.123).
		    //
		    OTArrayLikeResource.prototype.generateRandom = function (nInitial, clientID) {
		        // Ensure clean start
		        this.empty();
		        // Setup randomizer
		        var nOps = 0;
		        var nLen;
		        var nBound;
		        var s;
		        while (nInitial > 0 || nOps == 0) {
		            var op = randomWithinRange(0, 4);
		            nBound = nInitial / TestUnitSize;
		            if (nInitial == 0 && (op == exports.OpDelete || op == exports.OpRetain || op == exports.OpSet))
		                continue;
		            switch (op) {
		                case exports.OpInsert:
		                    nOps++;
		                    nLen = randomWithinRange(1, 5);
		                    s = this.editor.raw.empty();
		                    for (var i = 0; i < nLen; i++)
		                        s = this.editor.raw.append(s, counterValue(this.editor.raw, TestCounter++));
		                    nLen *= TestUnitSize;
		                    this.edits.push([exports.OpInsert, nLen, s]);
		                    break;
		                case exports.OpDelete:
		                    nOps++;
		                    nLen = randomWithinRange(1, nBound > 3 ? nBound / 3 : nBound);
		                    nLen *= TestUnitSize;
		                    nInitial -= nLen;
		                    this.edits.push([exports.OpDelete, nLen, this.editor.raw.empty()]);
		                    break;
		                case exports.OpCursor:
		                    this.edits.push([exports.OpCursor, 0, clientID]);
		                    break;
		                case exports.OpRetain:
		                    nLen = randomWithinRange(1, nBound);
		                    nLen *= TestUnitSize;
		                    nInitial -= nLen;
		                    this.edits.push([exports.OpRetain, nLen, this.editor.raw.empty()]);
		                    break;
		                case exports.OpSet:
		                    nLen = 1;
		                    s = this.editor.raw.empty();
		                    for (var i = 0; i < nLen; i++)
		                        this.editor.raw.append(s, counterValue(this.editor.raw, TestCounter++));
		                    nLen *= TestUnitSize;
		                    nInitial -= nLen;
		                    this.edits.push([exports.OpSet, nLen, s]);
		                    break;
		            }
		        }
		        // Most importantly ensures canonical ordering of inserts and deletes.
		        this.coalesce();
		    };
		    return OTArrayLikeResource;
		}(OT.OTResourceBase));
		exports.OTArrayLikeResource = OTArrayLikeResource;
		var OTStringResource = (function (_super) {
		    __extends(OTStringResource, _super);
		    function OTStringResource(rname) {
		        _super.call(this, OTStringResource._editor, rname);
		    }
		    OTStringResource.factory = function (rname) { return new OTStringResource(rname); };
		    OTStringResource.prototype.copy = function () {
		        var copy = new OTStringResource(this.resourceName);
		        copy.edits = this.edits.map(copy.editor.copy, copy.editor);
		        return copy;
		    };
		    OTStringResource._editor = new OTSingleArrayEditor(new OTStringOperations());
		    return OTStringResource;
		}(OTArrayLikeResource));
		exports.OTStringResource = OTStringResource;
		var OTArrayResource = (function (_super) {
		    __extends(OTArrayResource, _super);
		    function OTArrayResource(rname) {
		        _super.call(this, OTArrayResource._editor, rname);
		    }
		    OTArrayResource.factory = function (rname) { return new OTArrayResource(rname); };
		    OTArrayResource.prototype.copy = function () {
		        var copy = new OTArrayResource(this.resourceName);
		        copy.edits = this.edits.map(copy.editor.copy, copy.editor);
		        return copy;
		    };
		    OTArrayResource._editor = new OTSingleArrayEditor(new OTArrayOperations());
		    return OTArrayResource;
		}(OTArrayLikeResource));
		exports.OTArrayResource = OTArrayResource;
		function randomWithinRange(nMin, nMax) {
		    return nMin + Math.floor(Math.random() * (nMax - nMin + 1));
		}
		function counterValue(ops, c) {
		    switch (ops.underlyingTypeName()) {
		        case 'string':
		            {
		                var a = new Array(TestUnitSize);
		                a[0] = '.';
		                for (var j = 1; j < TestUnitSize; j++, c = Math.floor(c / 10))
		                    a[TestUnitSize - j] = "" + (c % 10);
		                return a.join('');
		            }
		        case 'array':
		            {
		                var a = new Array(TestUnitSize);
		                for (var i = 0; i < TestUnitSize; i++, c += 0.1)
		                    a[i] = c;
		                return a;
		            }
		        default:
		            throw "counterValue: Unexpected underlying array-like type.";
		    }
		}
	
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		// Useful base class
		var OTResourceBase = (function () {
		    function OTResourceBase(rname, utype) {
		        this.resourceName = rname;
		        this.underlyingType = utype;
		        this.edits = [];
		    }
		    Object.defineProperty(OTResourceBase.prototype, "length", {
		        get: function () {
		            return this.edits.length;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    // Set an existing instance of the operation to be empty
		    OTResourceBase.prototype.empty = function () {
		        this.edits = [];
		    };
		    // Test
		    OTResourceBase.prototype.isEmpty = function () {
		        return this.edits.length == 0;
		    };
		    // Copy an instance
		    OTResourceBase.prototype.copy = function () {
		        throw "OTResourceBase.copy must be overridden in subclass";
		    };
		    // Test whether two operations are effectively equivalent
		    OTResourceBase.prototype.effectivelyEqual = function (rhs) {
		        throw "OTResourceBase.effectivelyEqual must be overridden in subclass";
		    };
		    // Core OT algorithm for this type
		    OTResourceBase.prototype.transform = function (rhs, bPriorIsService) {
		        throw "OTResourceBase.transform must be overridden in subclass";
		    };
		    // compose two edit actions
		    OTResourceBase.prototype.compose = function (rhs) {
		        throw "OTResourceBase.compose must be overridden in subclass";
		    };
		    // apply this edit to an existing value, returning new value (if underlying type is mutable, may modify input)
		    OTResourceBase.prototype.apply = function (startValue) {
		        throw "OTResourceBase.apply must be overridden in subclass";
		    };
		    OTResourceBase.prototype.minimize = function () {
		        // Default implementation does nothing.
		    };
		    return OTResourceBase;
		}());
		exports.OTResourceBase = OTResourceBase;
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var OTC = __webpack_require__(4);
		var OTClientEngine = (function () {
		    // Constructor
		    function OTClientEngine(ctx, rid, cid) {
		        this.context = ctx;
		        this.resourceID = rid;
		        this.clientID = cid;
		        this.initialize();
		    }
		    OTClientEngine.prototype.initialize = function () {
		        this.clientSequenceNo = 0;
		        this.isNeedAck = false;
		        this.isNeedResend = false;
		        this.actionAllClient = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		        this.actionAllPendingClient = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		        this.actionSentClient = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		        this.actionSentClientOriginal = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		        this.actionServerInterposedSentClient = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		        this.stateServer = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		        this.stateLocal = new OTC.OTCompositeResource(this.resourceID, this.clientID);
		    };
		    // Members
		    OTClientEngine.prototype.serverClock = function () {
		        return this.stateServer.clock;
		    };
		    OTClientEngine.prototype.toValue = function () {
		        return this.stateLocal.toValue();
		    };
		    OTClientEngine.prototype.isPending = function () {
		        return !this.actionAllPendingClient.isEmpty();
		    };
		    OTClientEngine.prototype.getPending = function () {
		        if (this.actionAllPendingClient.isEmpty())
		            return null;
		        else {
		            // If "isNeedResend" I need to send the exact same event (instead of aggregating all pending)
		            // because the server might have actually received and processed the event and I just didn't
		            // receive acknowledgement. If I merge that event into others I'll lose ability to distinguish
		            // that. Eventually when I re-establish communication with server I will get that event response
		            // and can then move on.
		            if (!this.isNeedResend) {
		                this.actionSentClient = this.actionAllPendingClient.copy();
		                this.actionSentClient.clientSequenceNo = this.clientSequenceNo++;
		                this.actionAllPendingClient.empty();
		            }
		            this.actionSentClient.clock = this.stateServer.clock;
		            this.actionSentClientOriginal = this.actionSentClient.copy();
		            this.actionServerInterposedSentClient.empty();
		            this.isNeedAck = true;
		            this.isNeedResend = false;
		            return this.actionSentClient.copy();
		        }
		    };
		    // When I fail to send, I need to reset to resend the event again
		    OTClientEngine.prototype.resetPending = function () {
		        if (this.isNeedAck) {
		            this.isNeedAck = false;
		            this.isNeedResend = true;
		        }
		    };
		    // When I don't accurately have server state - will then refresh from server
		    OTClientEngine.prototype.failbackToInitialState = function () {
		        this.context.log(2, "clientID: " + this.clientID + ": FailbackToInitialState");
		        this.initialize();
		    };
		    // When I have server state but my state got mixed up
		    OTClientEngine.prototype.failbackToServerState = function () {
		        this.context.log(2, "clientID: " + this.clientID + ": FailbackToServerState");
		        this.stateLocal = this.stateServer.copy();
		        this.isNeedAck = false;
		        this.actionSentClient.empty();
		        this.actionSentClientOriginal.empty();
		        this.actionServerInterposedSentClient.empty();
		        this.actionAllPendingClient.empty();
		        this.actionAllClient.empty();
		    };
		    //
		    // Function: OTClientEngine.addRemote
		    //
		    // Description:
		    //	This function is really where the action is in managing the dynamic logic of applying OT. This is run
		    //	on each end point and handles the events received from the server. This includes server acknowledgements
		    //	(both success and failure) of locally generated events as well as all the events generated from other
		    //	clients.
		    //
		    //	The key things that happen here are:
		    //		1. Track server state.
		    //		2. Respond to server acknowledgement of locally generated events. This also includes validation
		    //			(with failback code) in case where server transformed my event in a way that was inconsistent
		    //			with what I expected (due to insert collision that arose due to multiple independent events).
		    //		3. Transform the incoming event (by local events) so it can be applied to local state.
		    //		4. Transform pending local events so they can be dispatched to the service once the service
		    //			is ready for another event.
		    //
		    OTClientEngine.prototype.addRemote = function (orig) {
		        // Reset if server forces restart
		        if (orig.clock == OTC.clockInitialValue) {
		            this.failbackToInitialState();
		            return;
		        }
		        // Reset if server restarted and we don't sync up
		        if (orig.clock < 0) {
		            // If server didn't lose anything I can just keep going...
		            if (this.stateServer.clock + 1 == -orig.clock)
		                orig.clock = -orig.clock;
		            else {
		                this.failbackToInitialState();
		                return;
		            }
		        }
		        // Ignore if I've seen this event already
		        if (orig.clock <= this.serverClock()) {
		            this.context.log(10, "clientID: " + this.clientID + " addRemote: Event clientID: " + orig.clientID + " Event clock: " + orig.clock + ": IGNORE");
		            return;
		        }
		        this.context.log(10, "clientID: " + this.clientID + " addRemote: Event clientID: " + orig.clientID + " Event clock: " + orig.clock);
		        var bMine = orig.clientID == this.clientID;
		        var bResend = bMine && orig.clock == OTC.clockFailureValue;
		        var a = orig.copy();
		        if (bResend) {
		            // Service failed my request. Retry with currently outstanding content.
		            this.resetPending();
		            return;
		        }
		        try {
		            // Track server state and clock
		            this.stateServer.compose(a);
		            if (bMine) {
		                // Validate that I didn't run into unresolvable conflict
		                if (!this.actionServerInterposedSentClient.isEmpty()) {
		                    this.actionSentClientOriginal.transform(this.actionServerInterposedSentClient, true);
		                    if (!this.actionSentClient.effectivelyEqual(this.actionSentClientOriginal)) {
		                        this.context.log(10, "clientID: " + this.clientID + " addRemote: Normal Failback");
		                        this.failbackToServerState();
		                    }
		                }
		                // I don't need to apply to local state since it has already been applied - this is just an ack.
		                this.isNeedAck = false;
		                this.actionSentClient.empty();
		                this.actionSentClientOriginal.empty();
		                this.actionServerInterposedSentClient.empty();
		                this.actionAllClient = this.actionAllPendingClient.copy();
		            }
		            else {
		                // Transform server action to apply locally by transforming by all pending client actions
		                a.transform(this.actionAllClient, false);
		                // And then compose with local state
		                this.stateLocal.compose(a);
		                // Transform pending client by server action so it is rooted off the server state.
		                // This ensures that I can convert the next server action I receive.
		                this.actionAllClient.transform(orig, true);
		                // Transform server action to be after previously sent client action and then
		                // transform the unsent actions so they are ready to be sent.
		                var aServerTransformed = orig.copy();
		                aServerTransformed.transform(this.actionSentClient, false);
		                this.actionAllPendingClient.transform(aServerTransformed, true);
		                // And then transform the sent client action so ready to be used for transforming next server event
		                this.actionSentClient.transform(orig, true);
		                // Track server operations interposed between a sent action
		                if (this.isNeedAck)
		                    this.actionServerInterposedSentClient.compose(orig);
		            }
		        }
		        catch (err) {
		            this.failbackToServerState();
		        }
		    };
		    //
		    // Function: addLocal
		    //
		    // Description:
		    //	This is the logic for adding an action to the local state. The logic is straight-forward
		    //	as we need to track:
		    //		1. The composed set of unacknowledged locally generated events.
		    //		2. The composed set of unsent locally generated events (queued until sent event is acknowledged).
		    //		3. The local state.
		    //		4. An undo operation.
		    //
		    OTClientEngine.prototype.addLocal = function (orig) {
		        try {
		            this.actionAllClient.compose(orig);
		            this.actionAllPendingClient.compose(orig);
		            this.stateLocal.compose(orig);
		        }
		        catch (err) {
		            this.context.log(0, "OTClientEngine.addLocal: unexpected exception: " + err);
		            this.failbackToServerState();
		        }
		    };
		    return OTClientEngine;
		}());
		exports.OTClientEngine = OTClientEngine;
		;
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var OT = __webpack_require__(2);
		var OTA = __webpack_require__(1);
		var OTM = __webpack_require__(5);
		var OTC = __webpack_require__(6);
		exports.clockSuccess = 0;
		exports.clockInitialValue = -1; // Initial value
		exports.clockTerminateValue = -2; // Terminal action from client.
		exports.clockRandomizeValue = -3; // Fill in with random data.
		exports.clockFailureValue = -4; // Server failed to apply.
		exports.clockInitializeValue = -5; // Used to initialize client to a specific string value.
		exports.clockUndoValue = -6; // Used to indicate we should generate an undo event.
		exports.clockSeenValue = -7; // Server has already seen this event
		var OTCompositeResource = (function (_super) {
		    __extends(OTCompositeResource, _super);
		    function OTCompositeResource(rid, cid) {
		        _super.call(this, 'root', 'composite');
		        this.resourceID = rid;
		        this.clientID = cid;
		        this.clock = exports.clockInitialValue;
		        this.clientSequenceNo = 0;
		    }
		    OTCompositeResource.registerType = function (underlyingType, factory) {
		        if (OTCompositeResource.typeRegistry == null)
		            OTCompositeResource.typeRegistry = {};
		        OTCompositeResource.typeRegistry[underlyingType] = factory;
		    };
		    OTCompositeResource.prototype.findResource = function (rname, utype, bConstruct) {
		        if (utype === void 0) { utype = ''; }
		        if (bConstruct === void 0) { bConstruct = false; }
		        for (var i = 0; i < this.length; i++)
		            if (this.edits[i].resourceName === rname)
		                return this.edits[i];
		        if (bConstruct) {
		            var edit = OTCompositeResource.constructResource(rname, utype);
		            this.edits.push(edit);
		            return edit;
		        }
		        else
		            return null;
		    };
		    OTCompositeResource.prototype.isEmpty = function () {
		        // Canonical empty is an empty edits array, but an array of empty edits is always considered empty
		        for (var i = 0; i < this.length; i++)
		            if (!this.edits[i].isEmpty())
		                return false;
		        return true;
		    };
		    // Copy an instance
		    OTCompositeResource.prototype.copy = function () {
		        var c = new OTCompositeResource(this.resourceID, this.clientID);
		        c.clock = this.clock;
		        c.clientSequenceNo = this.clientSequenceNo;
		        for (var i = 0; i < this.length; i++)
		            c.edits.push(this.edits[i].copy());
		        return c;
		    };
		    // Test whether two operations are effectively equivalent
		    OTCompositeResource.prototype.effectivelyEqual = function (rhs) {
		        // This should really be a structural error
		        if (this.length != rhs.length)
		            return false;
		        for (var i = 0; i < this.length; i++) {
		            var lhsEdit = this.edits[i];
		            var rhsEdit = rhs.findResource(lhsEdit.resourceName);
		            if ((rhsEdit == null && !lhsEdit.isEmpty()) || !lhsEdit.effectivelyEqual(rhsEdit))
		                return false;
		        }
		        return true;
		    };
		    // Core OT algorithm for this type
		    OTCompositeResource.prototype.transform = function (rhs, bPriorIsService) {
		        for (var i = 0; i < rhs.length; i++) {
		            var rhsEdit = rhs.edits[i];
		            var lhsEdit = this.findResource(rhsEdit.resourceName, rhsEdit.underlyingType, false);
		            if (lhsEdit)
		                lhsEdit.transform(rhsEdit, bPriorIsService);
		        }
		    };
		    // compose two edit actions
		    OTCompositeResource.prototype.compose = function (rhs) {
		        for (var i = 0; i < rhs.length; i++) {
		            var rhsEdit = rhs.edits[i];
		            var lhsEdit = this.findResource(rhsEdit.resourceName, rhsEdit.underlyingType, !rhsEdit.isEmpty());
		            if (lhsEdit)
		                lhsEdit.compose(rhsEdit);
		        }
		        this.clock = rhs.clock;
		        this.clientSequenceNo = rhs.clientSequenceNo;
		    };
		    // apply this edit to an existing value, returning new value (if underlying type is mutable, may modify input)
		    // For composite, takes array of values, returns array of results, one for each underlying resource.
		    OTCompositeResource.prototype.apply = function (runningValue) {
		        if (runningValue == null)
		            runningValue = {};
		        for (var i = 0; i < this.length; i++) {
		            var e = this.edits[i];
		            runningValue[e.resourceName] = e.apply(runningValue[e.resourceName]);
		        }
		        return runningValue;
		    };
		    OTCompositeResource.prototype.toValue = function () {
		        return this.apply(null);
		    };
		    OTCompositeResource.prototype.minimize = function () {
		        for (var i = 0; i < this.length; i++)
		            this.edits[i].minimize();
		    };
		    OTCompositeResource.constructResource = function (rname, utype) {
		        if (OTCompositeResource.typeRegistry == null) {
		            //throw "OTCompositeResource.constructResource: no registered factories";
		            // This is only place where Composite type knows of other types - could hoist to outer level
		            OTCompositeResource.registerType('string', OTA.OTStringResource.factory);
		            OTCompositeResource.registerType('array', OTA.OTArrayResource.factory);
		            OTCompositeResource.registerType('map', OTM.OTMapResource.factory);
		            OTCompositeResource.registerType('counter', OTC.OTCounterResource.factory);
		        }
		        var factory = OTCompositeResource.typeRegistry[utype];
		        if (factory == null)
		            throw "OTCompositeResource.constructResource: no registered factory for " + utype;
		        return factory(rname);
		    };
		    // Deserialization
		    OTCompositeResource.constructFromObject = function (o) {
		        var cedit = new OTCompositeResource("", "");
		        if (o['resourceID'] !== undefined)
		            cedit.resourceID = o['resourceID'];
		        if (o['clientID'] !== undefined)
		            cedit.clientID = o['clientID'];
		        if (o['clock'] !== undefined)
		            cedit.clock = Number(o['clock']);
		        if (o['clientSequenceNo'] !== undefined)
		            cedit.clientSequenceNo = Number(o['clientSequenceNo']);
		        if (o['edits'] !== undefined) {
		            var arrEdits = o['edits'];
		            for (var i = 0; i < arrEdits.length; i++) {
		                var a = arrEdits[i];
		                var rname = a['resourceName'];
		                var utype = a['underlyingType'];
		                var edit = this.constructResource(rname, utype);
		                edit.edits = a['edits'];
		                cedit.edits.push(edit);
		            }
		        }
		        return cedit;
		    };
		    // Serialization
		    OTCompositeResource.prototype.toJSON = function () {
		        var o = {
		            "resourceID": this.resourceID,
		            "clientID": this.clientID,
		            "clock": this.clock,
		            "clientSequenceNo": this.clientSequenceNo,
		            "edits": [] };
		        for (var i = 0; i < this.length; i++) {
		            var edit = this.edits[i];
		            var oEdit = { "resourceName": edit.resourceName, "underlyingType": edit.underlyingType, "edits": edit.edits };
		            o["edits"].push(oEdit);
		        }
		        return o;
		    };
		    return OTCompositeResource;
		}(OT.OTResourceBase));
		exports.OTCompositeResource = OTCompositeResource;
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var OT = __webpack_require__(2);
		// This implements OT for a dictionary of objects. OT is pretty trivial for maps - last wins.
		exports.OpMapSet = 1;
		exports.OpMapDel = 2;
		var OTMapResource = (function (_super) {
		    __extends(OTMapResource, _super);
		    function OTMapResource(rid) {
		        _super.call(this, rid, 'map');
		    }
		    OTMapResource.factory = function (rid) { return new OTMapResource(rid); };
		    // copy an instance
		    OTMapResource.prototype.copy = function () {
		        var c = new OTMapResource(this.resourceName);
		        for (var i = 0; i < this.length; i++) {
		            var e = this.edits[i];
		            c.edits.push([e[0], e[1], e[2]]);
		        }
		        return c;
		    };
		    // Test whether two operations are effectively equivalent
		    OTMapResource.prototype.effectivelyEqual = function (rhs) {
		        // This should really be a structural error
		        if (this.length != rhs.length)
		            return false;
		        // This checks for exact structural equivalency. Really the ordering shouldn't matter for Map so
		        // an improvement to this algorithm would be to be more robust to ordering differences.
		        for (var i = 0; i < this.length; i++) {
		            var e1 = this.edits[i];
		            var e2 = rhs.edits[i];
		            if (e1[0] != e2[0] || e1[1] != e2[1] || e1[2] != e2[2])
		                return false;
		        }
		        return true;
		    };
		    // Core OT algorithm for this type
		    OTMapResource.prototype.transform = function (prior, bPriorIsService) {
		        // Last wins - if I'm last, my sets and deletes are all preserved
		        if (bPriorIsService)
		            return;
		        // OK, remove any operations (either sets or deletes), that conflict with me
		        // First load in my properties
		        var myEdits = this.toObject();
		        // Now delete any that are overridden
		        for (var i = 0; i < prior.length; i++)
		            delete myEdits[(prior.edits[i])[1]];
		        // Now restore edit array from edited object
		        this.fromObject(myEdits);
		    };
		    // compose two edit actions
		    OTMapResource.prototype.compose = function (rhs) {
		        var o = this.toObject();
		        for (var i = 0; i < rhs.length; i++) {
		            var eR = rhs.edits[i];
		            o[eR[1]] = [eR[0], eR[1], eR[2]]; // Note this overwrites any existing operation on this key, set or del
		        }
		        this.fromObject(o);
		    };
		    OTMapResource.prototype.apply = function (startValue) {
		        if (startValue == null)
		            startValue = {};
		        for (var i = 0; i < this.length; i++) {
		            var e = this.edits[i];
		            switch (e[0]) {
		                case exports.OpMapSet:
		                    startValue[e[1]] = e[2];
		                    break;
		                case exports.OpMapDel:
		                    delete startValue[e[1]];
		                    break;
		            }
		        }
		        return startValue;
		    };
		    OTMapResource.prototype.minimize = function () {
		        // Effectively removes OpMapDel
		        var o = this.apply({});
		        this.edits = [];
		        for (var p in o)
		            if (o.hasOwnProperty(p))
		                this.edits.push([exports.OpMapSet, p, o[p]]);
		    };
		    OTMapResource.prototype.loadObject = function (o) {
		        for (var i = 0; i < this.length; i++)
		            o[(this.edits[i])[1]] = this.edits[i];
		        return o;
		    };
		    OTMapResource.prototype.toObject = function () {
		        return this.loadObject({});
		    };
		    OTMapResource.prototype.fromObject = function (o) {
		        this.edits = [];
		        for (var p in o)
		            if (o.hasOwnProperty(p))
		                this.edits.push(o[p]);
		    };
		    return OTMapResource;
		}(OT.OTResourceBase));
		exports.OTMapResource = OTMapResource;
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var OT = __webpack_require__(2);
		// This implements OT for a simple map of counters. Instead of a new value replacing the 
		// keyed value, values are added together. This allows a simple accumulating counter.
		// Possible future additions:
		//	Add additional semantics for how the values accumulate. Examples from DropBox's datastore API
		//	included "min" and "max" as alternate rules to "sum".
		//
		exports.OpCounterAdd = 1;
		exports.OpCounterDel = 2;
		var OTCounterResource = (function (_super) {
		    __extends(OTCounterResource, _super);
		    function OTCounterResource(rid) {
		        _super.call(this, rid, 'map');
		    }
		    OTCounterResource.factory = function (rid) { return new OTCounterResource(rid); };
		    // copy an instance
		    OTCounterResource.prototype.copy = function () {
		        var c = new OTCounterResource(this.resourceName);
		        for (var i = 0; i < this.length; i++) {
		            var e = this.edits[i];
		            c.edits.push([e[0], e[1], e[2]]);
		        }
		        return c;
		    };
		    // Test whether two operations are effectively equivalent
		    OTCounterResource.prototype.effectivelyEqual = function (rhs) {
		        // This should really be a structural error
		        if (this.length != rhs.length)
		            return false;
		        // This checks for exact structural equivalency. Really the ordering shouldn't matter for Counter so
		        // an improvement to this algorithm would be to be more robust to ordering differences.
		        for (var i = 0; i < this.length; i++) {
		            var e1 = this.edits[i];
		            var e2 = rhs.edits[i];
		            if (e1[0] != e2[0] || e1[1] != e2[1] || e1[2] != e2[2])
		                return false;
		        }
		        return true;
		    };
		    // Core OT algorithm for this type
		    OTCounterResource.prototype.transform = function (prior, bPriorIsService) {
		        // Last wins - if I'm last, my adds and deletes are all preserved
		        if (bPriorIsService)
		            return;
		        // Deletes in prior will delete mine. Implement by loading up properties rather than
		        // using N^2 lookup through Edits array.
		        var myEdits = this.toObject();
		        var bEdited = false;
		        // Now delete any that are deleted by prior.
		        for (var i = 0; i < prior.length; i++) {
		            var eP = prior.edits[i];
		            if (eP[0] == exports.OpCounterDel) {
		                delete myEdits[eP[1]];
		                bEdited = true;
		            }
		        }
		        // Now restore edit array from edited object
		        if (bEdited)
		            this.fromObject(myEdits);
		    };
		    // compose two edit actions
		    OTCounterResource.prototype.compose = function (rhs) {
		        var lhsKeys = this.toObject();
		        var rhsKeys = rhs.toObject();
		        for (var i = 0; i < rhs.length; i++) {
		            var eR = rhsKeys.edits[i];
		            var eL = lhsKeys[eR[1]];
		            if (eL === undefined)
		                lhsKeys[eR[1]] = [eR[0], eR[1], eR[2]];
		            else
		                eL[2] += eR[2];
		        }
		        this.fromObject(lhsKeys);
		    };
		    OTCounterResource.prototype.apply = function (startValue) {
		        if (startValue == null)
		            startValue = {};
		        for (var i = 0; i < this.length; i++) {
		            var e = this.edits[i];
		            switch (e[0]) {
		                case exports.OpCounterAdd:
		                    if (startValue[e[1]] === undefined)
		                        startValue[e[1]] = e[2];
		                    else
		                        startValue[e[1]] += e[2];
		                    break;
		                case exports.OpCounterDel:
		                    delete startValue[e[1]];
		                    break;
		            }
		        }
		        return startValue;
		    };
		    OTCounterResource.prototype.minimize = function () {
		        // No-op
		    };
		    OTCounterResource.prototype.loadObject = function (o) {
		        for (var i = 0; i < this.length; i++)
		            o[(this.edits[i])[1]] = this.edits[i];
		        return o;
		    };
		    OTCounterResource.prototype.toObject = function () {
		        return this.loadObject({});
		    };
		    OTCounterResource.prototype.fromObject = function (o) {
		        this.edits = [];
		        for (var p in o)
		            if (o.hasOwnProperty(p))
		                this.edits.push(o[p]);
		    };
		    return OTCounterResource;
		}(OT.OTResourceBase));
		exports.OTCounterResource = OTCounterResource;
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var OTC = __webpack_require__(4);
		var OTServerEngine = (function () {
		    // Constructor
		    function OTServerEngine(ctx, rid) {
		        this.context = ctx;
		        this.stateServer = new OTC.OTCompositeResource(rid, "");
		        this.logServer = [];
		        this.highSequence = {};
		        this.valCache = {};
		    }
		    OTServerEngine.prototype.serverClock = function () {
		        return this.stateServer.clock;
		    };
		    OTServerEngine.prototype.toValue = function () {
		        return this.valCache;
		    };
		    OTServerEngine.prototype.getProp = function (s) {
		        var o = this.valCache['WellKnownName_meta'];
		        return o === undefined ? '' : o[s];
		    };
		    OTServerEngine.prototype.getName = function () {
		        return this.getProp('name');
		    };
		    OTServerEngine.prototype.getType = function () {
		        return this.getProp('type');
		    };
		    OTServerEngine.prototype.hasSeenEvent = function (orig) {
		        var clientSequenceNo = this.highSequence[orig.clientID];
		        return (clientSequenceNo !== undefined && Number(clientSequenceNo) >= orig.clientSequenceNo);
		    };
		    OTServerEngine.prototype.isNextEvent = function (orig) {
		        var clientSequenceNo = this.highSequence[orig.clientID];
		        return (clientSequenceNo === undefined && orig.clientSequenceNo == 0)
		            || (Number(clientSequenceNo) + 1 == orig.clientSequenceNo);
		    };
		    OTServerEngine.prototype.rememberSeenEvent = function (orig) {
		        this.highSequence[orig.clientID] = orig.clientSequenceNo;
		    };
		    OTServerEngine.prototype.forgetEvents = function (orig) {
		        delete this.highSequence[orig.clientID];
		    };
		    // Function: addServer
		    //
		    // Description:
		    //	This is the server state update processing upon receiving an event from an endpoint.
		    //	The received event is transformed (if possible) and added to the server state.
		    //	The logic here is straight-forward - transform the incoming event so it is relative to
		    //	the current state and then apply.
		    OTServerEngine.prototype.addServer = function (orig) {
		        this.context.log(10, "addServer: Event clientID: " + orig.clientID + " clock: " + orig.clock);
		        try {
		            // First transform, then add to log
		            var i = void 0;
		            var a = orig.copy();
		            for (i = this.logServer.length; i > 0; i--) {
		                var aService = this.logServer[i - 1];
		                if (aService.clock == a.clock)
		                    break;
		            }
		            // Fail if we've seen it already (client did not receive ack)
		            if (this.hasSeenEvent(orig)) {
		                this.context.log(0, "addServer: received duplicate event.");
		                return OTC.clockSeenValue;
		            }
		            // If this isn't next in sequence, I lost one (probably because I went "back in time"
		            // due to server restart). In that case client is forced to re-initialize (losing local
		            // edits). I also need to re-initialize sequence numbering.
		            if (!this.isNextEvent(orig)) {
		                this.context.log(0, "addServer: received out-of-order event.");
		                this.forgetEvents(orig);
		                return OTC.clockInitialValue;
		            }
		            // Fail if we have discarded that old state
		            if (a.clock >= 0 && i == 0) {
		                this.context.log(0, "addServer: received old event.");
		                return OTC.clockFailureValue;
		            }
		            // OK, all good, transform and apply
		            if (i < this.logServer.length) {
		                var aPrior = this.logServer[i].copy();
		                for (i++; i < this.logServer.length; i++)
		                    aPrior.compose(this.logServer[i]);
		                a.transform(aPrior, true);
		            }
		            a.clock = this.stateServer.clock + 1;
		            this.stateServer.compose(a);
		            this.valCache = this.stateServer.toValue();
		            this.logServer.push(a.copy());
		            this.rememberSeenEvent(orig);
		            return OTC.clockSuccess;
		        }
		        catch (err) {
		            return OTC.clockFailureValue;
		        }
		    };
		    OTServerEngine.prototype.toJSON = function () {
		        return { state: this.stateServer.toJSON(), highSequence: this.highSequence };
		    };
		    OTServerEngine.prototype.loadFromObject = function (o) {
		        if (o.state !== undefined) {
		            this.stateServer = OTC.OTCompositeResource.constructFromObject(o.state);
		            this.valCache = this.stateServer.toValue();
		            this.logServer.push(this.stateServer.copy());
		        }
		        if (o.highSequence !== undefined)
		            this.highSequence = o.highSequence;
		    };
		    return OTServerEngine;
		}());
		exports.OTServerEngine = OTServerEngine;
	

	/***/ }
	/******/ ])
	});
	;


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict'
	
	/**
	 * Diff Match and Patch
	 *
	 * Copyright 2006 Google Inc.
	 * http://code.google.com/p/google-diff-match-patch/
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/**
	 * @fileoverview Computes the difference between two texts to create a patch.
	 * Applies the patch onto another text, allowing for errors.
	 * @author fraser@google.com (Neil Fraser)
	 */
	
	/**
	 * Class containing the diff, match and patch methods.
	 * @constructor
	 */
	function diff_match_patch() {
	
	  // Defaults.
	  // Redefine these in your program to override the defaults.
	
	  // Number of seconds to map a diff before giving up (0 for infinity).
	  this.Diff_Timeout = 1.0;
	  // Cost of an empty edit operation in terms of edit characters.
	  this.Diff_EditCost = 4;
	  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
	  this.Match_Threshold = 0.5;
	  // How far to search for a match (0 = exact location, 1000+ = broad match).
	  // A match this many characters away from the expected location will add
	  // 1.0 to the score (0.0 is a perfect match).
	  this.Match_Distance = 1000;
	  // When deleting a large block of text (over ~64 characters), how close do
	  // the contents have to be to match the expected contents. (0.0 = perfection,
	  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
	  // end points of a delete need to match.
	  this.Patch_DeleteThreshold = 0.5;
	  // Chunk size for context length.
	  this.Patch_Margin = 4;
	
	  // The number of bits in an int.
	  this.Match_MaxBits = 32;
	}
	
	
	//  DIFF FUNCTIONS
	
	
	/**
	 * The data structure representing a diff is an array of tuples:
	 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
	 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
	 */
	var DIFF_DELETE = -1;
	var DIFF_INSERT = 1;
	var DIFF_EQUAL = 0;
	
	/** @typedef {{0: number, 1: string}} */
	diff_match_patch.Diff;
	
	
	/**
	 * Find the differences between two texts.  Simplifies the problem by stripping
	 * any common prefix or suffix off the texts before diffing.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
	 *     then don't run a line-level diff first to identify the changed areas.
	 *     Defaults to true, which does a faster, slightly less optimal diff.
	 * @param {number} opt_deadline Optional time when the diff should be complete
	 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
	 *     instead.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
	    opt_deadline) {
	  // Set a deadline by which time the diff must be complete.
	  if (typeof opt_deadline == 'undefined') {
	    if (this.Diff_Timeout <= 0) {
	      opt_deadline = Number.MAX_VALUE;
	    } else {
	      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
	    }
	  }
	  var deadline = opt_deadline;
	
	  // Check for null inputs.
	  if (text1 == null || text2 == null) {
	    throw new Error('Null input. (diff_main)');
	  }
	
	  // Check for equality (speedup).
	  if (text1 == text2) {
	    if (text1) {
	      return [[DIFF_EQUAL, text1]];
	    }
	    return [];
	  }
	
	  if (typeof opt_checklines == 'undefined') {
	    opt_checklines = true;
	  }
	  var checklines = opt_checklines;
	
	  // Trim off common prefix (speedup).
	  var commonlength = this.diff_commonPrefix(text1, text2);
	  var commonprefix = text1.substring(0, commonlength);
	  text1 = text1.substring(commonlength);
	  text2 = text2.substring(commonlength);
	
	  // Trim off common suffix (speedup).
	  commonlength = this.diff_commonSuffix(text1, text2);
	  var commonsuffix = text1.substring(text1.length - commonlength);
	  text1 = text1.substring(0, text1.length - commonlength);
	  text2 = text2.substring(0, text2.length - commonlength);
	
	  // Compute the diff on the middle block.
	  var diffs = this.diff_compute_(text1, text2, checklines, deadline);
	
	  // Restore the prefix and suffix.
	  if (commonprefix) {
	    diffs.unshift([DIFF_EQUAL, commonprefix]);
	  }
	  if (commonsuffix) {
	    diffs.push([DIFF_EQUAL, commonsuffix]);
	  }
	  this.diff_cleanupMerge(diffs);
	  return diffs;
	};
	
	
	/**
	 * Find the differences between two texts.  Assumes that the texts do not
	 * have any common prefix or suffix.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {boolean} checklines Speedup flag.  If false, then don't run a
	 *     line-level diff first to identify the changed areas.
	 *     If true, then run a faster, slightly less optimal diff.
	 * @param {number} deadline Time when the diff should be complete by.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
	    deadline) {
	  var diffs;
	
	  if (!text1) {
	    // Just add some text (speedup).
	    return [[DIFF_INSERT, text2]];
	  }
	
	  if (!text2) {
	    // Just delete some text (speedup).
	    return [[DIFF_DELETE, text1]];
	  }
	
	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  var i = longtext.indexOf(shorttext);
	  if (i != -1) {
	    // Shorter text is inside the longer text (speedup).
	    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
	             [DIFF_EQUAL, shorttext],
	             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
	    // Swap insertions for deletions if diff is reversed.
	    if (text1.length > text2.length) {
	      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
	    }
	    return diffs;
	  }
	
	  if (shorttext.length == 1) {
	    // Single character string.
	    // After the previous speedup, the character can't be an equality.
	    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	  }
	
	  // Check to see if the problem can be split in two.
	  var hm = this.diff_halfMatch_(text1, text2);
	  if (hm) {
	    // A half-match was found, sort out the return data.
	    var text1_a = hm[0];
	    var text1_b = hm[1];
	    var text2_a = hm[2];
	    var text2_b = hm[3];
	    var mid_common = hm[4];
	    // Send both pairs off for separate processing.
	    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
	    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
	    // Merge the results.
	    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
	  }
	
	  if (checklines && text1.length > 100 && text2.length > 100) {
	    return this.diff_lineMode_(text1, text2, deadline);
	  }
	
	  return this.diff_bisect_(text1, text2, deadline);
	};
	
	
	/**
	 * Do a quick line-level diff on both strings, then rediff the parts for
	 * greater accuracy.
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} deadline Time when the diff should be complete by.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
	  // Scan the text on a line-by-line basis first.
	  var a = this.diff_linesToChars_(text1, text2);
	  text1 = a.chars1;
	  text2 = a.chars2;
	  var linearray = a.lineArray;
	
	  var diffs = this.diff_main(text1, text2, false, deadline);
	
	  // Convert the diff back to original text.
	  this.diff_charsToLines_(diffs, linearray);
	  // Eliminate freak matches (e.g. blank lines)
	  this.diff_cleanupSemantic(diffs);
	
	  // Rediff any replacement blocks, this time character-by-character.
	  // Add a dummy entry at the end.
	  diffs.push([DIFF_EQUAL, '']);
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete >= 1 && count_insert >= 1) {
	          // Delete the offending records and add the merged ones.
	          diffs.splice(pointer - count_delete - count_insert,
	                       count_delete + count_insert);
	          pointer = pointer - count_delete - count_insert;
	          var a = this.diff_main(text_delete, text_insert, false, deadline);
	          for (var j = a.length - 1; j >= 0; j--) {
	            diffs.splice(pointer, 0, a[j]);
	          }
	          pointer = pointer + a.length;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	    pointer++;
	  }
	  diffs.pop();  // Remove the dummy entry at the end.
	
	  return diffs;
	};
	
	
	/**
	 * Find the 'middle snake' of a diff, split the problem in two
	 * and return the recursively constructed diff.
	 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} deadline Time at which to bail if not yet complete.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  var max_d = Math.ceil((text1_length + text2_length) / 2);
	  var v_offset = max_d;
	  var v_length = 2 * max_d;
	  var v1 = new Array(v_length);
	  var v2 = new Array(v_length);
	  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
	  // integers and undefined.
	  for (var x = 0; x < v_length; x++) {
	    v1[x] = -1;
	    v2[x] = -1;
	  }
	  v1[v_offset + 1] = 0;
	  v2[v_offset + 1] = 0;
	  var delta = text1_length - text2_length;
	  // If the total number of characters is odd, then the front path will collide
	  // with the reverse path.
	  var front = (delta % 2 != 0);
	  // Offsets for start and end of k loop.
	  // Prevents mapping of space beyond the grid.
	  var k1start = 0;
	  var k1end = 0;
	  var k2start = 0;
	  var k2end = 0;
	  for (var d = 0; d < max_d; d++) {
	    // Bail out if deadline is reached.
	    if ((new Date()).getTime() > deadline) {
	      break;
	    }
	
	    // Walk the front path one step.
	    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
	      var k1_offset = v_offset + k1;
	      var x1;
	      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
	        x1 = v1[k1_offset + 1];
	      } else {
	        x1 = v1[k1_offset - 1] + 1;
	      }
	      var y1 = x1 - k1;
	      while (x1 < text1_length && y1 < text2_length &&
	             text1.charAt(x1) == text2.charAt(y1)) {
	        x1++;
	        y1++;
	      }
	      v1[k1_offset] = x1;
	      if (x1 > text1_length) {
	        // Ran off the right of the graph.
	        k1end += 2;
	      } else if (y1 > text2_length) {
	        // Ran off the bottom of the graph.
	        k1start += 2;
	      } else if (front) {
	        var k2_offset = v_offset + delta - k1;
	        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
	          // Mirror x2 onto top-left coordinate system.
	          var x2 = text1_length - v2[k2_offset];
	          if (x1 >= x2) {
	            // Overlap detected.
	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
	          }
	        }
	      }
	    }
	
	    // Walk the reverse path one step.
	    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
	      var k2_offset = v_offset + k2;
	      var x2;
	      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
	        x2 = v2[k2_offset + 1];
	      } else {
	        x2 = v2[k2_offset - 1] + 1;
	      }
	      var y2 = x2 - k2;
	      while (x2 < text1_length && y2 < text2_length &&
	             text1.charAt(text1_length - x2 - 1) ==
	             text2.charAt(text2_length - y2 - 1)) {
	        x2++;
	        y2++;
	      }
	      v2[k2_offset] = x2;
	      if (x2 > text1_length) {
	        // Ran off the left of the graph.
	        k2end += 2;
	      } else if (y2 > text2_length) {
	        // Ran off the top of the graph.
	        k2start += 2;
	      } else if (!front) {
	        var k1_offset = v_offset + delta - k2;
	        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
	          var x1 = v1[k1_offset];
	          var y1 = v_offset + x1 - k1_offset;
	          // Mirror x2 onto top-left coordinate system.
	          x2 = text1_length - x2;
	          if (x1 >= x2) {
	            // Overlap detected.
	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
	          }
	        }
	      }
	    }
	  }
	  // Diff took too long and hit the deadline or
	  // number of diffs equals number of characters, no commonality at all.
	  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	};
	
	
	/**
	 * Given the location of the 'middle snake', split the diff in two parts
	 * and recurse.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} x Index of split point in text1.
	 * @param {number} y Index of split point in text2.
	 * @param {number} deadline Time at which to bail if not yet complete.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
	    deadline) {
	  var text1a = text1.substring(0, x);
	  var text2a = text2.substring(0, y);
	  var text1b = text1.substring(x);
	  var text2b = text2.substring(y);
	
	  // Compute both diffs serially.
	  var diffs = this.diff_main(text1a, text2a, false, deadline);
	  var diffsb = this.diff_main(text1b, text2b, false, deadline);
	
	  return diffs.concat(diffsb);
	};
	
	
	/**
	 * Split two texts into an array of strings.  Reduce the texts to a string of
	 * hashes where each Unicode character represents one line.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
	 *     An object containing the encoded text1, the encoded text2 and
	 *     the array of unique strings.
	 *     The zeroth element of the array of unique strings is intentionally blank.
	 * @private
	 */
	diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
	  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
	  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4
	
	  // '\x00' is a valid character, but various debuggers don't like it.
	  // So we'll insert a junk entry to avoid generating a null character.
	  lineArray[0] = '';
	
	  /**
	   * Split a text into an array of strings.  Reduce the texts to a string of
	   * hashes where each Unicode character represents one line.
	   * Modifies linearray and linehash through being a closure.
	   * @param {string} text String to encode.
	   * @return {string} Encoded string.
	   * @private
	   */
	  function diff_linesToCharsMunge_(text) {
	    var chars = '';
	    // Walk the text, pulling out a substring for each line.
	    // text.split('\n') would would temporarily double our memory footprint.
	    // Modifying text would create many large strings to garbage collect.
	    var lineStart = 0;
	    var lineEnd = -1;
	    // Keeping our own length variable is faster than looking it up.
	    var lineArrayLength = lineArray.length;
	    while (lineEnd < text.length - 1) {
	      lineEnd = text.indexOf('\n', lineStart);
	      if (lineEnd == -1) {
	        lineEnd = text.length - 1;
	      }
	      var line = text.substring(lineStart, lineEnd + 1);
	      lineStart = lineEnd + 1;
	
	      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
	          (lineHash[line] !== undefined)) {
	        chars += String.fromCharCode(lineHash[line]);
	      } else {
	        chars += String.fromCharCode(lineArrayLength);
	        lineHash[line] = lineArrayLength;
	        lineArray[lineArrayLength++] = line;
	      }
	    }
	    return chars;
	  }
	
	  var chars1 = diff_linesToCharsMunge_(text1);
	  var chars2 = diff_linesToCharsMunge_(text2);
	  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
	};
	
	
	/**
	 * Rehydrate the text in a diff from a string of line hashes to real lines of
	 * text.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @param {!Array.<string>} lineArray Array of unique strings.
	 * @private
	 */
	diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
	  for (var x = 0; x < diffs.length; x++) {
	    var chars = diffs[x][1];
	    var text = [];
	    for (var y = 0; y < chars.length; y++) {
	      text[y] = lineArray[chars.charCodeAt(y)];
	    }
	    diffs[x][1] = text.join('');
	  }
	};
	
	
	/**
	 * Determine the common prefix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the start of each
	 *     string.
	 */
	diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerstart = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(pointerstart, pointermid) ==
	        text2.substring(pointerstart, pointermid)) {
	      pointermin = pointermid;
	      pointerstart = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};
	
	
	/**
	 * Determine the common suffix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of each string.
	 */
	diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 ||
	      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerend = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
	        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
	      pointermin = pointermid;
	      pointerend = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};
	
	
	/**
	 * Determine if the suffix of one string is the prefix of another.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of the first
	 *     string and the start of the second string.
	 * @private
	 */
	diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  // Eliminate the null case.
	  if (text1_length == 0 || text2_length == 0) {
	    return 0;
	  }
	  // Truncate the longer string.
	  if (text1_length > text2_length) {
	    text1 = text1.substring(text1_length - text2_length);
	  } else if (text1_length < text2_length) {
	    text2 = text2.substring(0, text1_length);
	  }
	  var text_length = Math.min(text1_length, text2_length);
	  // Quick check for the worst case.
	  if (text1 == text2) {
	    return text_length;
	  }
	
	  // Start by looking for a single character match
	  // and increase length until no match is found.
	  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
	  var best = 0;
	  var length = 1;
	  while (true) {
	    var pattern = text1.substring(text_length - length);
	    var found = text2.indexOf(pattern);
	    if (found == -1) {
	      return best;
	    }
	    length += found;
	    if (found == 0 || text1.substring(text_length - length) ==
	        text2.substring(0, length)) {
	      best = length;
	      length++;
	    }
	  }
	};
	
	
	/**
	 * Do the two texts share a substring which is at least half the length of the
	 * longer text?
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {Array.<string>} Five element Array, containing the prefix of
	 *     text1, the suffix of text1, the prefix of text2, the suffix of
	 *     text2 and the common middle.  Or null if there was no match.
	 * @private
	 */
	diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
	  if (this.Diff_Timeout <= 0) {
	    // Don't risk returning a non-optimal diff if we have unlimited time.
	    return null;
	  }
	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
	    return null;  // Pointless.
	  }
	  var dmp = this;  // 'this' becomes 'window' in a closure.
	
	  /**
	   * Does a substring of shorttext exist within longtext such that the substring
	   * is at least half the length of longtext?
	   * Closure, but does not reference any external variables.
	   * @param {string} longtext Longer string.
	   * @param {string} shorttext Shorter string.
	   * @param {number} i Start index of quarter length substring within longtext.
	   * @return {Array.<string>} Five element Array, containing the prefix of
	   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
	   *     of shorttext and the common middle.  Or null if there was no match.
	   * @private
	   */
	  function diff_halfMatchI_(longtext, shorttext, i) {
	    // Start with a 1/4 length substring at position i as a seed.
	    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
	    var j = -1;
	    var best_common = '';
	    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
	    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
	      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
	                                               shorttext.substring(j));
	      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
	                                               shorttext.substring(0, j));
	      if (best_common.length < suffixLength + prefixLength) {
	        best_common = shorttext.substring(j - suffixLength, j) +
	            shorttext.substring(j, j + prefixLength);
	        best_longtext_a = longtext.substring(0, i - suffixLength);
	        best_longtext_b = longtext.substring(i + prefixLength);
	        best_shorttext_a = shorttext.substring(0, j - suffixLength);
	        best_shorttext_b = shorttext.substring(j + prefixLength);
	      }
	    }
	    if (best_common.length * 2 >= longtext.length) {
	      return [best_longtext_a, best_longtext_b,
	              best_shorttext_a, best_shorttext_b, best_common];
	    } else {
	      return null;
	    }
	  }
	
	  // First check if the second quarter is the seed for a half-match.
	  var hm1 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 4));
	  // Check again based on the third quarter.
	  var hm2 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 2));
	  var hm;
	  if (!hm1 && !hm2) {
	    return null;
	  } else if (!hm2) {
	    hm = hm1;
	  } else if (!hm1) {
	    hm = hm2;
	  } else {
	    // Both matched.  Select the longest.
	    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
	  }
	
	  // A half-match was found, sort out the return data.
	  var text1_a, text1_b, text2_a, text2_b;
	  if (text1.length > text2.length) {
	    text1_a = hm[0];
	    text1_b = hm[1];
	    text2_a = hm[2];
	    text2_b = hm[3];
	  } else {
	    text2_a = hm[0];
	    text2_b = hm[1];
	    text1_a = hm[2];
	    text1_b = hm[3];
	  }
	  var mid_common = hm[4];
	  return [text1_a, text1_b, text2_a, text2_b, mid_common];
	};
	
	
	/**
	 * Reduce the number of edits by eliminating semantically trivial equalities.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
	  var changes = false;
	  var equalities = [];  // Stack of indices where equalities are found.
	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
	  /** @type {?string} */
	  var lastequality = null;
	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
	  var pointer = 0;  // Index of current position.
	  // Number of characters that changed prior to the equality.
	  var length_insertions1 = 0;
	  var length_deletions1 = 0;
	  // Number of characters that changed after the equality.
	  var length_insertions2 = 0;
	  var length_deletions2 = 0;
	  while (pointer < diffs.length) {
	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
	      equalities[equalitiesLength++] = pointer;
	      length_insertions1 = length_insertions2;
	      length_deletions1 = length_deletions2;
	      length_insertions2 = 0;
	      length_deletions2 = 0;
	      lastequality = diffs[pointer][1];
	    } else {  // An insertion or deletion.
	      if (diffs[pointer][0] == DIFF_INSERT) {
	        length_insertions2 += diffs[pointer][1].length;
	      } else {
	        length_deletions2 += diffs[pointer][1].length;
	      }
	      // Eliminate an equality that is smaller or equal to the edits on both
	      // sides of it.
	      if (lastequality && (lastequality.length <=
	          Math.max(length_insertions1, length_deletions1)) &&
	          (lastequality.length <= Math.max(length_insertions2,
	                                           length_deletions2))) {
	        // Duplicate record.
	        diffs.splice(equalities[equalitiesLength - 1], 0,
	                     [DIFF_DELETE, lastequality]);
	        // Change second copy to insert.
	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
	        // Throw away the equality we just deleted.
	        equalitiesLength--;
	        // Throw away the previous equality (it needs to be reevaluated).
	        equalitiesLength--;
	        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
	        length_insertions1 = 0;  // Reset the counters.
	        length_deletions1 = 0;
	        length_insertions2 = 0;
	        length_deletions2 = 0;
	        lastequality = null;
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	
	  // Normalize the diff.
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	  this.diff_cleanupSemanticLossless(diffs);
	
	  // Find any overlaps between deletions and insertions.
	  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
	  //   -> <del>abc</del>xxx<ins>def</ins>
	  // e.g: <del>xxxabc</del><ins>defxxx</ins>
	  //   -> <ins>def</ins>xxx<del>abc</del>
	  // Only extract an overlap if it is as big as the edit ahead or behind it.
	  pointer = 1;
	  while (pointer < diffs.length) {
	    if (diffs[pointer - 1][0] == DIFF_DELETE &&
	        diffs[pointer][0] == DIFF_INSERT) {
	      var deletion = diffs[pointer - 1][1];
	      var insertion = diffs[pointer][1];
	      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
	      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
	      if (overlap_length1 >= overlap_length2) {
	        if (overlap_length1 >= deletion.length / 2 ||
	            overlap_length1 >= insertion.length / 2) {
	          // Overlap found.  Insert an equality and trim the surrounding edits.
	          diffs.splice(pointer, 0,
	              [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
	          diffs[pointer - 1][1] =
	              deletion.substring(0, deletion.length - overlap_length1);
	          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
	          pointer++;
	        }
	      } else {
	        if (overlap_length2 >= deletion.length / 2 ||
	            overlap_length2 >= insertion.length / 2) {
	          // Reverse overlap found.
	          // Insert an equality and swap and trim the surrounding edits.
	          diffs.splice(pointer, 0,
	              [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
	          diffs[pointer - 1][0] = DIFF_INSERT;
	          diffs[pointer - 1][1] =
	              insertion.substring(0, insertion.length - overlap_length2);
	          diffs[pointer + 1][0] = DIFF_DELETE;
	          diffs[pointer + 1][1] =
	              deletion.substring(overlap_length2);
	          pointer++;
	        }
	      }
	      pointer++;
	    }
	    pointer++;
	  }
	};
	
	
	/**
	 * Look for single edits surrounded on both sides by equalities
	 * which can be shifted sideways to align the edit to a word boundary.
	 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
	  /**
	   * Given two strings, compute a score representing whether the internal
	   * boundary falls on logical boundaries.
	   * Scores range from 6 (best) to 0 (worst).
	   * Closure, but does not reference any external variables.
	   * @param {string} one First string.
	   * @param {string} two Second string.
	   * @return {number} The score.
	   * @private
	   */
	  function diff_cleanupSemanticScore_(one, two) {
	    if (!one || !two) {
	      // Edges are the best.
	      return 6;
	    }
	
	    // Each port of this function behaves slightly differently due to
	    // subtle differences in each language's definition of things like
	    // 'whitespace'.  Since this function's purpose is largely cosmetic,
	    // the choice has been made to use each language's native features
	    // rather than force total conformity.
	    var char1 = one.charAt(one.length - 1);
	    var char2 = two.charAt(0);
	    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
	    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
	    var whitespace1 = nonAlphaNumeric1 &&
	        char1.match(diff_match_patch.whitespaceRegex_);
	    var whitespace2 = nonAlphaNumeric2 &&
	        char2.match(diff_match_patch.whitespaceRegex_);
	    var lineBreak1 = whitespace1 &&
	        char1.match(diff_match_patch.linebreakRegex_);
	    var lineBreak2 = whitespace2 &&
	        char2.match(diff_match_patch.linebreakRegex_);
	    var blankLine1 = lineBreak1 &&
	        one.match(diff_match_patch.blanklineEndRegex_);
	    var blankLine2 = lineBreak2 &&
	        two.match(diff_match_patch.blanklineStartRegex_);
	
	    if (blankLine1 || blankLine2) {
	      // Five points for blank lines.
	      return 5;
	    } else if (lineBreak1 || lineBreak2) {
	      // Four points for line breaks.
	      return 4;
	    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
	      // Three points for end of sentences.
	      return 3;
	    } else if (whitespace1 || whitespace2) {
	      // Two points for whitespace.
	      return 2;
	    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
	      // One point for non-alphanumeric.
	      return 1;
	    }
	    return 0;
	  }
	
	  var pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      var equality1 = diffs[pointer - 1][1];
	      var edit = diffs[pointer][1];
	      var equality2 = diffs[pointer + 1][1];
	
	      // First, shift the edit as far left as possible.
	      var commonOffset = this.diff_commonSuffix(equality1, edit);
	      if (commonOffset) {
	        var commonString = edit.substring(edit.length - commonOffset);
	        equality1 = equality1.substring(0, equality1.length - commonOffset);
	        edit = commonString + edit.substring(0, edit.length - commonOffset);
	        equality2 = commonString + equality2;
	      }
	
	      // Second, step character by character right, looking for the best fit.
	      var bestEquality1 = equality1;
	      var bestEdit = edit;
	      var bestEquality2 = equality2;
	      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
	          diff_cleanupSemanticScore_(edit, equality2);
	      while (edit.charAt(0) === equality2.charAt(0)) {
	        equality1 += edit.charAt(0);
	        edit = edit.substring(1) + equality2.charAt(0);
	        equality2 = equality2.substring(1);
	        var score = diff_cleanupSemanticScore_(equality1, edit) +
	            diff_cleanupSemanticScore_(edit, equality2);
	        // The >= encourages trailing rather than leading whitespace on edits.
	        if (score >= bestScore) {
	          bestScore = score;
	          bestEquality1 = equality1;
	          bestEdit = edit;
	          bestEquality2 = equality2;
	        }
	      }
	
	      if (diffs[pointer - 1][1] != bestEquality1) {
	        // We have an improvement, save it back to the diff.
	        if (bestEquality1) {
	          diffs[pointer - 1][1] = bestEquality1;
	        } else {
	          diffs.splice(pointer - 1, 1);
	          pointer--;
	        }
	        diffs[pointer][1] = bestEdit;
	        if (bestEquality2) {
	          diffs[pointer + 1][1] = bestEquality2;
	        } else {
	          diffs.splice(pointer + 1, 1);
	          pointer--;
	        }
	      }
	    }
	    pointer++;
	  }
	};
	
	// Define some regex patterns for matching boundaries.
	diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
	diff_match_patch.whitespaceRegex_ = /\s/;
	diff_match_patch.linebreakRegex_ = /[\r\n]/;
	diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
	diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
	
	/**
	 * Reduce the number of edits by eliminating operationally trivial equalities.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
	  var changes = false;
	  var equalities = [];  // Stack of indices where equalities are found.
	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
	  /** @type {?string} */
	  var lastequality = null;
	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
	  var pointer = 0;  // Index of current position.
	  // Is there an insertion operation before the last equality.
	  var pre_ins = false;
	  // Is there a deletion operation before the last equality.
	  var pre_del = false;
	  // Is there an insertion operation after the last equality.
	  var post_ins = false;
	  // Is there a deletion operation after the last equality.
	  var post_del = false;
	  while (pointer < diffs.length) {
	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
	      if (diffs[pointer][1].length < this.Diff_EditCost &&
	          (post_ins || post_del)) {
	        // Candidate found.
	        equalities[equalitiesLength++] = pointer;
	        pre_ins = post_ins;
	        pre_del = post_del;
	        lastequality = diffs[pointer][1];
	      } else {
	        // Not a candidate, and can never become one.
	        equalitiesLength = 0;
	        lastequality = null;
	      }
	      post_ins = post_del = false;
	    } else {  // An insertion or deletion.
	      if (diffs[pointer][0] == DIFF_DELETE) {
	        post_del = true;
	      } else {
	        post_ins = true;
	      }
	      /*
	       * Five types to be split:
	       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
	       * <ins>A</ins>X<ins>C</ins><del>D</del>
	       * <ins>A</ins><del>B</del>X<ins>C</ins>
	       * <ins>A</del>X<ins>C</ins><del>D</del>
	       * <ins>A</ins><del>B</del>X<del>C</del>
	       */
	      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
	                           ((lastequality.length < this.Diff_EditCost / 2) &&
	                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
	        // Duplicate record.
	        diffs.splice(equalities[equalitiesLength - 1], 0,
	                     [DIFF_DELETE, lastequality]);
	        // Change second copy to insert.
	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
	        equalitiesLength--;  // Throw away the equality we just deleted;
	        lastequality = null;
	        if (pre_ins && pre_del) {
	          // No changes made which could affect previous entry, keep going.
	          post_ins = post_del = true;
	          equalitiesLength = 0;
	        } else {
	          equalitiesLength--;  // Throw away the previous equality.
	          pointer = equalitiesLength > 0 ?
	              equalities[equalitiesLength - 1] : -1;
	          post_ins = post_del = false;
	        }
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	};
	
	
	/**
	 * Reorder and merge like edit sections.  Merge equalities.
	 * Any edit section can move as long as it doesn't cross an equality.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
	  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  var commonlength;
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete + count_insert > 1) {
	          if (count_delete !== 0 && count_insert !== 0) {
	            // Factor out any common prefixies.
	            commonlength = this.diff_commonPrefix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              if ((pointer - count_delete - count_insert) > 0 &&
	                  diffs[pointer - count_delete - count_insert - 1][0] ==
	                  DIFF_EQUAL) {
	                diffs[pointer - count_delete - count_insert - 1][1] +=
	                    text_insert.substring(0, commonlength);
	              } else {
	                diffs.splice(0, 0, [DIFF_EQUAL,
	                                    text_insert.substring(0, commonlength)]);
	                pointer++;
	              }
	              text_insert = text_insert.substring(commonlength);
	              text_delete = text_delete.substring(commonlength);
	            }
	            // Factor out any common suffixies.
	            commonlength = this.diff_commonSuffix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              diffs[pointer][1] = text_insert.substring(text_insert.length -
	                  commonlength) + diffs[pointer][1];
	              text_insert = text_insert.substring(0, text_insert.length -
	                  commonlength);
	              text_delete = text_delete.substring(0, text_delete.length -
	                  commonlength);
	            }
	          }
	          // Delete the offending records and add the merged ones.
	          if (count_delete === 0) {
	            diffs.splice(pointer - count_insert,
	                count_delete + count_insert, [DIFF_INSERT, text_insert]);
	          } else if (count_insert === 0) {
	            diffs.splice(pointer - count_delete,
	                count_delete + count_insert, [DIFF_DELETE, text_delete]);
	          } else {
	            diffs.splice(pointer - count_delete - count_insert,
	                count_delete + count_insert, [DIFF_DELETE, text_delete],
	                [DIFF_INSERT, text_insert]);
	          }
	          pointer = pointer - count_delete - count_insert +
	                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
	        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
	          // Merge this equality with the previous one.
	          diffs[pointer - 1][1] += diffs[pointer][1];
	          diffs.splice(pointer, 1);
	        } else {
	          pointer++;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	  }
	  if (diffs[diffs.length - 1][1] === '') {
	    diffs.pop();  // Remove the dummy entry at the end.
	  }
	
	  // Second pass: look for single edits surrounded on both sides by equalities
	  // which can be shifted sideways to eliminate an equality.
	  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
	  var changes = false;
	  pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      if (diffs[pointer][1].substring(diffs[pointer][1].length -
	          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
	        // Shift the edit over the previous equality.
	        diffs[pointer][1] = diffs[pointer - 1][1] +
	            diffs[pointer][1].substring(0, diffs[pointer][1].length -
	                                        diffs[pointer - 1][1].length);
	        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
	        diffs.splice(pointer - 1, 1);
	        changes = true;
	      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
	          diffs[pointer + 1][1]) {
	        // Shift the edit over the next equality.
	        diffs[pointer - 1][1] += diffs[pointer + 1][1];
	        diffs[pointer][1] =
	            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
	            diffs[pointer + 1][1];
	        diffs.splice(pointer + 1, 1);
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	  // If shifts were made, the diff needs reordering and another shift sweep.
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	};
	
	
	/**
	 * loc is a location in text1, compute and return the equivalent location in
	 * text2.
	 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @param {number} loc Location within text1.
	 * @return {number} Location within text2.
	 */
	diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
	  var chars1 = 0;
	  var chars2 = 0;
	  var last_chars1 = 0;
	  var last_chars2 = 0;
	  var x;
	  for (x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
	      chars1 += diffs[x][1].length;
	    }
	    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
	      chars2 += diffs[x][1].length;
	    }
	    if (chars1 > loc) {  // Overshot the location.
	      break;
	    }
	    last_chars1 = chars1;
	    last_chars2 = chars2;
	  }
	  // Was the location was deleted?
	  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
	    return last_chars2;
	  }
	  // Add the remaining character length.
	  return last_chars2 + (loc - last_chars1);
	};
	
	
	/**
	 * Convert a diff array into a pretty HTML report.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} HTML representation.
	 */
	diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
	  var html = [];
	  var pattern_amp = /&/g;
	  var pattern_lt = /</g;
	  var pattern_gt = />/g;
	  var pattern_para = /\n/g;
	  for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];    // Operation (insert, delete, equal)
	    var data = diffs[x][1];  // Text of change.
	    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
	        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
	    switch (op) {
	      case DIFF_INSERT:
	        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
	        break;
	      case DIFF_DELETE:
	        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
	        break;
	      case DIFF_EQUAL:
	        html[x] = '<span>' + text + '</span>';
	        break;
	    }
	  }
	  return html.join('');
	};
	
	
	/**
	 * Compute and return the source text (all equalities and deletions).
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Source text.
	 */
	diff_match_patch.prototype.diff_text1 = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_INSERT) {
	      text[x] = diffs[x][1];
	    }
	  }
	  return text.join('');
	};
	
	
	/**
	 * Compute and return the destination text (all equalities and insertions).
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Destination text.
	 */
	diff_match_patch.prototype.diff_text2 = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_DELETE) {
	      text[x] = diffs[x][1];
	    }
	  }
	  return text.join('');
	};
	
	
	/**
	 * Compute the Levenshtein distance; the number of inserted, deleted or
	 * substituted characters.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {number} Number of changes.
	 */
	diff_match_patch.prototype.diff_levenshtein = function(diffs) {
	  var levenshtein = 0;
	  var insertions = 0;
	  var deletions = 0;
	  for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];
	    var data = diffs[x][1];
	    switch (op) {
	      case DIFF_INSERT:
	        insertions += data.length;
	        break;
	      case DIFF_DELETE:
	        deletions += data.length;
	        break;
	      case DIFF_EQUAL:
	        // A deletion and an insertion is one substitution.
	        levenshtein += Math.max(insertions, deletions);
	        insertions = 0;
	        deletions = 0;
	        break;
	    }
	  }
	  levenshtein += Math.max(insertions, deletions);
	  return levenshtein;
	};
	
	
	/**
	 * Crush the diff into an encoded string which describes the operations
	 * required to transform text1 into text2.
	 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
	 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Delta text.
	 */
	diff_match_patch.prototype.diff_toDelta = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    switch (diffs[x][0]) {
	      case DIFF_INSERT:
	        text[x] = '+' + encodeURI(diffs[x][1]);
	        break;
	      case DIFF_DELETE:
	        text[x] = '-' + diffs[x][1].length;
	        break;
	      case DIFF_EQUAL:
	        text[x] = '=' + diffs[x][1].length;
	        break;
	    }
	  }
	  return text.join('\t').replace(/%20/g, ' ');
	};
	
	
	/**
	 * Given the original text1, and an encoded string which describes the
	 * operations required to transform text1 into text2, compute the full diff.
	 * @param {string} text1 Source string for the diff.
	 * @param {string} delta Delta text.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @throws {!Error} If invalid input.
	 */
	diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
	  var diffs = [];
	  var diffsLength = 0;  // Keeping our own length var is faster in JS.
	  var pointer = 0;  // Cursor in text1
	  var tokens = delta.split(/\t/g);
	  for (var x = 0; x < tokens.length; x++) {
	    // Each token begins with a one character parameter which specifies the
	    // operation of this token (delete, insert, equality).
	    var param = tokens[x].substring(1);
	    switch (tokens[x].charAt(0)) {
	      case '+':
	        try {
	          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
	        } catch (ex) {
	          // Malformed URI sequence.
	          throw new Error('Illegal escape in diff_fromDelta: ' + param);
	        }
	        break;
	      case '-':
	        // Fall through.
	      case '=':
	        var n = parseInt(param, 10);
	        if (isNaN(n) || n < 0) {
	          throw new Error('Invalid number in diff_fromDelta: ' + param);
	        }
	        var text = text1.substring(pointer, pointer += n);
	        if (tokens[x].charAt(0) == '=') {
	          diffs[diffsLength++] = [DIFF_EQUAL, text];
	        } else {
	          diffs[diffsLength++] = [DIFF_DELETE, text];
	        }
	        break;
	      default:
	        // Blank tokens are ok (from a trailing \t).
	        // Anything else is an error.
	        if (tokens[x]) {
	          throw new Error('Invalid diff operation in diff_fromDelta: ' +
	                          tokens[x]);
	        }
	    }
	  }
	  if (pointer != text1.length) {
	    throw new Error('Delta length (' + pointer +
	        ') does not equal source text length (' + text1.length + ').');
	  }
	  return diffs;
	};
	
	
	//  MATCH FUNCTIONS
	
	
	/**
	 * Locate the best instance of 'pattern' in 'text' near 'loc'.
	 * @param {string} text The text to search.
	 * @param {string} pattern The pattern to search for.
	 * @param {number} loc The location to search around.
	 * @return {number} Best match index or -1.
	 */
	diff_match_patch.prototype.match_main = function(text, pattern, loc) {
	  // Check for null inputs.
	  if (text == null || pattern == null || loc == null) {
	    throw new Error('Null input. (match_main)');
	  }
	
	  loc = Math.max(0, Math.min(loc, text.length));
	  if (text == pattern) {
	    // Shortcut (potentially not guaranteed by the algorithm)
	    return 0;
	  } else if (!text.length) {
	    // Nothing to match.
	    return -1;
	  } else if (text.substring(loc, loc + pattern.length) == pattern) {
	    // Perfect match at the perfect spot!  (Includes case of null pattern)
	    return loc;
	  } else {
	    // Do a fuzzy compare.
	    return this.match_bitap_(text, pattern, loc);
	  }
	};
	
	
	/**
	 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
	 * Bitap algorithm.
	 * @param {string} text The text to search.
	 * @param {string} pattern The pattern to search for.
	 * @param {number} loc The location to search around.
	 * @return {number} Best match index or -1.
	 * @private
	 */
	diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
	  if (pattern.length > this.Match_MaxBits) {
	    throw new Error('Pattern too long for this browser.');
	  }
	
	  // Initialise the alphabet.
	  var s = this.match_alphabet_(pattern);
	
	  var dmp = this;  // 'this' becomes 'window' in a closure.
	
	  /**
	   * Compute and return the score for a match with e errors and x location.
	   * Accesses loc and pattern through being a closure.
	   * @param {number} e Number of errors in match.
	   * @param {number} x Location of match.
	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
	   * @private
	   */
	  function match_bitapScore_(e, x) {
	    var accuracy = e / pattern.length;
	    var proximity = Math.abs(loc - x);
	    if (!dmp.Match_Distance) {
	      // Dodge divide by zero error.
	      return proximity ? 1.0 : accuracy;
	    }
	    return accuracy + (proximity / dmp.Match_Distance);
	  }
	
	  // Highest score beyond which we give up.
	  var score_threshold = this.Match_Threshold;
	  // Is there a nearby exact match? (speedup)
	  var best_loc = text.indexOf(pattern, loc);
	  if (best_loc != -1) {
	    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
	    // What about in the other direction? (speedup)
	    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
	    if (best_loc != -1) {
	      score_threshold =
	          Math.min(match_bitapScore_(0, best_loc), score_threshold);
	    }
	  }
	
	  // Initialise the bit arrays.
	  var matchmask = 1 << (pattern.length - 1);
	  best_loc = -1;
	
	  var bin_min, bin_mid;
	  var bin_max = pattern.length + text.length;
	  var last_rd;
	  for (var d = 0; d < pattern.length; d++) {
	    // Scan for the best match; each iteration allows for one more error.
	    // Run a binary search to determine how far from 'loc' we can stray at this
	    // error level.
	    bin_min = 0;
	    bin_mid = bin_max;
	    while (bin_min < bin_mid) {
	      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
	        bin_min = bin_mid;
	      } else {
	        bin_max = bin_mid;
	      }
	      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
	    }
	    // Use the result from this iteration as the maximum for the next.
	    bin_max = bin_mid;
	    var start = Math.max(1, loc - bin_mid + 1);
	    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
	
	    var rd = Array(finish + 2);
	    rd[finish + 1] = (1 << d) - 1;
	    for (var j = finish; j >= start; j--) {
	      // The alphabet (s) is a sparse hash, so the following line generates
	      // warnings.
	      var charMatch = s[text.charAt(j - 1)];
	      if (d === 0) {  // First pass: exact match.
	        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
	      } else {  // Subsequent passes: fuzzy match.
	        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
	                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
	                last_rd[j + 1];
	      }
	      if (rd[j] & matchmask) {
	        var score = match_bitapScore_(d, j - 1);
	        // This match will almost certainly be better than any existing match.
	        // But check anyway.
	        if (score <= score_threshold) {
	          // Told you so.
	          score_threshold = score;
	          best_loc = j - 1;
	          if (best_loc > loc) {
	            // When passing loc, don't exceed our current distance from loc.
	            start = Math.max(1, 2 * loc - best_loc);
	          } else {
	            // Already passed loc, downhill from here on in.
	            break;
	          }
	        }
	      }
	    }
	    // No hope for a (better) match at greater error levels.
	    if (match_bitapScore_(d + 1, loc) > score_threshold) {
	      break;
	    }
	    last_rd = rd;
	  }
	  return best_loc;
	};
	
	
	/**
	 * Initialise the alphabet for the Bitap algorithm.
	 * @param {string} pattern The text to encode.
	 * @return {!Object} Hash of character locations.
	 * @private
	 */
	diff_match_patch.prototype.match_alphabet_ = function(pattern) {
	  var s = {};
	  for (var i = 0; i < pattern.length; i++) {
	    s[pattern.charAt(i)] = 0;
	  }
	  for (var i = 0; i < pattern.length; i++) {
	    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
	  }
	  return s;
	};
	
	
	//  PATCH FUNCTIONS
	
	
	/**
	 * Increase the context until it is unique,
	 * but don't let the pattern expand beyond Match_MaxBits.
	 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
	 * @param {string} text Source text.
	 * @private
	 */
	diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
	  if (text.length == 0) {
	    return;
	  }
	  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
	  var padding = 0;
	
	  // Look for the first and last matches of pattern in text.  If two different
	  // matches are found, increase the pattern length.
	  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
	         pattern.length < this.Match_MaxBits - this.Patch_Margin -
	         this.Patch_Margin) {
	    padding += this.Patch_Margin;
	    pattern = text.substring(patch.start2 - padding,
	                             patch.start2 + patch.length1 + padding);
	  }
	  // Add one chunk for good luck.
	  padding += this.Patch_Margin;
	
	  // Add the prefix.
	  var prefix = text.substring(patch.start2 - padding, patch.start2);
	  if (prefix) {
	    patch.diffs.unshift([DIFF_EQUAL, prefix]);
	  }
	  // Add the suffix.
	  var suffix = text.substring(patch.start2 + patch.length1,
	                              patch.start2 + patch.length1 + padding);
	  if (suffix) {
	    patch.diffs.push([DIFF_EQUAL, suffix]);
	  }
	
	  // Roll back the start points.
	  patch.start1 -= prefix.length;
	  patch.start2 -= prefix.length;
	  // Extend the lengths.
	  patch.length1 += prefix.length + suffix.length;
	  patch.length2 += prefix.length + suffix.length;
	};
	
	
	/**
	 * Compute a list of patches to turn text1 into text2.
	 * Use diffs if provided, otherwise compute it ourselves.
	 * There are four ways to call this function, depending on what data is
	 * available to the caller:
	 * Method 1:
	 * a = text1, b = text2
	 * Method 2:
	 * a = diffs
	 * Method 3 (optimal):
	 * a = text1, b = diffs
	 * Method 4 (deprecated, use method 3):
	 * a = text1, b = text2, c = diffs
	 *
	 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
	 * Array of diff tuples for text1 to text2 (method 2).
	 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or
	 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
	 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples
	 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
	  var text1, diffs;
	  if (typeof a == 'string' && typeof opt_b == 'string' &&
	      typeof opt_c == 'undefined') {
	    // Method 1: text1, text2
	    // Compute diffs from text1 and text2.
	    text1 = /** @type {string} */(a);
	    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
	    if (diffs.length > 2) {
	      this.diff_cleanupSemantic(diffs);
	      this.diff_cleanupEfficiency(diffs);
	    }
	  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
	      typeof opt_c == 'undefined') {
	    // Method 2: diffs
	    // Compute text1 from diffs.
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
	    text1 = this.diff_text1(diffs);
	  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
	      typeof opt_c == 'undefined') {
	    // Method 3: text1, diffs
	    text1 = /** @type {string} */(a);
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
	  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
	      opt_c && typeof opt_c == 'object') {
	    // Method 4: text1, text2, diffs
	    // text2 is not used.
	    text1 = /** @type {string} */(a);
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
	  } else {
	    throw new Error('Unknown call format to patch_make.');
	  }
	
	  if (diffs.length === 0) {
	    return [];  // Get rid of the null case.
	  }
	  var patches = [];
	  var patch = new diff_match_patch.patch_obj();
	  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
	  var char_count1 = 0;  // Number of characters into the text1 string.
	  var char_count2 = 0;  // Number of characters into the text2 string.
	  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
	  // text2 (postpatch_text).  We recreate the patches one by one to determine
	  // context info.
	  var prepatch_text = text1;
	  var postpatch_text = text1;
	  for (var x = 0; x < diffs.length; x++) {
	    var diff_type = diffs[x][0];
	    var diff_text = diffs[x][1];
	
	    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
	      // A new patch starts here.
	      patch.start1 = char_count1;
	      patch.start2 = char_count2;
	    }
	
	    switch (diff_type) {
	      case DIFF_INSERT:
	        patch.diffs[patchDiffLength++] = diffs[x];
	        patch.length2 += diff_text.length;
	        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
	                         postpatch_text.substring(char_count2);
	        break;
	      case DIFF_DELETE:
	        patch.length1 += diff_text.length;
	        patch.diffs[patchDiffLength++] = diffs[x];
	        postpatch_text = postpatch_text.substring(0, char_count2) +
	                         postpatch_text.substring(char_count2 +
	                             diff_text.length);
	        break;
	      case DIFF_EQUAL:
	        if (diff_text.length <= 2 * this.Patch_Margin &&
	            patchDiffLength && diffs.length != x + 1) {
	          // Small equality inside a patch.
	          patch.diffs[patchDiffLength++] = diffs[x];
	          patch.length1 += diff_text.length;
	          patch.length2 += diff_text.length;
	        } else if (diff_text.length >= 2 * this.Patch_Margin) {
	          // Time for a new patch.
	          if (patchDiffLength) {
	            this.patch_addContext_(patch, prepatch_text);
	            patches.push(patch);
	            patch = new diff_match_patch.patch_obj();
	            patchDiffLength = 0;
	            // Unlike Unidiff, our patch lists have a rolling context.
	            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff
	            // Update prepatch text & pos to reflect the application of the
	            // just completed patch.
	            prepatch_text = postpatch_text;
	            char_count1 = char_count2;
	          }
	        }
	        break;
	    }
	
	    // Update the current character count.
	    if (diff_type !== DIFF_INSERT) {
	      char_count1 += diff_text.length;
	    }
	    if (diff_type !== DIFF_DELETE) {
	      char_count2 += diff_text.length;
	    }
	  }
	  // Pick up the leftover patch if not empty.
	  if (patchDiffLength) {
	    this.patch_addContext_(patch, prepatch_text);
	    patches.push(patch);
	  }
	
	  return patches;
	};
	
	
	/**
	 * Given an array of patches, return another array that is identical.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_deepCopy = function(patches) {
	  // Making deep copies is hard in JavaScript.
	  var patchesCopy = [];
	  for (var x = 0; x < patches.length; x++) {
	    var patch = patches[x];
	    var patchCopy = new diff_match_patch.patch_obj();
	    patchCopy.diffs = [];
	    for (var y = 0; y < patch.diffs.length; y++) {
	      patchCopy.diffs[y] = patch.diffs[y].slice();
	    }
	    patchCopy.start1 = patch.start1;
	    patchCopy.start2 = patch.start2;
	    patchCopy.length1 = patch.length1;
	    patchCopy.length2 = patch.length2;
	    patchesCopy[x] = patchCopy;
	  }
	  return patchesCopy;
	};
	
	
	/**
	 * Merge a set of patches onto the text.  Return a patched text, as well
	 * as a list of true/false values indicating which patches were applied.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @param {string} text Old text.
	 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
	 *      new text and an array of boolean values.
	 */
	diff_match_patch.prototype.patch_apply = function(patches, text) {
	  if (patches.length == 0) {
	    return [text, []];
	  }
	
	  // Deep copy the patches so that no changes are made to originals.
	  patches = this.patch_deepCopy(patches);
	
	  var nullPadding = this.patch_addPadding(patches);
	  text = nullPadding + text + nullPadding;
	
	  this.patch_splitMax(patches);
	  // delta keeps track of the offset between the expected and actual location
	  // of the previous patch.  If there are patches expected at positions 10 and
	  // 20, but the first patch was found at 12, delta is 2 and the second patch
	  // has an effective expected position of 22.
	  var delta = 0;
	  var results = [];
	  for (var x = 0; x < patches.length; x++) {
	    var expected_loc = patches[x].start2 + delta;
	    var text1 = this.diff_text1(patches[x].diffs);
	    var start_loc;
	    var end_loc = -1;
	    if (text1.length > this.Match_MaxBits) {
	      // patch_splitMax will only provide an oversized pattern in the case of
	      // a monster delete.
	      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
	                                  expected_loc);
	      if (start_loc != -1) {
	        end_loc = this.match_main(text,
	            text1.substring(text1.length - this.Match_MaxBits),
	            expected_loc + text1.length - this.Match_MaxBits);
	        if (end_loc == -1 || start_loc >= end_loc) {
	          // Can't find valid trailing context.  Drop this patch.
	          start_loc = -1;
	        }
	      }
	    } else {
	      start_loc = this.match_main(text, text1, expected_loc);
	    }
	    if (start_loc == -1) {
	      // No match found.  :(
	      results[x] = false;
	      // Subtract the delta for this failed patch from subsequent patches.
	      delta -= patches[x].length2 - patches[x].length1;
	    } else {
	      // Found a match.  :)
	      results[x] = true;
	      delta = start_loc - expected_loc;
	      var text2;
	      if (end_loc == -1) {
	        text2 = text.substring(start_loc, start_loc + text1.length);
	      } else {
	        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
	      }
	      if (text1 == text2) {
	        // Perfect match, just shove the replacement text in.
	        text = text.substring(0, start_loc) +
	               this.diff_text2(patches[x].diffs) +
	               text.substring(start_loc + text1.length);
	      } else {
	        // Imperfect match.  Run a diff to get a framework of equivalent
	        // indices.
	        var diffs = this.diff_main(text1, text2, false);
	        if (text1.length > this.Match_MaxBits &&
	            this.diff_levenshtein(diffs) / text1.length >
	            this.Patch_DeleteThreshold) {
	          // The end points match, but the content is unacceptably bad.
	          results[x] = false;
	        } else {
	          this.diff_cleanupSemanticLossless(diffs);
	          var index1 = 0;
	          var index2;
	          for (var y = 0; y < patches[x].diffs.length; y++) {
	            var mod = patches[x].diffs[y];
	            if (mod[0] !== DIFF_EQUAL) {
	              index2 = this.diff_xIndex(diffs, index1);
	            }
	            if (mod[0] === DIFF_INSERT) {  // Insertion
	              text = text.substring(0, start_loc + index2) + mod[1] +
	                     text.substring(start_loc + index2);
	            } else if (mod[0] === DIFF_DELETE) {  // Deletion
	              text = text.substring(0, start_loc + index2) +
	                     text.substring(start_loc + this.diff_xIndex(diffs,
	                         index1 + mod[1].length));
	            }
	            if (mod[0] !== DIFF_DELETE) {
	              index1 += mod[1].length;
	            }
	          }
	        }
	      }
	    }
	  }
	  // Strip the padding off.
	  text = text.substring(nullPadding.length, text.length - nullPadding.length);
	  return [text, results];
	};
	
	
	/**
	 * Add some padding on text start and end so that edges can match something.
	 * Intended to be called only from within patch_apply.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {string} The padding string added to each side.
	 */
	diff_match_patch.prototype.patch_addPadding = function(patches) {
	  var paddingLength = this.Patch_Margin;
	  var nullPadding = '';
	  for (var x = 1; x <= paddingLength; x++) {
	    nullPadding += String.fromCharCode(x);
	  }
	
	  // Bump all the patches forward.
	  for (var x = 0; x < patches.length; x++) {
	    patches[x].start1 += paddingLength;
	    patches[x].start2 += paddingLength;
	  }
	
	  // Add some padding on start of first diff.
	  var patch = patches[0];
	  var diffs = patch.diffs;
	  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
	    // Add nullPadding equality.
	    diffs.unshift([DIFF_EQUAL, nullPadding]);
	    patch.start1 -= paddingLength;  // Should be 0.
	    patch.start2 -= paddingLength;  // Should be 0.
	    patch.length1 += paddingLength;
	    patch.length2 += paddingLength;
	  } else if (paddingLength > diffs[0][1].length) {
	    // Grow first equality.
	    var extraLength = paddingLength - diffs[0][1].length;
	    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
	    patch.start1 -= extraLength;
	    patch.start2 -= extraLength;
	    patch.length1 += extraLength;
	    patch.length2 += extraLength;
	  }
	
	  // Add some padding on end of last diff.
	  patch = patches[patches.length - 1];
	  diffs = patch.diffs;
	  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
	    // Add nullPadding equality.
	    diffs.push([DIFF_EQUAL, nullPadding]);
	    patch.length1 += paddingLength;
	    patch.length2 += paddingLength;
	  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
	    // Grow last equality.
	    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
	    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
	    patch.length1 += extraLength;
	    patch.length2 += extraLength;
	  }
	
	  return nullPadding;
	};
	
	
	/**
	 * Look through the patches and break up any which are longer than the maximum
	 * limit of the match algorithm.
	 * Intended to be called only from within patch_apply.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_splitMax = function(patches) {
	  var patch_size = this.Match_MaxBits;
	  for (var x = 0; x < patches.length; x++) {
	    if (patches[x].length1 <= patch_size) {
	      continue;
	    }
	    var bigpatch = patches[x];
	    // Remove the big old patch.
	    patches.splice(x--, 1);
	    var start1 = bigpatch.start1;
	    var start2 = bigpatch.start2;
	    var precontext = '';
	    while (bigpatch.diffs.length !== 0) {
	      // Create one of several smaller patches.
	      var patch = new diff_match_patch.patch_obj();
	      var empty = true;
	      patch.start1 = start1 - precontext.length;
	      patch.start2 = start2 - precontext.length;
	      if (precontext !== '') {
	        patch.length1 = patch.length2 = precontext.length;
	        patch.diffs.push([DIFF_EQUAL, precontext]);
	      }
	      while (bigpatch.diffs.length !== 0 &&
	             patch.length1 < patch_size - this.Patch_Margin) {
	        var diff_type = bigpatch.diffs[0][0];
	        var diff_text = bigpatch.diffs[0][1];
	        if (diff_type === DIFF_INSERT) {
	          // Insertions are harmless.
	          patch.length2 += diff_text.length;
	          start2 += diff_text.length;
	          patch.diffs.push(bigpatch.diffs.shift());
	          empty = false;
	        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
	                   patch.diffs[0][0] == DIFF_EQUAL &&
	                   diff_text.length > 2 * patch_size) {
	          // This is a large deletion.  Let it pass in one chunk.
	          patch.length1 += diff_text.length;
	          start1 += diff_text.length;
	          empty = false;
	          patch.diffs.push([diff_type, diff_text]);
	          bigpatch.diffs.shift();
	        } else {
	          // Deletion or equality.  Only take as much as we can stomach.
	          diff_text = diff_text.substring(0,
	              patch_size - patch.length1 - this.Patch_Margin);
	          patch.length1 += diff_text.length;
	          start1 += diff_text.length;
	          if (diff_type === DIFF_EQUAL) {
	            patch.length2 += diff_text.length;
	            start2 += diff_text.length;
	          } else {
	            empty = false;
	          }
	          patch.diffs.push([diff_type, diff_text]);
	          if (diff_text == bigpatch.diffs[0][1]) {
	            bigpatch.diffs.shift();
	          } else {
	            bigpatch.diffs[0][1] =
	                bigpatch.diffs[0][1].substring(diff_text.length);
	          }
	        }
	      }
	      // Compute the head context for the next patch.
	      precontext = this.diff_text2(patch.diffs);
	      precontext =
	          precontext.substring(precontext.length - this.Patch_Margin);
	      // Append the end context for this patch.
	      var postcontext = this.diff_text1(bigpatch.diffs)
	                            .substring(0, this.Patch_Margin);
	      if (postcontext !== '') {
	        patch.length1 += postcontext.length;
	        patch.length2 += postcontext.length;
	        if (patch.diffs.length !== 0 &&
	            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
	          patch.diffs[patch.diffs.length - 1][1] += postcontext;
	        } else {
	          patch.diffs.push([DIFF_EQUAL, postcontext]);
	        }
	      }
	      if (!empty) {
	        patches.splice(++x, 0, patch);
	      }
	    }
	  }
	};
	
	
	/**
	 * Take a list of patches and return a textual representation.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {string} Text representation of patches.
	 */
	diff_match_patch.prototype.patch_toText = function(patches) {
	  var text = [];
	  for (var x = 0; x < patches.length; x++) {
	    text[x] = patches[x];
	  }
	  return text.join('');
	};
	
	
	/**
	 * Parse a textual representation of patches and return a list of Patch objects.
	 * @param {string} textline Text representation of patches.
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 * @throws {!Error} If invalid input.
	 */
	diff_match_patch.prototype.patch_fromText = function(textline) {
	  var patches = [];
	  if (!textline) {
	    return patches;
	  }
	  var text = textline.split('\n');
	  var textPointer = 0;
	  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
	  while (textPointer < text.length) {
	    var m = text[textPointer].match(patchHeader);
	    if (!m) {
	      throw new Error('Invalid patch string: ' + text[textPointer]);
	    }
	    var patch = new diff_match_patch.patch_obj();
	    patches.push(patch);
	    patch.start1 = parseInt(m[1], 10);
	    if (m[2] === '') {
	      patch.start1--;
	      patch.length1 = 1;
	    } else if (m[2] == '0') {
	      patch.length1 = 0;
	    } else {
	      patch.start1--;
	      patch.length1 = parseInt(m[2], 10);
	    }
	
	    patch.start2 = parseInt(m[3], 10);
	    if (m[4] === '') {
	      patch.start2--;
	      patch.length2 = 1;
	    } else if (m[4] == '0') {
	      patch.length2 = 0;
	    } else {
	      patch.start2--;
	      patch.length2 = parseInt(m[4], 10);
	    }
	    textPointer++;
	
	    while (textPointer < text.length) {
	      var sign = text[textPointer].charAt(0);
	      try {
	        var line = decodeURI(text[textPointer].substring(1));
	      } catch (ex) {
	        // Malformed URI sequence.
	        throw new Error('Illegal escape in patch_fromText: ' + line);
	      }
	      if (sign == '-') {
	        // Deletion.
	        patch.diffs.push([DIFF_DELETE, line]);
	      } else if (sign == '+') {
	        // Insertion.
	        patch.diffs.push([DIFF_INSERT, line]);
	      } else if (sign == ' ') {
	        // Minor equality.
	        patch.diffs.push([DIFF_EQUAL, line]);
	      } else if (sign == '@') {
	        // Start of next patch.
	        break;
	      } else if (sign === '') {
	        // Blank line?  Whatever.
	      } else {
	        // WTF?
	        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
	      }
	      textPointer++;
	    }
	  }
	  return patches;
	};
	
	
	/**
	 * Class representing one patch operation.
	 * @constructor
	 */
	diff_match_patch.patch_obj = function() {
	  /** @type {!Array.<!diff_match_patch.Diff>} */
	  this.diffs = [];
	  /** @type {?number} */
	  this.start1 = null;
	  /** @type {?number} */
	  this.start2 = null;
	  /** @type {number} */
	  this.length1 = 0;
	  /** @type {number} */
	  this.length2 = 0;
	};
	
	
	/**
	 * Emmulate GNU diff's format.
	 * Header: @@ -382,8 +481,9 @@
	 * Indicies are printed as 1-based, not 0-based.
	 * @return {string} The GNU diff string.
	 */
	diff_match_patch.patch_obj.prototype.toString = function() {
	  var coords1, coords2;
	  if (this.length1 === 0) {
	    coords1 = this.start1 + ',0';
	  } else if (this.length1 == 1) {
	    coords1 = this.start1 + 1;
	  } else {
	    coords1 = (this.start1 + 1) + ',' + this.length1;
	  }
	  if (this.length2 === 0) {
	    coords2 = this.start2 + ',0';
	  } else if (this.length2 == 1) {
	    coords2 = this.start2 + 1;
	  } else {
	    coords2 = (this.start2 + 1) + ',' + this.length2;
	  }
	  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
	  var op;
	  // Escape the body of the patch with %xx notation.
	  for (var x = 0; x < this.diffs.length; x++) {
	    switch (this.diffs[x][0]) {
	      case DIFF_INSERT:
	        op = '+';
	        break;
	      case DIFF_DELETE:
	        op = '-';
	        break;
	      case DIFF_EQUAL:
	        op = ' ';
	        break;
	    }
	    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
	  }
	  return text.join('').replace(/%20/g, ' ');
	};
	
	
	// The following export code was added by @ForbesLindesay
	module.exports = diff_match_patch;
	module.exports['diff_match_patch'] = diff_match_patch;
	module.exports['DIFF_DELETE'] = DIFF_DELETE;
	module.exports['DIFF_INSERT'] = DIFF_INSERT;
	module.exports['DIFF_EQUAL'] = DIFF_EQUAL;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OT = __webpack_require__(6);
	var CS = __webpack_require__(9);
	var ClientActions = __webpack_require__(10);
	var Agree = __webpack_require__(11);
	var Util = __webpack_require__(12);
	var AgreeControl = (function () {
	    function AgreeControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.editRoot = null;
	        this.userMap = {};
	        this.agree = new Agree.Agree();
	        this.assureLocalUser = this.assureLocalUser.bind(this);
	        cs.onJoin('root', this.assureLocalUser);
	        this.notifyChangeMeta = this.notifyChangeMeta.bind(this);
	        cs.onData(CS.MetaResource, this.notifyChangeMeta);
	        this.notifyChangeUsers = this.notifyChangeUsers.bind(this);
	        cs.onData('users', this.notifyChangeUsers);
	        this.notifyChangeChoices = this.notifyChangeChoices.bind(this);
	        cs.onData('choices', this.notifyChangeChoices);
	        this.notifyChangeSelects = this.notifyChangeSelects.bind(this);
	        cs.onData('selects', this.notifyChangeSelects);
	        this.notifyUserChange = this.notifyUserChange.bind(this);
	        cs.onData('WellKnownName_users', this.notifyUserChange);
	        this.notifyLocal_setName = this.notifyLocal_setName.bind(this);
	        this.notifyLocal_setType = this.notifyLocal_setType.bind(this);
	        this.notifyLocal_setUser = this.notifyLocal_setUser.bind(this);
	        this.notifyLocal_setChoice = this.notifyLocal_setChoice.bind(this);
	        this.notifyLocal_setSelect = this.notifyLocal_setSelect.bind(this);
	        this.updateUser = this.updateUser.bind(this);
	        this.doneUser = this.doneUser.bind(this);
	        this.updateChoice = this.updateChoice.bind(this);
	        this.doneChoice = this.doneChoice.bind(this);
	        this.propsUser = { bImg: true, bFocus: true, bActive: false, val: '+ User', valEdit: '', update: this.updateUser, done: this.doneUser };
	        this.propsChoice = { bImg: true, bFocus: true, bActive: false, val: '+ Choice', valEdit: '', update: this.updateChoice, done: this.doneChoice };
	    }
	    AgreeControl.prototype.reset = function () {
	        this.userMap = {};
	        this.agree = new Agree.Agree();
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyChangeMeta = function (cs, state) {
	        if (state === undefined)
	            this.reset();
	        else
	            this.agree.meta = state;
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyChangeUsers = function (cs, state) {
	        if (state === undefined)
	            this.reset();
	        else
	            this.agree.users = state;
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyChangeChoices = function (cs, state) {
	        if (state === undefined)
	            this.reset();
	        else
	            this.agree.choices = state;
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyChangeSelects = function (cs, state) {
	        if (state === undefined)
	            this.reset();
	        else
	            this.agree.selects = state;
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyUserChange = function (cs, userMap) {
	        if (userMap === undefined)
	            this.reset();
	        else
	            this.userMap = userMap;
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyLocal_start = function () {
	        var css = this.clientSession.session;
	        if (css.bInSession)
	            this.editRoot = css.startLocalEdit();
	    };
	    AgreeControl.prototype.notifyLocal_finish = function () {
	        this.clientSession.session.addLocal(this.editRoot);
	        this.editRoot = null;
	        this.reRender();
	    };
	    AgreeControl.prototype.notifyLocal_setProp = function (mapName, prop, value) {
	        this.notifyLocal_start();
	        var editMap = new OT.OTMapResource(mapName);
	        editMap.edits.push([OT.OpMapSet, prop, value]);
	        this.editRoot.edits.push(editMap);
	        this.notifyLocal_finish();
	    };
	    AgreeControl.prototype.notifyLocal_deleteProp = function (mapName, prop) {
	        this.notifyLocal_start();
	        var editMap = new OT.OTMapResource(mapName);
	        editMap.edits.push([OT.OpMapDel, prop, '']);
	        this.editRoot.edits.push(editMap);
	        this.notifyLocal_finish();
	    };
	    AgreeControl.prototype.notifyLocal_setName = function (s) {
	        if (s != this.agree.meta.name)
	            this.notifyLocal_setProp(CS.MetaResource, 'name', s);
	    };
	    AgreeControl.prototype.notifyLocal_setType = function (s) {
	        if (s != this.agree.meta.dtype)
	            this.notifyLocal_setProp(CS.MetaResource, 'dtype', s);
	    };
	    AgreeControl.prototype.notifyLocal_setUser = function (sid, name) {
	        if (name) {
	            if (this.agree.users[sid] === undefined || this.agree.users[sid] != name)
	                this.notifyLocal_setProp('users', sid, name);
	        }
	        else {
	            this.notifyLocal_deleteProp('users', sid);
	            this.assureLocalUser();
	        }
	    };
	    AgreeControl.prototype.assureLocalUser = function () {
	        var cs = this.clientSession;
	        if (cs.bInSession && cs.userID != '') {
	            var meSID = cs.userID;
	            if (this.agree.users[meSID] === undefined)
	                this.notifyLocal_setUser(meSID, cs.user.name);
	        }
	    };
	    AgreeControl.prototype.notifyLocal_setChoice = function (choice) {
	        if (this.clientSession.bInSession) {
	            this.notifyLocal_start();
	            var editChoices = new OT.OTArrayResource('choices');
	            var i = 0;
	            for (; i < this.agree.choices.length; i++) {
	                var c = this.agree.choices[i];
	                if (c[0] == choice[0]) {
	                    if (i)
	                        editChoices.edits.push([OT.OpRetain, i, []]);
	                    if (choice[2] != '')
	                        editChoices.edits.push([OT.OpSet, 1, [choice]]);
	                    else
	                        editChoices.edits.push([OT.OpDelete, 1, []]);
	                    if (i + 1 < this.agree.choices.length)
	                        editChoices.edits.push([OT.OpRetain, this.agree.choices.length - (i + 1), []]);
	                    break;
	                }
	            }
	            if (i == this.agree.choices.length) {
	                if (i > 0)
	                    editChoices.edits.push([OT.OpRetain, i, []]);
	                if (choice[2] != '')
	                    editChoices.edits.push([OT.OpInsert, 1, [choice]]);
	            }
	            this.editRoot.edits.push(editChoices);
	            this.notifyLocal_finish();
	        }
	    };
	    AgreeControl.prototype.notifyLocal_setSelect = function (prop, value) {
	        if (this.agree.selects[prop] === undefined || this.agree.selects[prop] != value)
	            this.notifyLocal_setProp('selects', prop, value);
	    };
	    AgreeControl.prototype.doneEdits = function (ok) {
	        this.doneUser(ok);
	        this.doneChoice(ok);
	        this.propsUser.bActive = false;
	        this.propsChoice.bActive = false;
	    };
	    AgreeControl.prototype.editUser = function () {
	        this.actions.fire(ClientActions.DoneEdits, true);
	        this.propsUser.bActive = true;
	    };
	    AgreeControl.prototype.editChoice = function () {
	        this.actions.fire(ClientActions.DoneEdits, true);
	        this.propsChoice.bActive = true;
	    };
	    AgreeControl.prototype.updateUser = function (valEdit) {
	        this.propsUser.valEdit = valEdit;
	        this.reRender();
	    };
	    AgreeControl.prototype.updateChoice = function (valEdit) {
	        this.propsChoice.valEdit = valEdit;
	        this.reRender();
	    };
	    AgreeControl.prototype.doneUser = function (ok) {
	        if (this.propsUser.bActive && ok && this.propsUser.valEdit != '')
	            this.notifyLocal_setUser('anom/' + Util.createGuid(), this.propsUser.valEdit);
	        else
	            this.propsUser.bActive = false;
	        this.propsUser.valEdit = '';
	        this.reRender();
	    };
	    AgreeControl.prototype.doneChoice = function (ok) {
	        if (this.propsChoice.bActive && ok && this.propsChoice.valEdit != '')
	            this.notifyLocal_setChoice([Util.createGuid(), 'enum', this.propsChoice.valEdit, '']);
	        else
	            this.propsChoice.bActive = false;
	        this.propsChoice.valEdit = '';
	        this.reRender();
	    };
	    return AgreeControl;
	}());
	exports.AgreeControl = AgreeControl;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var $ = __webpack_require__(1);
	var OT = __webpack_require__(6);
	exports.MetaResource = "WellKnownName_meta";
	var SpeedManager = (function () {
	    function SpeedManager() {
	        this._Speed = 100;
	        this._SlowCounter = 0;
	    }
	    Object.defineProperty(SpeedManager.prototype, "speed", {
	        get: function () { return this._Speed; },
	        enumerable: true,
	        configurable: true
	    });
	    SpeedManager.prototype.speedUp = function () {
	        this._Speed = 100; // Speed up quickly.
	        this._SlowCounter = 0;
	    };
	    SpeedManager.prototype.slowDown = function () {
	        this._SlowCounter++; // Slow down slowly
	        if (this._SlowCounter == 10 && this._Speed < 5000) {
	            this._SlowCounter = 0;
	            this._Speed *= 2;
	        }
	    };
	    return SpeedManager;
	}());
	exports.SpeedManager = SpeedManager;
	var ReqCreate = 0;
	var ReqJoin = 1;
	var ReqSendEdit = 2;
	var ReqReceiveEdit = 3;
	var ReqUser = 4;
	var ReqEdit = 5; // Pseudo request that launches either SendEdit or ReceiveEdit depending on context
	var NRequestTypes = 5;
	var ClientSessionState = (function () {
	    function ClientSessionState(cs) {
	        this.parent = cs;
	        this.sessionID = '';
	        this.sessionView = {};
	        this.pendingType = '';
	        this.clientEngine = null;
	        this.state = {};
	        this.meta = {};
	        this.bReachable = false;
	        this.bFull = false;
	        this.baPending = [];
	        for (var i = 0; i < NRequestTypes; i++)
	            this.baPending[i] = false;
	    }
	    ClientSessionState.prototype.getProp = function (p) {
	        return this.meta[p];
	    };
	    ClientSessionState.prototype.getType = function () {
	        return this.getProp('type');
	    };
	    ClientSessionState.prototype.getName = function () {
	        return this.getProp('name');
	    };
	    ClientSessionState.prototype.setProp = function (p, v) {
	        if (this.clientEngine) {
	            var editRoot = this.startLocalEdit();
	            var metaRoot = new OT.OTMapResource(exports.MetaResource);
	            editRoot.edits.push(metaRoot);
	            metaRoot.edits.push([OT.OpMapSet, p, v]);
	            this.clientEngine.addLocal(editRoot);
	        }
	    };
	    ClientSessionState.prototype.setType = function (v) {
	        this.setProp('type', v);
	    };
	    ClientSessionState.prototype.setName = function (v) {
	        this.setProp('name', v);
	    };
	    Object.defineProperty(ClientSessionState.prototype, "bInSession", {
	        get: function () {
	            return this.clientEngine != null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientSessionState.prototype, "bPendingConnection", {
	        get: function () {
	            return this.baPending[ReqCreate] || this.baPending[ReqJoin];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ClientSessionState.prototype.setReachable = function (b) {
	        if (b != this.bReachable) {
	            this.bReachable = b;
	            this.parent.notifyStatusChange();
	        }
	    };
	    ClientSessionState.prototype.setFull = function (b) {
	        if (b != this.bFull) {
	            this.bFull = b;
	            this.parent.notifyStatusChange();
	        }
	    };
	    ClientSessionState.prototype.startLocalEdit = function () {
	        return new OT.OTCompositeResource(this.sessionID, this.parent.clientID);
	    };
	    ClientSessionState.prototype.addLocal = function (edit) {
	        if (this.clientEngine) {
	            this.clientEngine.addLocal(edit);
	            this.tick();
	            this.parent.notifyData();
	        }
	    };
	    ClientSessionState.prototype.start = function (req) {
	        // ReqEdit is a special pseudo-request that maps to ReqSendEdit or ReqReceiveEdit
	        if (req == ReqEdit) {
	            if (this.clientEngine && this.clientEngine.isPending())
	                this.start(ReqSendEdit);
	            else
	                this.start(ReqReceiveEdit);
	            return;
	        }
	        // If we've already launched this operation, ignore
	        if (this.baPending[req])
	            return;
	        // If we're not creating and we have no session, ignore
	        if (req != ReqCreate && req != ReqUser && this.sessionID == '')
	            return;
	        // Note we have fired this request
	        this.baPending[req] = true;
	        var css = this;
	        switch (req) {
	            case ReqUser:
	                $.post("/api/sessions/userview")
	                    .done(function (result) { css.done(ReqUser, result); })
	                    .fail(function () { css.fail(ReqUser); })
	                    .always(function () { css.complete(ReqUser); });
	                break;
	            case ReqCreate:
	                {
	                    this.setReachable(false);
	                    this.setFull(false);
	                    var data = {};
	                    $.ajax("/api/sessions/create", {
	                        "method": "POST",
	                        "contentType": "application/json; charset=UTF-8",
	                        "data": JSON.stringify(data),
	                        "processData": false,
	                        "dataType": "json"
	                    })
	                        .done(function (result) { css.done(ReqCreate, result); })
	                        .fail(function () { css.fail(ReqCreate); })
	                        .always(function () { css.complete(ReqCreate); });
	                }
	                break;
	            case ReqJoin:
	                {
	                    var data = { clientID: this.parent.clientID };
	                    $.ajax("/api/sessions/connect/" + this.sessionID, {
	                        "method": "POST",
	                        "contentType": "application/json; charset=UTF-8",
	                        "data": JSON.stringify(data),
	                        "processData": false,
	                        "dataType": "json"
	                    })
	                        .done(function (result) { css.done(ReqJoin, result); })
	                        .fail(function () { css.fail(ReqJoin); })
	                        .always(function () { css.complete(ReqJoin); });
	                }
	                break;
	            case ReqSendEdit:
	                {
	                    var edit = this.clientEngine.getPending();
	                    var data = { clientID: this.clientEngine.clientID, "Edit": edit.toJSON() };
	                    $.ajax("/api/sessions/sendevent/" + this.sessionID, {
	                        "method": "POST",
	                        "contentType": "application/json; charset=UTF-8",
	                        "data": JSON.stringify(data),
	                        "processData": false,
	                        "dataType": "json"
	                    })
	                        .done(function (result) { css.done(ReqSendEdit, result); })
	                        .fail(function () { css.fail(ReqSendEdit); })
	                        .always(function () { css.complete(ReqSendEdit); });
	                }
	                break;
	            case ReqReceiveEdit:
	                {
	                    $.ajax("/api/sessions/receiveevent/" + this.sessionID, {
	                        "method": "POST",
	                        "data": JSON.stringify({ clientID: this.clientEngine.clientID,
	                            "NextClock": this.clientEngine.serverClock() + 1 }),
	                        "contentType": "application/json; charset=UTF-8",
	                        "processData": false,
	                        "dataType": "json"
	                    })
	                        .done(function (result) { css.done(ReqReceiveEdit, result); })
	                        .fail(function () { css.fail(ReqReceiveEdit); })
	                        .always(function () { css.complete(ReqReceiveEdit); });
	                }
	                break;
	        }
	    };
	    ClientSessionState.prototype.done = function (req, result) {
	        // Successful response from server - we're connected
	        this.parent.setConnected(true);
	        // If this request is not pending, it got canceled - ignore
	        if (!this.baPending[req])
	            return;
	        // Check for odd result code
	        if (result === undefined || result.result === undefined) {
	            this.parent.context.log(1, "Create session succeeded but no result status.");
	            return;
	        }
	        var nResult = result.result;
	        switch (req) {
	            case ReqUser:
	                if (nResult != 0)
	                    this.parent.context.log(1, "user view succeeded but non-zero result status: " + String(nResult));
	                else if (result.user) {
	                    this.parent.user = result.user;
	                    this.parent.notifyStatusChange();
	                    this.parent.notifyJoin();
	                }
	                break;
	            case ReqCreate:
	                if (nResult != 0)
	                    this.parent.context.log(1, "Create session succeeded but non-zero result status: " + String(nResult));
	                else {
	                    this.setReachable(true);
	                    this.setFull(false);
	                    this.sessionView = result.view;
	                    this.sessionID = this.sessionView.sessionID;
	                    this.parent.sessions[this.sessionID] = this;
	                    // And immediately join
	                    this.tick();
	                }
	                break;
	            case ReqJoin:
	                if (nResult == 2) {
	                    this.setFull(true);
	                    this.parent.context.log(1, "Join session succeeded but non-zero result status: " + String(nResult));
	                }
	                else {
	                    this.setFull(false);
	                    this.parent.clientID = result.clientID;
	                    this.sessionView = result.view;
	                    this.clientEngine = new OT.OTClientEngine(this.parent.context, this.sessionID, this.parent.clientID);
	                    // OK, now let any registered observers know about the new session
	                    this.parent.notifyJoin();
	                    // And immediately send pending edits
	                    this.tick();
	                }
	                break;
	            case ReqSendEdit:
	            case ReqReceiveEdit:
	                {
	                    this.setReachable(true);
	                    this.setFull(false);
	                    if (nResult != OT.clockSuccess) {
	                        switch (nResult) {
	                            case 1:
	                                // "No such session"
	                                this.setReachable(false);
	                                break;
	                            case OT.clockInitialValue:
	                                // Ooops, need a reset
	                                this.clientEngine.initialize();
	                                break;
	                            case OT.clockSeenValue:
	                                // I already sent event - probably lost response from server but I should eventually see ack.
	                                break;
	                            case OT.clockFailureValue:
	                                // Server didn't have old clock value needed to transform my event request. Just resend with
	                                // more recent clock value.
	                                this.clientEngine.resetPending();
	                                break;
	                            default:
	                                // Unknown error - reset and reinitialize
	                                this.clientEngine.initialize();
	                        }
	                    }
	                    else {
	                        var aEdits = result.EditList;
	                        if (aEdits && aEdits.length > 0) {
	                            for (var j = 0; j < aEdits.length; j++) {
	                                var a = OT.OTCompositeResource.constructFromObject(aEdits[j]);
	                                this.clientEngine.addRemote(a);
	                            }
	                            // OK, now let any registered observers know about the new updates
	                            this.parent.notifyData();
	                            // Received edits - speed up pace of requests
	                            this.parent.speed.speedUp();
	                        }
	                        else {
	                            // Slow down requests since I got no edits from service
	                            this.parent.speed.slowDown();
	                        }
	                    }
	                }
	                break;
	        }
	    };
	    ClientSessionState.prototype.cancel = function (req) {
	        if (req === undefined)
	            for (var i = 0; i < NRequestTypes; i++)
	                this.baPending[i] = false;
	        else
	            this.baPending[req] = false;
	    };
	    ClientSessionState.prototype.fail = function (req) {
	        this.baPending[req] = false;
	        this.parent.setConnected(false);
	        this.setReachable(false);
	        this.setFull(false);
	    };
	    ClientSessionState.prototype.complete = function (req) {
	        this.baPending[req] = false;
	    };
	    ClientSessionState.prototype.tick = function () {
	        // If we don't have a user, fetch it
	        if (this.parent.user.name === undefined && !this.baPending[ReqUser])
	            this.start(ReqUser);
	        // If was full, keep trying to join, but not too aggressively
	        if (this.bFull) {
	            this.parent.speed.slowDown();
	            this.start(ReqJoin);
	        }
	        else if (this.clientEngine) {
	            // If type not set, set it now
	            if (this.pendingType != '') {
	                this.setType(this.pendingType);
	                this.pendingType = '';
	            }
	            this.start(ReqEdit);
	        }
	        else if (this.sessionID != '' && !this.baPending[ReqJoin])
	            this.start(ReqJoin);
	        else if (this.sessionID == '' && this.pendingType != '' && !this.baPending[ReqCreate])
	            this.start(ReqCreate);
	    };
	    return ClientSessionState;
	}());
	exports.ClientSessionState = ClientSessionState;
	var ClientSession = (function () {
	    function ClientSession(ctx) {
	        this.context = ctx;
	        this.session = new ClientSessionState(this);
	        this.sessions = {};
	        this.clientID = '';
	        this.bConnected = true; // Fact that page was loaded means we were initially connected
	        this.user = {};
	        this.speed = new SpeedManager();
	        this.onStateList = [];
	        this.onDataList = {};
	        this.onJoinList = {};
	        this.onStatusList = [];
	    }
	    Object.defineProperty(ClientSession.prototype, "bInSession", {
	        get: function () {
	            return this.session.bInSession;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientSession.prototype, "bPendingConnection", {
	        get: function () {
	            return this.session.bPendingConnection;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientSession.prototype, "userID", {
	        get: function () {
	            if (this.user.ns && this.user.id)
	                return this.user.ns + '/' + this.user.id;
	            return '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ClientSession.prototype.onData = function (resourceName, cb) {
	        var aCB = this.onDataList[resourceName];
	        if (aCB === undefined) {
	            aCB = [];
	            this.onDataList[resourceName] = aCB;
	        }
	        aCB.push(cb);
	    };
	    ClientSession.prototype.onJoin = function (resourceName, cb) {
	        var aCB = this.onJoinList[resourceName];
	        if (aCB === undefined) {
	            aCB = [];
	            this.onJoinList[resourceName] = aCB;
	        }
	        aCB.push(cb);
	    };
	    ClientSession.prototype.onState = function (cb) {
	        this.onStateList.push(cb);
	    };
	    ClientSession.prototype.onStatusChange = function (cb) {
	        this.onStatusList.push(cb);
	    };
	    ClientSession.prototype.notifyStatusChange = function () {
	        for (var i = 0; i < this.onStatusList.length; i++)
	            (this.onStatusList[i])(this);
	    };
	    ClientSession.prototype.notifyState = function () {
	        for (var i = 0; i < this.onStateList.length; i++)
	            (this.onStateList[i])(this, this.session.state);
	    };
	    ClientSession.prototype.notifyJoin = function () {
	        // OK, let any registered observers know about the session change
	        for (var p in this.onJoinList)
	            if (this.onJoinList.hasOwnProperty(p)) {
	                var aCB = this.onJoinList[p];
	                for (var i = 0; i < aCB.length; i++)
	                    (aCB[i])(this);
	            }
	    };
	    ClientSession.prototype.notifyData = function () {
	        // OK, now let any registered observers know about the new updates
	        if (this.session.clientEngine) {
	            var objVal = this.session.clientEngine.toValue();
	            // Cache state in the session. Set before other notifications.
	            this.session.state = objVal;
	            this.notifyState();
	            // Cache meta information in the session. Set before other notifications.
	            if (objVal[exports.MetaResource] !== undefined)
	                this.session.meta = objVal[exports.MetaResource];
	            for (var p in objVal) {
	                if (objVal.hasOwnProperty(p) && this.onDataList[p] != undefined) {
	                    var aCB = this.onDataList[p];
	                    for (var i = 0; i < aCB.length; i++)
	                        (aCB[i])(this, objVal[p]);
	                }
	            }
	        }
	        else {
	            for (var p in this.onDataList)
	                if (this.onDataList.hasOwnProperty(p)) {
	                    var aCB = this.onDataList[p];
	                    for (var i = 0; i < aCB.length; i++)
	                        (aCB[i])(this, undefined);
	                }
	        }
	    };
	    ClientSession.prototype.setConnected = function (b) {
	        if (b != this.bConnected) {
	            this.bConnected = b;
	            this.notifyStatusChange();
	        }
	    };
	    ClientSession.prototype.tick = function () {
	        this.session.tick();
	    };
	    ClientSession.prototype.setSession = function (sessionID) {
	        if (sessionID == '')
	            this.session = new ClientSessionState(this);
	        else {
	            this.session = this.sessions[sessionID];
	            if (this.session === undefined) {
	                this.session = new ClientSessionState(this);
	                this.session.sessionID = sessionID;
	                this.sessions[sessionID] = this.session;
	            }
	        }
	        this.notifyJoin();
	        this.notifyData();
	        this.tick();
	    };
	    ClientSession.prototype.reset = function (pendingType) {
	        this.session.cancel();
	        this.session = new ClientSessionState(this);
	        this.session.pendingType = pendingType;
	        if (pendingType == '')
	            this.user = {}; // forces refresh with fresh data
	        this.notifyJoin();
	        this.notifyData();
	        this.notifyStatusChange();
	        this.tick();
	    };
	    return ClientSession;
	}());
	exports.ClientSession = ClientSession;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Home = 0;
	exports.NewScratch = 1;
	exports.NewChess = 2;
	exports.NewPlan = 3;
	exports.NewAgree = 4;
	exports.ToggleChat = 5;
	exports.JoinSession = 6;
	exports.Query = 7; // arg is { query: "", yes: "", no: "", callback: func }
	exports.Menu = 8; // arg is { absx: x, absy: y, choices: [ "1", "2" ], callback: func }
	exports.DoneEdits = 9;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Agree = (function () {
	    function Agree() {
	        this.meta = { name: '', dtype: '' };
	        this.users = {};
	        this.choices = [];
	        this.selects = {};
	    }
	    Agree.prototype.getUserList = function () {
	        var ret = [];
	        for (var p in this.users)
	            if (this.users.hasOwnProperty(p)) {
	                var o = { id: p, name: this.users[p] };
	                ret.push(o);
	            }
	        return ret;
	    };
	    Agree.prototype.nextSelection = function (selProp) {
	        var sThis = this.selects[selProp];
	        if (sThis === undefined)
	            return 1;
	        switch (sThis) {
	            case -1: return 1;
	            case 0: return 2;
	            case 1: return 0;
	            case 2: return 1;
	            case 3:
	            default: return -1;
	        }
	    };
	    return Agree;
	}());
	exports.Agree = Agree;


/***/ },
/* 12 */
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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OT = __webpack_require__(6);
	var ChatControl = (function () {
	    function ChatControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.chatArray = [];
	        this.userMap = {};
	        this.bChatOn = false;
	        this.nChatSeen = 0;
	        this.notifyChatChange = this.notifyChatChange.bind(this);
	        this.notifyUserChange = this.notifyUserChange.bind(this);
	        this.notifyLocalChange = this.notifyLocalChange.bind(this);
	        cs.onData('chat', this.notifyChatChange);
	        cs.onData('WellKnownName_users', this.notifyUserChange);
	    }
	    Object.defineProperty(ChatControl.prototype, "chatDisabled", {
	        get: function () {
	            return !this.clientSession.bInSession;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ChatControl.prototype.navText = function () {
	        if (this.chatDisabled)
	            return "Chat Unavailable";
	        else {
	            var chatString = this.bChatOn ? "Hide Chat" : "Chat";
	            var nChatUnseen = this.bChatOn ? 0 : this.chatArray.length - this.nChatSeen;
	            if (nChatUnseen > 0)
	                chatString += "(" + String(nChatUnseen) + ")";
	            return chatString;
	        }
	    };
	    ChatControl.prototype.reset = function () {
	        this.chatArray = [];
	        this.userMap = {};
	        this.bChatOn = false;
	        this.nChatSeen = 0;
	        this.reRender();
	    };
	    ChatControl.prototype.toggle = function () {
	        if (!this.chatDisabled) {
	            this.bChatOn = !this.bChatOn;
	            this.nChatSeen = this.chatArray.length; // Either way (before or after) everything current is seen
	            this.reRender();
	        }
	    };
	    ChatControl.prototype.notifyChatChange = function (cs, chatArray) {
	        if (chatArray === undefined)
	            this.reset();
	        else {
	            this.chatArray = chatArray;
	            if (this.bChatOn)
	                this.nChatSeen = this.chatArray.length;
	        }
	        this.reRender();
	    };
	    ChatControl.prototype.notifyUserChange = function (cs, userMap) {
	        if (userMap === undefined)
	            this.reset();
	        else
	            this.userMap = userMap;
	        this.reRender();
	    };
	    ChatControl.prototype.doneEdits = function (ok) {
	    };
	    ChatControl.prototype.notifyLocalChange = function (s) {
	        var css = this.clientSession.session;
	        if (css.bInSession) {
	            var editRoot = css.startLocalEdit();
	            var editChat = new OT.OTArrayResource('chat');
	            editChat.edits.push([OT.OpRetain, this.chatArray.length, [[]]]);
	            editChat.edits.push([OT.OpInsert, 1, [[this.clientSession.clientID, s]]]);
	            editRoot.edits.push(editChat);
	            css.addLocal(editRoot);
	            this.reRender();
	        }
	    };
	    return ChatControl;
	}());
	exports.ChatControl = ChatControl;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var CS = __webpack_require__(9);
	var ClientActions = __webpack_require__(10);
	var NameControl = (function () {
	    function NameControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.name = '';
	        this.notifyData = this.notifyData.bind(this);
	        cs.onData(CS.MetaResource, this.notifyData);
	        this.notifyLocalChange = this.notifyLocalChange.bind(this);
	        this.updateName = this.updateName.bind(this);
	        this.doneName = this.doneName.bind(this);
	        var s = (this.name == '') ? 'Name' : this.name;
	        this.propsName = { bImg: true, bFocus: true, bActive: false, val: s, valEdit: '', update: this.updateName, done: this.doneName };
	    }
	    NameControl.prototype.reset = function () {
	        this.name = '';
	        this.reRender();
	    };
	    NameControl.prototype.notifyData = function (cs, meta) {
	        if (meta === undefined)
	            this.reset();
	        else {
	            this.name = cs.session.getName();
	            if (this.name === undefined)
	                this.name = '';
	            this.propsName.val = this.name == '' ? 'Name' : this.name;
	        }
	        this.reRender();
	    };
	    NameControl.prototype.notifyLocalChange = function (s) {
	        var css = this.clientSession.session;
	        if (css.bInSession) {
	            css.setName(s);
	            this.reRender();
	        }
	    };
	    NameControl.prototype.editName = function () {
	        this.actions.fire(ClientActions.DoneEdits, true);
	        this.propsName.bActive = true;
	        this.propsName.valEdit = this.name;
	        this.reRender();
	    };
	    NameControl.prototype.doneEdits = function (ok) {
	        this.doneName(ok);
	    };
	    NameControl.prototype.doneName = function (ok) {
	        if (this.propsName.bActive && ok && this.propsName.valEdit != '')
	            this.notifyLocalChange(this.propsName.valEdit);
	        this.propsName.bActive = false;
	        this.reRender();
	    };
	    NameControl.prototype.updateName = function (valEdit) {
	        this.propsName.valEdit = valEdit;
	        this.reRender();
	    };
	    return NameControl;
	}());
	exports.NameControl = NameControl;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Query = __webpack_require__(16);
	var QueryControl = (function () {
	    function QueryControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.props = Query.NullQuery;
	    }
	    ; // query, yes, no, callback
	    QueryControl.prototype.query = function (props) {
	        this.props = props;
	        this.reRender();
	    };
	    QueryControl.prototype.doneEdits = function (ok) {
	        this.props = Query.NullQuery;
	        this.reRender();
	    };
	    QueryControl.prototype.fire = function (result) {
	        if (this.props.callback)
	            this.props.callback(result);
	        this.props = Query.NullQuery;
	        this.reRender();
	    };
	    return QueryControl;
	}());
	exports.QueryControl = QueryControl;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NullQuery = { query: null, yes: null, no: null, callback: null };


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Menu = __webpack_require__(18);
	var MenuControl = (function () {
	    function MenuControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.props = Menu.NullMenu;
	    }
	    ; // absx, absy, choices, callback
	    MenuControl.prototype.menu = function (props) {
	        this.props = props;
	        this.reRender();
	    };
	    MenuControl.prototype.doneEdits = function (ok) {
	        this.props = Menu.NullMenu;
	        this.reRender();
	    };
	    MenuControl.prototype.fire = function (result) {
	        if (this.props.callback)
	            this.props.callback(result);
	        this.props = Menu.NullMenu;
	        this.reRender();
	    };
	    return MenuControl;
	}());
	exports.MenuControl = MenuControl;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NullMenu = { absx: null, absy: null, choices: null, callback: null };
	function createEmpty() {
	    return { absx: null, absy: null, choices: null, callback: null };
	}
	exports.createEmpty = createEmpty;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OT = __webpack_require__(6);
	var Chess = __webpack_require__(20);
	var ChessControl = (function () {
	    function ChessControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.chess = new Chess.Chess();
	        this.moves = [];
	        this.notifyBoardChange = this.notifyBoardChange.bind(this);
	        cs.onData('chess', this.notifyBoardChange);
	    }
	    ChessControl.prototype.navText = function () {
	        var color = this.chess.whoseMove();
	        var colorString = color == Chess.Black ? "Black Moves" : "White Moves";
	        var checkString = this.chess.isMate() ? " / Mate" : (this.chess.isCheck(color) ? " / Check" : "");
	        return colorString + checkString;
	    };
	    ChessControl.prototype.reset = function () {
	        this.chess = new Chess.Chess();
	        this.moves = [];
	    };
	    ChessControl.prototype.doneEdits = function (ok) {
	    };
	    ChessControl.prototype.notifyBoardChange = function (cs, moves) {
	        if (moves === undefined)
	            this.reset();
	        else {
	            this.moves = moves;
	            this.syncMoves();
	        }
	    };
	    ChessControl.prototype.syncMoves = function () {
	        // This simple sync algorithm presumes that there is actually turn-taking going on.
	        var nLocalMoves = this.chess.Moves.length;
	        var nRemoteMoves = this.moves.length / 2;
	        // If shared array is larger, make those moves in my local chess state
	        if (nRemoteMoves > nLocalMoves) {
	            for (var i = nLocalMoves * 2; i < this.moves.length; i += 2)
	                this.chess.move(this.moves[i], this.moves[i + 1]);
	            this.chess.setSelected(-1);
	        }
	        else if (nLocalMoves > nRemoteMoves) {
	            var css = this.clientSession.session;
	            if (css.clientEngine) {
	                var editRoot = css.startLocalEdit();
	                var editMoves = new OT.OTArrayResource('chess');
	                editMoves.edits.push([OT.OpRetain, this.moves.length, []]);
	                for (var i = nRemoteMoves; i < this.chess.Moves.length; i++) {
	                    var m = this.chess.Moves[i];
	                    editMoves.edits.push([OT.OpInsert, 2, [m[0], m[2]]]);
	                }
	                editRoot.edits.push(editMoves);
	                css.addLocal(editRoot);
	                css.tick();
	            }
	        }
	        this.reRender();
	    };
	    ChessControl.prototype.clickSquare = function (id) {
	        // If no square is selected
	        //	AND there is a piece at the clicked location
	        //	AND it is the color who gets to move
	        //	THEN set it as the selected square
	        // If a square is selected
	        //	AND the clicked square is one of the legal target squares
	        //	THEN move the selected piece to the clicked square
	        // Else If a square is selected
	        //	AND there is a piece at the clicked location
	        //	AND it is the color who gets to move
	        //	THEN set it as the selected square
	        if (this.chess.isTargeted(id)) {
	            this.chess.move(this.chess.selected, id);
	            this.chess.setSelected(-1);
	            this.syncMoves();
	        }
	        else
	            this.chess.setSelected(id);
	        this.reRender();
	    };
	    return ChessControl;
	}());
	exports.ChessControl = ChessControl;


/***/ },
/* 20 */
/***/ function(module, exports) {

	// TODO:
	//	En Passant
	//	Castling
	//	No Castling under jeopardy
	//	Stalemate due to endless repetition
	//	Pawn reaching final row
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Empty = 0;
	exports.Pawn = 1;
	exports.Knight = 2;
	exports.Bishop = 4;
	exports.Rook = 8;
	exports.Queen = 16;
	exports.King = 32;
	exports.Black = 64;
	exports.White = 128;
	var InitialBoard = [
	    exports.White | exports.Rook, exports.White | exports.Knight, exports.White | exports.Bishop, exports.White | exports.King, exports.White | exports.Queen, exports.White | exports.Bishop, exports.White | exports.Knight, exports.White | exports.Rook,
	    exports.White | exports.Pawn, exports.White | exports.Pawn, exports.White | exports.Pawn, exports.White | exports.Pawn, exports.White | exports.Pawn, exports.White | exports.Pawn, exports.White | exports.Pawn, exports.White | exports.Pawn,
	    exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty,
	    exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty,
	    exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty,
	    exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty, exports.Empty,
	    exports.Black | exports.Pawn, exports.Black | exports.Pawn, exports.Black | exports.Pawn, exports.Black | exports.Pawn, exports.Black | exports.Pawn, exports.Black | exports.Pawn, exports.Black | exports.Pawn, exports.Black | exports.Pawn,
	    exports.Black | exports.Rook, exports.Black | exports.Knight, exports.Black | exports.Bishop, exports.Black | exports.King, exports.Black | exports.Queen, exports.Black | exports.Bishop, exports.Black | exports.Knight, exports.Black | exports.Rook
	];
	function indexRC(r, c) { return r * 8 + c; }
	function invertColor(c) { return c == exports.White ? exports.Black : exports.White; }
	var Chess = (function () {
	    function Chess() {
	        this.Squares = new Array(64);
	        for (var i = 0; i < 64; i++)
	            this.Squares[i] = InitialBoard[i];
	        this.Moves = [];
	        this.Castled = 0; // Or in Black or White
	        this.Selected = -1;
	        this.Targets = [];
	    }
	    Object.defineProperty(Chess.prototype, "selected", {
	        get: function () {
	            return this.Selected;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Chess.prototype, "targets", {
	        get: function () {
	            return this.Targets;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Chess.prototype.isTargeted = function (n) {
	        for (var i = 0; i < this.Targets.length; i++)
	            if (this.Targets[i] == n)
	                return true;
	        return false;
	    };
	    Chess.prototype.setSelected = function (n) {
	        if (this.colorAt(n) == this.whoseMove())
	            this.Selected = n;
	        else
	            this.Selected = -1;
	        if (this.Selected == -1)
	            this.Targets = [];
	        else
	            this.Targets = this.getLegalMoves(this.Selected);
	    };
	    Chess.prototype.colorAt = function (n) {
	        return (n >= 0 && n < 64) ? (this.Squares[n] & (exports.Black | exports.White)) : 0;
	    };
	    Chess.prototype.pieceAt = function (n) {
	        return (n >= 0 && n < 64) ? (this.Squares[n] & (~(exports.Black | exports.White))) : exports.Empty;
	    };
	    Chess.prototype.rowAt = function (n) {
	        return Math.floor(n / 8);
	    };
	    Chess.prototype.colAt = function (n) {
	        return n % 8;
	    };
	    Chess.prototype.findPiece = function (piece) {
	        for (var i = 0; i < 64; i++)
	            if (this.Squares[i] == piece)
	                return i;
	        return -1;
	    };
	    Chess.prototype.isPathEmpty = function (start, end) {
	        var sRow = Math.floor(start / 8);
	        var sCol = start % 8;
	        var eRow = Math.floor(end / 8);
	        var eCol = end % 8;
	        var rIncr = sRow == eRow ? 0 : (sRow > eRow ? -1 : 1);
	        var cIncr = sCol == eCol ? 0 : (sCol > eCol ? -1 : 1);
	        for (sRow += rIncr, sCol += cIncr; sRow != eRow; sRow += rIncr, sCol += cIncr)
	            if (this.Squares[indexRC(sRow, sCol)] != exports.Empty)
	                return false;
	        return true;
	    };
	    Chess.prototype.getLegalSingle = function (eRow, eCol, sColor, moves) {
	        if (eRow < 0 || eRow > 7 || eCol < 0 || eCol > 7)
	            return true;
	        var end = indexRC(eRow, eCol);
	        var endPiece = this.Squares[end];
	        if (endPiece == exports.Empty) {
	            moves.push(end);
	            return false;
	        }
	        else {
	            if ((endPiece & sColor) == 0)
	                moves.push(end);
	            return true;
	        }
	    };
	    Chess.prototype.getLegalSequence = function (sRow, sCol, incrRow, incrCol, sColor, moves) {
	        var eRow = sRow + incrRow;
	        var eCol = sCol + incrCol;
	        for (; eRow >= 0 && eRow < 8 && eCol >= 0 && eCol < 8; eRow += incrRow, eCol += incrCol)
	            if (this.getLegalSingle(eRow, eCol, sColor, moves))
	                break;
	    };
	    Chess.prototype.getLegalMovesUnfiltered = function (start, moves) {
	        if (moves === void 0) { moves = []; }
	        var piece = this.Squares[start];
	        var color = piece & (exports.Black | exports.White);
	        var iColor = invertColor(color);
	        piece -= color;
	        var sRow = Math.floor(start / 8);
	        var sCol = start % 8;
	        var incr;
	        var bAtInit;
	        switch (piece) {
	            case exports.Empty:
	                break;
	            case exports.Pawn:
	                {
	                    incr = color == exports.White ? 1 : -1;
	                    bAtInit = color == exports.White ? sRow == 1 : sRow == 6;
	                    var colorMove1 = this.colorAt(indexRC(sRow + incr, sCol));
	                    var colorMove2 = this.colorAt(indexRC(sRow + (2 * incr), sCol));
	                    var colorAttack1 = this.colorAt(indexRC(sRow + incr, sCol + 1));
	                    var colorAttack2 = this.colorAt(indexRC(sRow + incr, sCol - 1));
	                    if (colorMove1 == exports.Empty)
	                        moves.push(indexRC(sRow + incr, sCol));
	                    if (bAtInit && colorMove1 == exports.Empty && colorMove2 == exports.Empty)
	                        moves.push(indexRC(sRow + (2 * incr), sCol));
	                    if (colorAttack1 == iColor)
	                        moves.push(indexRC(sRow + incr, sCol + 1));
	                    if (colorAttack2 == iColor)
	                        moves.push(indexRC(sRow + incr, sCol - 1));
	                    // TODO: En Passant
	                }
	                break;
	            case exports.Knight:
	                this.getLegalSingle(sRow + 2, sCol + 1, color, moves);
	                this.getLegalSingle(sRow - 2, sCol + 1, color, moves);
	                this.getLegalSingle(sRow + 2, sCol - 1, color, moves);
	                this.getLegalSingle(sRow - 2, sCol - 1, color, moves);
	                this.getLegalSingle(sRow + 1, sCol + 2, color, moves);
	                this.getLegalSingle(sRow - 1, sCol + 2, color, moves);
	                this.getLegalSingle(sRow + 1, sCol - 2, color, moves);
	                this.getLegalSingle(sRow - 1, sCol - 2, color, moves);
	                break;
	            case exports.Bishop:
	                this.getLegalSequence(sRow, sCol, 1, 1, color, moves);
	                this.getLegalSequence(sRow, sCol, -1, -1, color, moves);
	                this.getLegalSequence(sRow, sCol, -1, 1, color, moves);
	                this.getLegalSequence(sRow, sCol, 1, -1, color, moves);
	                break;
	            case exports.Rook:
	                this.getLegalSequence(sRow, sCol, 1, 0, color, moves);
	                this.getLegalSequence(sRow, sCol, 0, 1, color, moves);
	                this.getLegalSequence(sRow, sCol, -1, 0, color, moves);
	                this.getLegalSequence(sRow, sCol, 0, -1, color, moves);
	                break;
	            case exports.Queen:
	                this.getLegalSequence(sRow, sCol, 1, 1, color, moves);
	                this.getLegalSequence(sRow, sCol, -1, -1, color, moves);
	                this.getLegalSequence(sRow, sCol, -1, 1, color, moves);
	                this.getLegalSequence(sRow, sCol, 1, -1, color, moves);
	                this.getLegalSequence(sRow, sCol, 1, 0, color, moves);
	                this.getLegalSequence(sRow, sCol, 0, 1, color, moves);
	                this.getLegalSequence(sRow, sCol, -1, 0, color, moves);
	                this.getLegalSequence(sRow, sCol, 0, -1, color, moves);
	                break;
	            case exports.King:
	                this.getLegalSingle(sRow + 1, sCol + 1, color, moves);
	                this.getLegalSingle(sRow + 1, sCol + 0, color, moves);
	                this.getLegalSingle(sRow + 1, sCol - 1, color, moves);
	                this.getLegalSingle(sRow + 0, sCol + 1, color, moves);
	                this.getLegalSingle(sRow + 0, sCol - 1, color, moves);
	                this.getLegalSingle(sRow - 1, sCol + 1, color, moves);
	                this.getLegalSingle(sRow - 1, sCol + 0, color, moves);
	                this.getLegalSingle(sRow - 1, sCol - 1, color, moves);
	                break;
	        }
	        return moves;
	    };
	    Chess.prototype.getLegalMoves = function (start, moves) {
	        if (moves === void 0) { moves = []; }
	        var color = this.colorAt(start);
	        var potentialMoves = [];
	        this.getLegalMovesUnfiltered(start, potentialMoves);
	        // Now filter out moves that leave me in check
	        for (var i = 0; i < potentialMoves.length; i++) {
	            this.move(start, potentialMoves[i]);
	            if (!this.isCheck(color))
	                moves.push(potentialMoves[i]);
	            this.undo();
	        }
	        return moves;
	    };
	    Chess.prototype.isMoveLegal = function (start, end) {
	        // Need to be on board
	        if (start < 0 || start >= 64)
	            return false;
	        // Need to stay on board
	        if (end < 0 || end >= 64)
	            return false;
	        // Need to actually move
	        if (start == end)
	            return false;
	        // Needs to be a piece at starting square
	        if (this.Squares[start] == exports.Empty)
	            return false;
	        var moves = this.getLegalMoves(start);
	        for (var i = 0; i < moves.length; i++)
	            if (moves[i] == end)
	                return true;
	        return false;
	    };
	    Chess.prototype.move = function (start, end) {
	        var m = [start, this.Squares[start], end, this.Squares[end]];
	        this.Squares[end] = this.Squares[start];
	        // Really should be user choice...
	        if (this.pieceAt(end) == exports.Pawn && (this.rowAt(end) == 0 || this.rowAt(end) == 7))
	            this.Squares[end] = this.colorAt(end) | exports.Queen;
	        this.Squares[start] = exports.Empty;
	        this.Moves.push(m);
	    };
	    Chess.prototype.undo = function () {
	        var m = this.Moves[this.Moves.length - 1];
	        this.Moves.splice(this.Moves.length - 1);
	        this.Squares[m[0]] = m[1];
	        this.Squares[m[2]] = m[3];
	    };
	    Chess.prototype.castle = function (color, kingside) {
	    };
	    Chess.prototype.isCheck = function (color) {
	        var iColor = invertColor(color);
	        var n = this.findPiece(color | exports.King);
	        for (var i = 0; i < 64; i++)
	            if (this.colorAt(i) == iColor) {
	                var moves = this.getLegalMovesUnfiltered(i);
	                for (var j = 0; j < moves.length; j++)
	                    if (moves[j] == n)
	                        return true;
	            }
	        return false;
	    };
	    Chess.prototype.isMate = function () {
	        var colorMove = this.whoseMove();
	        var color = 0;
	        if (this.isCheck(colorMove)) {
	            var n = this.findPiece(colorMove | exports.King);
	            var moves = this.getLegalMoves(n);
	            if (moves.length == 0)
	                color |= colorMove;
	        }
	        return color;
	    };
	    Chess.prototype.isStalemate = function () {
	        var color = this.whoseMove();
	        var moves = [];
	        for (var i = 0; i < 64 && moves.length == 0; i++)
	            if (this.Squares[i] | color)
	                this.getLegalMoves(i, moves);
	        return moves.length == 0;
	    };
	    Chess.prototype.whoseMove = function () {
	        return ((this.Moves.length % 2) == 0) ? exports.White : exports.Black;
	    };
	    return Chess;
	}());
	exports.Chess = Chess;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var OT = __webpack_require__(6);
	var Plan = __webpack_require__(22);
	var Util = __webpack_require__(12);
	var ClientActions = __webpack_require__(10);
	var PlanControl = (function () {
	    function PlanControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.plan = new Plan.Plan();
	        this.notifyPlanChange = this.notifyPlanChange.bind(this);
	        cs.onState(this.notifyPlanChange);
	        this.itemEdit = null;
	        this.updateBucket = this.updateBucket.bind(this);
	        this.doneBucket = this.doneBucket.bind(this);
	        this.updateItem = this.updateItem.bind(this);
	        this.doneItem = this.doneItem.bind(this);
	        this.updateItemName = this.updateItemName.bind(this);
	        this.updateStartDate = this.updateStartDate.bind(this);
	        this.updateDueDate = this.updateDueDate.bind(this);
	        this.updateDescription = this.updateDescription.bind(this);
	        this.updateComment = this.updateComment.bind(this);
	        this.updateCheckList = this.updateCheckList.bind(this);
	        this.addCheckList = this.addCheckList.bind(this);
	        this.deleteBucket = this.deleteBucket.bind(this);
	        this.propsBucketNew = { bImg: true, bFocus: true, bActive: false, val: '+ New Bucket', valEdit: '', update: this.updateBucket, done: this.doneBucket };
	        this.propsItemNew = { bImg: true, bFocus: true, bActive: false, val: '', valEdit: '', update: this.updateItem, done: this.doneItem };
	        this.propsItemName = { bImg: false, bFocus: false, bActive: false, val: '', valEdit: '', update: this.updateItemName, done: null };
	        this.propsStartDate = { bImg: false, bFocus: false, bActive: true, val: 'Start anytime', valEdit: '', update: this.updateStartDate, done: null };
	        this.propsDueDate = { bImg: false, bFocus: false, bActive: true, val: 'Due anytime', valEdit: '', update: this.updateDueDate, done: null };
	        this.propsDescription = { bImg: false, bFocus: false, bActive: false, val: '', valEdit: '', update: this.updateDescription, done: null };
	        this.propsComment = { bImg: false, bFocus: false, bActive: false, val: '', valEdit: '', update: this.updateComment, done: null };
	        this.propsCheckList = { bImg: false, bFocus: true, bActive: false, val: 'add an item', valEdit: '', update: this.updateCheckList, done: this.addCheckList };
	        this.propUIDBucket = '';
	    }
	    PlanControl.prototype.reset = function () {
	        this.plan = new Plan.Plan();
	        this.itemEdit = null;
	        this.reRender();
	    };
	    PlanControl.prototype.notifyPlanChange = function (cs, planData) {
	        if (planData === undefined)
	            this.reset();
	        else {
	            this.plan.value = planData;
	            if (this.itemEdit)
	                this.itemEdit = this.plan.getItemByUID(this.itemEdit.uid);
	            this.reRender();
	        }
	    };
	    PlanControl.prototype.addBucket = function (bucketName) {
	        var css = this.clientSession.session;
	        if (css.clientEngine) {
	            var editRoot = css.startLocalEdit();
	            var editBuckets = new OT.OTMapResource(Plan.BucketsName);
	            var uid = Util.createGuid();
	            editBuckets.edits.push([OT.OpMapSet, uid, bucketName]);
	            editRoot.edits.push(editBuckets);
	            css.addLocal(editRoot);
	            css.tick();
	        }
	    };
	    PlanControl.prototype.deleteBucket = function (uid) {
	        var css = this.clientSession.session;
	        if (css.clientEngine) {
	            var editRoot = css.startLocalEdit();
	            // Delete the bucket
	            var editBuckets = new OT.OTMapResource(Plan.BucketsName);
	            editBuckets.edits.push([OT.OpMapDel, uid, '']);
	            editRoot.edits.push(editBuckets);
	            // Delete the items bound to the bucket
	            var editItems = new OT.OTMapResource(Plan.ItemsName);
	            var aItems = this.plan.getItemsOfBucket(uid);
	            for (var i = 0; i < aItems.length; i++)
	                editItems.edits.push([OT.OpMapDel, aItems[i].uid, '']);
	            editRoot.edits.push(editItems);
	            // TODO: How to delete the higher level OT resources associated with the items?
	            css.addLocal(editRoot);
	            css.tick();
	        }
	    };
	    PlanControl.prototype.editItem = function (item) {
	        var css = this.clientSession.session;
	        if (css.clientEngine) {
	            var editRoot = css.startLocalEdit();
	            if (item.uid == '') {
	                var editItems = new OT.OTMapResource(Plan.ItemsName);
	                item.uid = Util.createGuid();
	                editItems.edits.push([OT.OpMapSet, item.uid, '']);
	                editRoot.edits.push(editItems);
	            }
	            var editItem = new OT.OTMapResource(item.uid);
	            // TODO: Ideally only explicitly set properties that have been locally edited to prevent overwriting
	            // other simultaneous edits.
	            for (var p in item)
	                if (item.hasOwnProperty(p))
	                    editItem.edits.push([OT.OpMapSet, p, item[p]]);
	            editRoot.edits.push(editItem);
	            css.addLocal(editRoot);
	            css.tick();
	        }
	    };
	    PlanControl.prototype.editItemProperty = function (item, sProp) {
	        var css = this.clientSession.session;
	        if (css.clientEngine) {
	            var editRoot = css.startLocalEdit();
	            var editItem = new OT.OTMapResource(item.uid);
	            editItem.edits.push([OT.OpMapSet, sProp, item[sProp]]);
	            editRoot.edits.push(editItem);
	            css.addLocal(editRoot);
	            css.tick();
	            this.reRender();
	        }
	    };
	    PlanControl.prototype.doneEdits = function (ok) {
	        this.itemEdit = null;
	        this.doneBucket(ok);
	        this.doneItem(ok);
	        this.propsItemNew.bActive = false;
	        this.propsBucketNew.bActive = false;
	        this.reRender();
	    };
	    PlanControl.prototype.startEditItem = function (uidItem) {
	        this.doneEdits(true);
	        this.itemEdit = this.plan.getItemByUID(uidItem);
	        if (this.itemEdit) {
	            this.propsItemName.bActive = true;
	            this.propsItemName.val = this.itemEdit.name;
	            this.propsItemName.valEdit = this.itemEdit.name;
	            this.propsComment.valEdit = '';
	            this.propsDescription.valEdit = this.itemEdit.description;
	            this.propsStartDate.valEdit = this.itemEdit.startdate;
	            this.propsDueDate.valEdit = this.itemEdit.duedate;
	            this.propsCheckList.valEdit = '';
	        }
	        this.reRender();
	    };
	    PlanControl.prototype.endEditItem = function () {
	        this.doneEdits(true);
	    };
	    PlanControl.prototype.editNewBucket = function () {
	        this.actions.fire(ClientActions.DoneEdits, true);
	        this.propsBucketNew.bActive = true;
	    };
	    PlanControl.prototype.editNewItem = function (uidBucket) {
	        this.actions.fire(ClientActions.DoneEdits, true);
	        this.propsItemNew.bActive = true;
	        this.propUIDBucket = uidBucket;
	    };
	    PlanControl.prototype.updateBucket = function (valEdit) {
	        this.propsBucketNew.valEdit = valEdit;
	        this.reRender();
	    };
	    PlanControl.prototype.updateItem = function (valEdit) {
	        this.propsItemNew.valEdit = valEdit;
	        this.reRender();
	    };
	    PlanControl.prototype.updateItemName = function (valEdit) {
	        this.propsItemName.valEdit = valEdit;
	        this.itemEdit.name = valEdit;
	        this.editItemProperty(this.itemEdit, 'name');
	    };
	    PlanControl.prototype.updateStartDate = function (valEdit) {
	        this.propsStartDate.valEdit = valEdit;
	        this.itemEdit.startdate = valEdit;
	        this.editItemProperty(this.itemEdit, 'startdate');
	    };
	    PlanControl.prototype.updateDueDate = function (valEdit) {
	        this.propsDueDate.valEdit = valEdit;
	        this.itemEdit.duedate = valEdit;
	        this.editItemProperty(this.itemEdit, 'duedate');
	    };
	    PlanControl.prototype.updateDescription = function (valEdit) {
	        this.propsDescription.valEdit = valEdit;
	        this.itemEdit.description = valEdit;
	        this.editItemProperty(this.itemEdit, 'description');
	    };
	    PlanControl.prototype.updateItemBucket = function (value) {
	        this.itemEdit.bucket = value;
	        this.editItemProperty(this.itemEdit, 'bucket');
	    };
	    PlanControl.prototype.updateItemProgress = function (value) {
	        this.itemEdit.progress = Number(value);
	        this.editItemProperty(this.itemEdit, 'progress');
	    };
	    PlanControl.prototype.updateComment = function (valEdit) {
	        this.propsComment.valEdit = valEdit;
	        this.reRender();
	        // Only takes effect on Post
	    };
	    PlanControl.prototype.postComment = function () {
	        var cs = this.clientSession;
	        var css = cs.session;
	        if (this.itemEdit && css.clientEngine && this.propsComment.valEdit != '') {
	            var editRoot = css.startLocalEdit();
	            var comments = this.plan.value[this.itemEdit.comments];
	            var editItem = new OT.OTArrayResource(this.itemEdit.comments);
	            if (comments && comments.length > 0)
	                editItem.edits.push([OT.OpRetain, comments.length, []]);
	            var me = cs.userID;
	            var d = Date();
	            editItem.edits.push([OT.OpInsert, 1, [[me, this.propsComment.valEdit, d.toString()]]]);
	            this.propsComment.valEdit = '';
	            editRoot.edits.push(editItem);
	            css.addLocal(editRoot);
	            css.tick();
	            this.reRender();
	        }
	    };
	    PlanControl.prototype.updateCheckList = function (valEdit) {
	        this.propsCheckList.valEdit = valEdit;
	        this.reRender();
	        // Only takes effect on addCheckList
	    };
	    PlanControl.prototype.addCheckList = function (ok) {
	        var css = this.clientSession.session;
	        if (!ok) {
	            this.propsCheckList.valEdit = '';
	            this.propsCheckList.bActive = false;
	            this.reRender();
	        }
	        else if (this.itemEdit && css.clientEngine && this.propsCheckList.valEdit != '') {
	            var editRoot = css.startLocalEdit();
	            var checkList = this.plan.value[this.itemEdit.checklist];
	            var editItem = new OT.OTArrayResource(this.itemEdit.checklist);
	            if (checkList && checkList.length > 0)
	                editItem.edits.push([OT.OpRetain, checkList.length, []]);
	            editItem.edits.push([OT.OpInsert, 1, [[this.propsCheckList.valEdit, false]]]);
	            this.propsCheckList.valEdit = '';
	            editRoot.edits.push(editItem);
	            css.addLocal(editRoot);
	            css.tick();
	            this.reRender();
	        }
	    };
	    PlanControl.prototype.toggleCheckList = function (i) {
	        var css = this.clientSession.session;
	        if (this.itemEdit && css.clientEngine) {
	            var editRoot = css.startLocalEdit();
	            var checkList = this.plan.value[this.itemEdit.checklist];
	            var checkListItem = checkList[i];
	            var editItem = new OT.OTArrayResource(this.itemEdit.checklist);
	            if (i != 0)
	                editItem.edits.push([OT.OpRetain, i, []]);
	            editItem.edits.push([OT.OpSet, 1, [[checkListItem[0], !checkListItem[1]]]]);
	            if (i != checkList.length - 1)
	                editItem.edits.push([OT.OpRetain, checkList.length - i - 1, []]);
	            editRoot.edits.push(editItem);
	            css.addLocal(editRoot);
	            css.tick();
	            this.reRender();
	        }
	    };
	    PlanControl.prototype.deleteCheckList = function (i) {
	        var css = this.clientSession.session;
	        if (this.itemEdit && css.clientEngine) {
	            var editRoot = css.startLocalEdit();
	            var checkList = this.plan.value[this.itemEdit.checklist];
	            var editItem = new OT.OTArrayResource(this.itemEdit.checklist);
	            if (i != 0)
	                editItem.edits.push([OT.OpRetain, i, []]);
	            editItem.edits.push([OT.OpDelete, 1, []]);
	            if (i != checkList.length - 1)
	                editItem.edits.push([OT.OpRetain, checkList.length - i - 1, []]);
	            editRoot.edits.push(editItem);
	            css.addLocal(editRoot);
	            css.tick();
	            this.reRender();
	        }
	    };
	    PlanControl.prototype.toggleShowCheckList = function () {
	        if (this.itemEdit) {
	            this.itemEdit.bShowCheck = !this.itemEdit.bShowCheck;
	            this.editItemProperty(this.itemEdit, 'bShowCheck');
	        }
	    };
	    PlanControl.prototype.doneBucket = function (ok) {
	        if (this.propsBucketNew.bActive && ok && this.propsBucketNew.valEdit != '')
	            this.addBucket(this.propsBucketNew.valEdit);
	        this.propsBucketNew.bActive = false;
	        this.propsBucketNew.valEdit = '';
	        this.reRender();
	    };
	    PlanControl.prototype.doneItem = function (ok) {
	        if (this.propsItemNew.bActive && ok && this.propsItemNew.valEdit != '') {
	            var item = this.plan.createEmptyItem();
	            item.bucket = this.propUIDBucket;
	            item.name = this.propsItemNew.valEdit;
	            item.created_id = this.clientSession.userID;
	            this.editItem(item);
	        }
	        this.propsItemNew.bActive = false;
	        this.propsItemNew.valEdit = '';
	        this.reRender();
	    };
	    return PlanControl;
	}());
	exports.PlanControl = PlanControl;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Trello-like planner
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	
	Data model as mapped to OT structures:
	- Main meta data for overall plan is stored with WellKnownName_meta
	- List of buckets is a map named "buckets", keyed by UID, value is bucket name
	- List of items is a map named "items", keyed by UID, value unused
	- Each item is an independent map, with two secondary maps for checklist and comments.
	
	Plan("WellKnownName_meta", map)
	    {
	        name: string,
	        type: "plan",
	        label1: string,
	        label2: string,
	        label3: string,
	        label4: string,
	        label5: string,
	        label6: string
	    }
	
	Buckets("buckets", map):
	    [ BucketItem_UID, ... ]
	
	(Do I need this? Might if buckets gain additional meta data beyond string name.)
	BucketItem(UID, map):
	    { name: string }
	
	Items("items", array):
	    [ PlanItem_UID, ... ]
	
	PlanItem(UID, map):
	    {
	        uid: string,
	        name: string,
	        description: string,
	        assigned_id: string,
	        created_id: string
	        created_date: string,
	        bucket: string, 	// bucketitem_uid
	        checklist: string,	// checklistarray_uid
	        comments: string,	// commentarray_uid
	        showCheck: boolean,
	        startdate: string,
	        duedate: string,
	        progress: number,
	        state: number, 		// 0: active, 1: completed, 2: deleted
	        label1: boolean,
	        label2: boolean,
	        label3: boolean,
	        label4: boolean,
	        label5: boolean,
	        label6: boolean
	    }
	
	ChecklistArray(UID, array):
	    [
	        [ value, checked ]
	        ...
	    ]
	
	CommentArray(UID, array):
	    [
	        [ value: string, id: string, date: string ]
	        ...
	    ]
	
	*/
	var Util = __webpack_require__(12);
	exports.BucketsName = 'buckets';
	exports.ItemsName = 'items';
	var Plan = (function () {
	    function Plan() {
	        this.value = null;
	    }
	    Plan.prototype.createEmptyItem = function () {
	        var i = {};
	        i.uid = '';
	        i.name = '';
	        i.description = '';
	        i.assigned_id = '';
	        i.created_id = '';
	        i.bShowCheck = false;
	        var d = Date();
	        i.created_date = d.toString();
	        i.bucket = '';
	        i.checklist = Util.createGuid();
	        i.comments = Util.createGuid();
	        i.startdate = '';
	        i.enddate = '';
	        i.progress = 0;
	        i.state = 0;
	        i.label1 = false;
	        i.label2 = false;
	        i.label3 = false;
	        i.label4 = false;
	        i.label5 = false;
	        i.label6 = false;
	        return i;
	    };
	    Plan.prototype.getItemByUID = function (uid) {
	        if (this.value)
	            return this.value[uid];
	        return null;
	    };
	    Plan.prototype.getItemsByBucket = function () {
	        var mBuckets = {};
	        if (this.value) {
	            // First initialize arrays (ensures all buckets are represented even if item list is empty)
	            var mAllBuckets = this.value[exports.BucketsName];
	            for (var p in mAllBuckets)
	                if (mAllBuckets.hasOwnProperty(p))
	                    mBuckets[p] = [];
	            var mItems = this.value[exports.ItemsName];
	            for (var p in mItems)
	                if (mItems.hasOwnProperty(p)) {
	                    var item = this.value[p];
	                    if (item) {
	                        var aItems = mBuckets[item.bucket];
	                        if (aItems !== undefined)
	                            aItems.push(item);
	                        // otherwise orphaned item which can occur if one user deletes a bucket while another is creating an item
	                    }
	                }
	        }
	        return mBuckets;
	    };
	    Plan.prototype.getItemsOfBucket = function (uid) {
	        var aItems = [];
	        var mItems = this.value[exports.ItemsName];
	        for (var p in mItems)
	            if (mItems.hasOwnProperty(p)) {
	                var item = this.value[p];
	                if (item && item.bucket == uid)
	                    aItems.push(item);
	            }
	        return aItems;
	    };
	    Plan.prototype.getBucketName = function (uid) {
	        if (this.value && this.value[exports.BucketsName])
	            return (this.value[exports.BucketsName])[uid];
	        return 'ErrorNoBucket';
	    };
	    Plan.prototype.getBuckets = function () {
	        if (this.value[exports.BucketsName])
	            return this.value[exports.BucketsName];
	        return {};
	    };
	    Plan.prototype.getCheckList = function (item) {
	        if (this.value) {
	            var a = this.value[item.checklist];
	            if (a)
	                return a;
	        }
	        return [];
	    };
	    Plan.prototype.getComments = function (item) {
	        if (this.value) {
	            var a = this.value[item.comments];
	            if (a)
	                return a;
	        }
	        return [];
	    };
	    return Plan;
	}());
	exports.Plan = Plan;


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var StatusControl = (function () {
	    function StatusControl(ctx, cs, reRender) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.userMap = {};
	        this.notifyJoin = this.notifyJoin.bind(this);
	        this.notifyUserChange = this.notifyUserChange.bind(this);
	        cs.onStatusChange(this.notifyJoin);
	        cs.onJoin('WellKnownName_root', this.notifyJoin);
	        cs.onData('WellKnownName_users', this.notifyUserChange);
	    }
	    StatusControl.prototype.doneEdits = function (ok) {
	    };
	    StatusControl.prototype.notifyJoin = function (cs) {
	        var newStatus;
	        if (!cs.bConnected)
	            newStatus = "Server unreachable.";
	        else if (cs.bInSession) {
	            if (cs.session.bReachable) {
	                var nAnon = 0;
	                var nOther = 0;
	                for (var cid in this.userMap)
	                    if (this.userMap.hasOwnProperty(cid) && cid != cs.clientID) {
	                        nOther++;
	                        if (this.userMap[cid] == '')
	                            nAnon++;
	                    }
	                if (nOther == 0)
	                    newStatus = "Connected, no other authors.";
	                else {
	                    var statusBuild = [];
	                    statusBuild.push('Connected with ');
	                    if (nOther > nAnon) {
	                        var nNames = nOther - nAnon;
	                        var sFinalCombiner = nAnon == 0 ? ' and ' : ', ';
	                        for (var cid in this.userMap)
	                            if (this.userMap.hasOwnProperty(cid) && cid != cs.clientID && this.userMap[cid] != '') {
	                                statusBuild.push(this.userMap[cid]);
	                                nNames--;
	                                if (nNames == 1)
	                                    statusBuild.push(sFinalCombiner);
	                                else if (nNames > 1)
	                                    statusBuild.push(', ');
	                            }
	                        if (nAnon > 0)
	                            statusBuild.push(' and ');
	                    }
	                    statusBuild.push(nAnon == 0 ? '.' : (nAnon == 1 ? 'one other user.' : String(nAnon) + ' other users.'));
	                    newStatus = statusBuild.join('');
	                }
	            }
	            else
	                newStatus = "Session unavailable.";
	        }
	        else if (cs.session.bFull)
	            newStatus = "Session full, please wait.";
	        else if (cs.bPendingConnection)
	            newStatus = "Connecting to session...";
	        else
	            newStatus = "No current session.";
	        // Only re-render as necessary
	        if (newStatus != this.status) {
	            this.status = newStatus;
	            this.reRender();
	        }
	    };
	    StatusControl.prototype.notifyUserChange = function (cs, userMap) {
	        if (userMap === undefined)
	            this.userMap = {};
	        else
	            this.userMap = userMap;
	        this.notifyJoin(cs);
	    };
	    return StatusControl;
	}());
	exports.StatusControl = StatusControl;


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var SessionControl = (function () {
	    function SessionControl(ctx, cs, reRender, actions) {
	        this.context = ctx;
	        this.clientSession = cs;
	        this.reRender = reRender;
	        this.actions = actions;
	        this.notifyStatusChange = this.notifyStatusChange.bind(this);
	        cs.onStatusChange(this.notifyStatusChange);
	        this.user = cs.user;
	    }
	    SessionControl.prototype.doneEdits = function (ok) {
	    };
	    SessionControl.prototype.notifyStatusChange = function (cs) {
	        this.user = cs.user;
	        this.reRender();
	    };
	    return SessionControl;
	}());
	exports.SessionControl = SessionControl;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var navbar_1 = __webpack_require__(26);
	var chessview_1 = __webpack_require__(27);
	var planview_1 = __webpack_require__(28);
	var statusview_1 = __webpack_require__(30);
	var chatview_1 = __webpack_require__(31);
	var nameview_1 = __webpack_require__(32);
	var queryview_1 = __webpack_require__(33);
	var menuview_1 = __webpack_require__(34);
	var scratchview_1 = __webpack_require__(35);
	var sessionview_1 = __webpack_require__(36);
	var agreeview_1 = __webpack_require__(37);
	var ReactApp = (function (_super) {
	    __extends(ReactApp, _super);
	    function ReactApp() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ReactApp.prototype.render = function () {
	        var statusLabel = this.props.mode === 'chess' ? this.props.chessControl.navText() : '';
	        var cmpNav = React.createElement(navbar_1.NavBar, { url: this.props.url, name: this.props.name, chatLabel: this.props.chatControl.navText(), actions: this.props.actions, statusLabel: statusLabel });
	        var cmpChat = this.props.chatControl.bChatOn ? React.createElement(chatview_1.ChatView, { cc: this.props.chatControl }) : null;
	        var cmpStatus = React.createElement(statusview_1.StatusView, { status: this.props.status });
	        var cmpName = React.createElement(nameview_1.NameView, { nc: this.props.nameControl });
	        var cmpMain = null;
	        switch (this.props.mode) {
	            case 'chess':
	                cmpMain = React.createElement(chessview_1.ChessView, { chessControl: this.props.chessControl });
	                break;
	            case 'scratch':
	                cmpMain = React.createElement(scratchview_1.ScratchView, { sc: this.props.scratchControl });
	                break;
	            case 'agree':
	                cmpMain = React.createElement(agreeview_1.AgreeView, { agreeControl: this.props.agreeControl });
	                break;
	            case 'plan':
	                cmpMain = React.createElement(planview_1.PlanView, { planControl: this.props.planControl });
	                break;
	            default:
	                cmpMain = React.createElement(sessionview_1.SessionView, { sc: this.props.sessionControl });
	                cmpName = null;
	                break;
	        }
	        return (React.createElement("div", { className: "wrapper" },
	            React.createElement(queryview_1.QueryView, { queryControl: this.props.queryControl }),
	            React.createElement(menuview_1.MenuView, { menuControl: this.props.menuControl }),
	            React.createElement("div", { className: "header" },
	                cmpNav,
	                cmpName),
	            React.createElement("div", { className: "content inarow" },
	                cmpMain,
	                cmpChat),
	            React.createElement("div", { className: "footer" }, cmpStatus)));
	    };
	    return ReactApp;
	}(React.Component));
	exports.ReactApp = ReactApp;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var $ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ClientActions = __webpack_require__(10);
	var NavBar = (function (_super) {
	    __extends(NavBar, _super);
	    function NavBar(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleHome = _this.handleHome.bind(_this);
	        _this.handleChat = _this.handleChat.bind(_this);
	        _this.handleShare = _this.handleShare.bind(_this);
	        _this.handleDismiss = _this.handleDismiss.bind(_this);
	        _this.handleCopyClick = _this.handleCopyClick.bind(_this);
	        _this.state = { username: props.name };
	        return _this;
	    }
	    NavBar.prototype.handleCopyClick = function () {
	        $('#nav').focus();
	        $('#nav').select();
	        document.execCommand('copy');
	    };
	    NavBar.prototype.handleHome = function (e) {
	        this.props.actions.fire(ClientActions.Home);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    NavBar.prototype.handleChat = function (e) {
	        this.props.actions.fire(ClientActions.ToggleChat);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    NavBar.prototype.handleShare = function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        $('#popup-share').css('display', 'flex');
	        $('#nav').focus();
	        $('#nav').select();
	        document.execCommand('copy');
	        return false;
	    };
	    NavBar.prototype.handleDismiss = function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        $('#popup-share').css('display', 'none');
	        return false;
	    };
	    NavBar.prototype.render = function () {
	        var cmpMenus = null;
	        if (this.props.url == '') {
	            cmpMenus = (React.createElement("div", null,
	                React.createElement("a", { href: "/" }, "Home"),
	                "\u00A0 | \u00A0",
	                this.props.name,
	                "\u00A0 | \u00A0",
	                React.createElement("a", { href: '/logout' }, "Logout")));
	        }
	        else {
	            cmpMenus = (React.createElement("div", null,
	                React.createElement("a", { href: "#home", onClick: this.handleHome }, "Home"),
	                "\u00A0 | \u00A0",
	                React.createElement("a", { href: "#share", onClick: this.handleShare }, "Share"),
	                "\u00A0 | \u00A0",
	                React.createElement("a", { href: "#chat", onClick: this.handleChat }, this.props.chatLabel),
	                "\u00A0 | \u00A0",
	                this.props.name,
	                "\u00A0 | \u00A0",
	                this.props.statusLabel));
	        }
	        return (React.createElement("div", { className: "headerrow" },
	            cmpMenus,
	            React.createElement("div", { id: "popup-share", className: "popup" },
	                "Copy and share this url:",
	                React.createElement("br", null),
	                React.createElement("input", { id: "nav", className: "line", type: "text", value: this.props.url, readOnly: true }),
	                React.createElement("br", null),
	                React.createElement("a", { href: "#dismiss", onClick: this.handleDismiss }, "Close"))));
	    };
	    return NavBar;
	}(React.Component));
	exports.NavBar = NavBar;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var Chess = __webpack_require__(20);
	function getPieceClass(color, piece) {
	    if (piece == Chess.Empty)
	        return "";
	    var s = color == Chess.Black ? "Black" : "White";
	    switch (piece) {
	        case Chess.Empty: break;
	        case Chess.Pawn:
	            s += "Pawn";
	            break;
	        case Chess.Knight:
	            s += "Knight";
	            break;
	        case Chess.Bishop:
	            s += "Bishop";
	            break;
	        case Chess.Rook:
	            s += "Rook";
	            break;
	        case Chess.Queen:
	            s += "Queen";
	            break;
	        case Chess.King:
	            s += "King";
	            break;
	    }
	    return s;
	}
	var ChessView = (function (_super) {
	    __extends(ChessView, _super);
	    function ChessView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }
	    ChessView.prototype.handleClick = function (e) {
	        this.props.chessControl.clickSquare(Number(e.currentTarget.id));
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    ChessView.prototype.render = function () {
	        var chess = this.props.chessControl.chess;
	        var nRows = 8;
	        var nCells = 8;
	        var rows = [];
	        var c = 0;
	        for (var i = 0; i < nRows; i++) {
	            var row = [];
	            for (var j = 0; j < nCells; j++, c++) {
	                var piece = chess.pieceAt(c);
	                var color = chess.colorAt(c);
	                var pieceClass = getPieceClass(color, piece);
	                var squareClass = (i % 2) == (j % 2) ? "cellwhite" : "cellblack";
	                var borderClass = 'cellborder';
	                if (chess.selected == c)
	                    borderClass = 'selected';
	                else if (chess.isTargeted(c))
	                    borderClass = 'targeted';
	                var contentClass = pieceClass + " " + squareClass;
	                row[j] = (React.createElement("div", { onClick: this.handleClick, id: String(c), key: String(c), className: 'cellgrid' },
	                    React.createElement("div", { className: borderClass },
	                        React.createElement("div", { className: contentClass }))));
	            }
	            rows[i] = (React.createElement("div", { className: "row" }, row));
	        }
	        return (React.createElement("div", null, rows));
	    };
	    return ChessView;
	}(React.Component));
	exports.ChessView = ChessView;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var IP = __webpack_require__(29);
	var Menu = __webpack_require__(18);
	var ClientActions = __webpack_require__(10);
	var ProgressStrings = ['Not Started', 'In Progress', 'Completed'];
	var PlanView = (function (_super) {
	    __extends(PlanView, _super);
	    function PlanView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleNewBucket = _this.handleNewBucket.bind(_this);
	        _this.handleNewItem = _this.handleNewItem.bind(_this);
	        _this.handleItemClick = _this.handleItemClick.bind(_this);
	        _this.handleItemCancel = _this.handleItemCancel.bind(_this);
	        _this.handleChangeBucket = _this.handleChangeBucket.bind(_this);
	        _this.handleChangeProgress = _this.handleChangeProgress.bind(_this);
	        _this.handleChangeDescription = _this.handleChangeDescription.bind(_this);
	        _this.handleChangeComment = _this.handleChangeComment.bind(_this);
	        _this.handlePostComment = _this.handlePostComment.bind(_this);
	        _this.handleCheckList = _this.handleCheckList.bind(_this);
	        _this.handleShowCheck = _this.handleShowCheck.bind(_this);
	        _this.handleStartCheckItem = _this.handleStartCheckItem.bind(_this);
	        _this.handleBucketMenu = _this.handleBucketMenu.bind(_this);
	        return _this;
	    }
	    PlanView.prototype.handleNewBucket = function (e) {
	        this.props.planControl.editNewBucket();
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleNewItem = function (e) {
	        this.props.planControl.editNewItem(e.currentTarget.id);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleItemClick = function (e) {
	        this.props.planControl.startEditItem(e.currentTarget.id);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleItemCancel = function (e) {
	        this.props.planControl.endEditItem();
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleChangeBucket = function (e) {
	        this.props.planControl.updateItemBucket(e.currentTarget.value);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleChangeProgress = function (e) {
	        this.props.planControl.updateItemProgress(e.currentTarget.value);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleChangeDescription = function (e) {
	        this.props.planControl.updateDescription(e.currentTarget.value);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleChangeComment = function (e) {
	        this.props.planControl.updateComment(e.currentTarget.value);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handlePostComment = function (e) {
	        this.props.planControl.postComment();
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleCheckList = function (e) {
	        this.props.planControl.toggleCheckList(Number(e.currentTarget.id));
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleShowCheck = function (e) {
	        this.props.planControl.toggleShowCheckList();
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleStartCheckItem = function (e) {
	        this.props.planControl.propsCheckList.bActive = true;
	        this.props.planControl.reRender();
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.handleBucketMenu = function (e) {
	        var menuprops = Menu.createEmpty();
	        menuprops.absx = e.clientX;
	        menuprops.absy = e.clientY;
	        var planControl = this.props.planControl;
	        menuprops.callback = function (result) { if (result != '')
	            planControl.deleteBucket(result); };
	        menuprops.choices = [['', 'Rename'], [e.target.id, 'Delete']];
	        this.props.planControl.actions.fire(ClientActions.Menu, menuprops);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    PlanView.prototype.componentDidUpdate = function (oldProps, oldState) {
	    };
	    PlanView.prototype.render = function () {
	        var plan = this.props.planControl.plan;
	        var mItems = plan.getItemsByBucket();
	        var cols = [];
	        var uidActive = this.props.planControl.propUIDBucket;
	        for (var uidBucket in mItems)
	            if (mItems.hasOwnProperty(uidBucket)) {
	                var aItems = mItems[uidBucket];
	                var bucketName = plan.getBucketName(uidBucket);
	                var col = [];
	                col.push(React.createElement("div", { className: "buckethead" },
	                    React.createElement("div", { className: "row spread" },
	                        React.createElement("span", null, "\u00A0"),
	                        React.createElement("span", null, bucketName),
	                        React.createElement("span", { className: 'menutarget', id: uidBucket, onClick: this.handleBucketMenu }, "..."))));
	                col.push(React.createElement("div", { className: "hr" }));
	                col.push(React.createElement("div", { className: "newitem", onClick: this.handleNewItem, id: uidBucket }, "+"));
	                if (this.props.planControl.propsItemNew.bActive && uidBucket == uidActive) {
	                    var p_1 = this.props.planControl.propsItemNew;
	                    col.push(React.createElement("div", { className: "item" },
	                        React.createElement(IP.InputView, { bImg: p_1.bImg, bActive: p_1.bActive, bFocus: p_1.bFocus, val: p_1.val, valEdit: p_1.valEdit, update: p_1.update, done: p_1.done })));
	                }
	                for (var i = 0; i < aItems.length; i++) {
	                    var item = aItems[i];
	                    col.push(React.createElement("div", { className: "item", id: item.uid, onClick: this.handleItemClick }, item.name));
	                }
	                cols.push(React.createElement("div", { className: "column items" }, col));
	            }
	        var p = this.props.planControl.propsBucketNew;
	        cols.push(React.createElement("div", { className: "column items" },
	            React.createElement("div", { className: "newbucket", onClick: this.handleNewBucket },
	                React.createElement(IP.InputView, { bImg: p.bImg, bFocus: p.bFocus, bActive: p.bActive, val: p.val, valEdit: p.valEdit, update: p.update, done: p.done }))));
	        var popup = null;
	        if (this.props.planControl.itemEdit) {
	            var item = this.props.planControl.itemEdit;
	            var buckets = plan.getBuckets();
	            var comments = plan.getComments(item);
	            var checklist = plan.getCheckList(item);
	            var optionsBucket = [];
	            for (var bid in buckets)
	                if (buckets.hasOwnProperty(bid))
	                    optionsBucket.push(React.createElement("option", { value: bid }, buckets[bid]));
	            var optionsProgress = [];
	            for (var i = 0; i < 3; i++)
	                optionsProgress.push(React.createElement("option", { value: i }, ProgressStrings[i]));
	            var commentsBlockArray = [];
	            if (comments.length > 0) {
	                for (var j = 0; j < comments.length; j++) {
	                    var iComment = comments[j];
	                    commentsBlockArray.push(React.createElement("span", null,
	                        iComment[1],
	                        "\u00A0 by \u00A0",
	                        iComment[0]));
	                }
	            }
	            var checklistBlockArray = [];
	            var nChecked = 0;
	            if (checklist.length > 0) {
	                for (var j = 0; j < checklist.length; j++) {
	                    var iCheck = checklist[j];
	                    var cn = '';
	                    if (iCheck[1]) {
	                        nChecked++;
	                        cn = 'deleted';
	                    }
	                    checklistBlockArray.push(React.createElement("div", null,
	                        React.createElement("input", { type: 'checkbox', id: String(j), checked: iCheck[1], onClick: this.handleCheckList }),
	                        "\u00A0",
	                        React.createElement("span", { className: cn }, iCheck[0])));
	                }
	            }
	            var pName = this.props.planControl.propsItemName;
	            var pDue = this.props.planControl.propsDueDate;
	            var pStart = this.props.planControl.propsStartDate;
	            var pComment = this.props.planControl.propsComment;
	            var pCheck = this.props.planControl.propsCheckList;
	            popup = (React.createElement("div", { className: "popupprops" },
	                React.createElement("div", { className: "right", onClick: this.handleItemCancel },
	                    React.createElement("button", { id: 'cancel' },
	                        React.createElement("img", { src: '/ShowNo.png' }))),
	                React.createElement("div", { className: 'row distinctblock' },
	                    React.createElement("div", { className: 'column' },
	                        React.createElement(IP.InputView, { bImg: pName.bImg, bFocus: pName.bFocus, bActive: pName.bActive, val: pName.val, valEdit: pName.valEdit, update: pName.update, done: pName.done }))),
	                React.createElement("div", { className: 'row distinctblock' },
	                    React.createElement("div", { className: 'column' },
	                        React.createElement("div", { className: 'row' }, "Bucket"),
	                        React.createElement("div", { className: 'row' },
	                            React.createElement("select", { id: 'bucket', value: item.bucket, onChange: this.handleChangeBucket }, optionsBucket))),
	                    React.createElement("div", { className: 'column' },
	                        React.createElement("div", { className: 'row' }, "Progress"),
	                        React.createElement("div", { className: 'row' },
	                            React.createElement("select", { id: 'progress', value: item.progress, onChange: this.handleChangeProgress }, optionsProgress))),
	                    React.createElement("div", { className: 'column' },
	                        React.createElement("div", { className: 'row' }, "Start date"),
	                        React.createElement("div", { className: 'row' },
	                            React.createElement(IP.InputView, { bImg: pStart.bImg, bFocus: pStart.bFocus, bActive: pStart.bActive, val: pStart.val, valEdit: pStart.valEdit, update: pStart.update, done: pStart.done }))),
	                    React.createElement("div", { className: 'column' },
	                        React.createElement("div", { className: 'row' }, "Due date"),
	                        React.createElement("div", { className: 'row' },
	                            React.createElement(IP.InputView, { bImg: pDue.bImg, bFocus: pDue.bFocus, bActive: pDue.bActive, val: pDue.val, valEdit: pDue.valEdit, update: pDue.update, done: pDue.done })))),
	                React.createElement("div", { className: 'column distinctblock' },
	                    React.createElement("div", { className: 'row spread' },
	                        React.createElement("div", null,
	                            "Checklist \u00A0",
	                            nChecked,
	                            "\u00A0 of \u00A0",
	                            checklist.length),
	                        React.createElement("div", null,
	                            "show on card",
	                            React.createElement("input", { type: 'checkbox', checked: item.bShowCheck, onClick: this.handleShowCheck }))),
	                    checklistBlockArray,
	                    React.createElement("div", { className: 'row', onClick: this.handleStartCheckItem },
	                        React.createElement("div", null,
	                            React.createElement("input", { type: 'checkbox', checked: false, disabled: true }),
	                            "\u00A0"),
	                        React.createElement(IP.InputView, { bImg: pCheck.bImg, bFocus: pCheck.bFocus, bActive: pCheck.bActive, val: pCheck.val, valEdit: pCheck.valEdit, update: pCheck.update, done: pCheck.done }))),
	                React.createElement("div", { className: 'row distinctblock' },
	                    React.createElement("div", { className: 'column' },
	                        React.createElement("br", null),
	                        "Description",
	                        React.createElement("br", null),
	                        React.createElement("textarea", { onChange: this.handleChangeDescription, value: item.description }))),
	                React.createElement("div", { className: 'row distinctblock' },
	                    React.createElement("div", { className: 'column' },
	                        React.createElement("div", { className: 'row' },
	                            React.createElement("div", { className: 'column' },
	                                React.createElement("br", null),
	                                "Comments",
	                                React.createElement("br", null),
	                                React.createElement("textarea", { onChange: this.handleChangeComment, value: pComment.valEdit }),
	                                React.createElement("br", null))),
	                        React.createElement("div", { className: 'right' },
	                            React.createElement("button", { onClick: this.handlePostComment }, "Post"),
	                            React.createElement("br", null)),
	                        React.createElement("div", { className: 'row' },
	                            React.createElement("div", { className: 'column' },
	                                React.createElement("span", null, "\u00A0"),
	                                commentsBlockArray)))),
	                React.createElement("div", { className: 'row' },
	                    React.createElement("br", null),
	                    "Created by\u00A0",
	                    item.created_id,
	                    "\u00A0at\u00A0",
	                    item.created_date)));
	        }
	        return (React.createElement("div", { className: 'row' },
	            cols,
	            popup));
	    };
	    return PlanView;
	}(React.Component));
	exports.PlanView = PlanView;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var InputView = (function (_super) {
	    __extends(InputView, _super);
	    function InputView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleOKClick = _this.handleOKClick.bind(_this);
	        _this.handleTextChange = _this.handleTextChange.bind(_this);
	        _this.handleTextReturn = _this.handleTextReturn.bind(_this);
	        _this.handleBlur = _this.handleBlur.bind(_this);
	        return _this;
	    }
	    InputView.prototype.handleTextChange = function (event) {
	        if (this.props.bActive) {
	            this.props.valEdit = event.target.value;
	            this.props.update(event.target.value);
	        }
	    };
	    InputView.prototype.handleTextReturn = function (event) {
	        if (event === undefined || event.charCode == 13) {
	            if (this.props.bActive) {
	                var val = (event === undefined) ? this.props.valEdit : event.target.value;
	                if (this.props.done)
	                    this.props.done(true);
	            }
	        }
	    };
	    InputView.prototype.handleOKClick = function (e) {
	        if (e.currentTarget.id == "ok")
	            this.handleTextReturn();
	        else if (e.currentTarget.id == "cancel")
	            this.props.done(false);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    InputView.prototype.handleBlur = function (e) {
	        if (this.props.done && this.props.val != '' && !this.props.bImg)
	            this.props.done(false);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    InputView.prototype.render = function () {
	        if (this.props.bActive) {
	            var buttons = null;
	            var className = 'chatinput';
	            var id = this.props.bFocus ? 'autofocus' : 'nofocus';
	            if (this.props.done && this.props.bImg) {
	                buttons = (React.createElement("span", null,
	                    "\u00A0",
	                    React.createElement("button", { id: 'ok', onClick: this.handleOKClick },
	                        React.createElement("img", { src: '/ShowYes.png' })),
	                    "\u00A0",
	                    React.createElement("button", { id: 'cancel', onClick: this.handleOKClick },
	                        React.createElement("img", { src: '/ShowNo.png' }))));
	            }
	            else
	                className = 'subtleinput';
	            return (React.createElement("div", null,
	                React.createElement("input", { className: className, id: id, type: 'text', value: this.props.valEdit, onChange: this.handleTextChange, onKeyPress: this.handleTextReturn, onBlur: this.handleBlur }),
	                buttons));
	        }
	        else {
	            return (React.createElement("div", { className: 'faded' }, this.props.val));
	        }
	    };
	    return InputView;
	}(React.Component));
	exports.InputView = InputView;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var StatusView = (function (_super) {
	    __extends(StatusView, _super);
	    function StatusView() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    StatusView.prototype.render = function () {
	        return (React.createElement("div", null, this.props.status));
	    };
	    return StatusView;
	}(React.Component));
	exports.StatusView = StatusView;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var $ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ChatView = (function (_super) {
	    __extends(ChatView, _super);
	    function ChatView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleReturn = _this.handleReturn.bind(_this);
	        _this.state = { text: '' };
	        return _this;
	    }
	    ChatView.prototype.handleChange = function (event) {
	        this.setState({ text: event.target.value });
	    };
	    ChatView.prototype.handleReturn = function (event) {
	        if (event.charCode == 13) {
	            this.props.cc.notifyLocalChange(event.target.value);
	            this.setState({ text: '' });
	        }
	    };
	    ChatView.prototype.componentDidMount = function () {
	        $('#chat').focus();
	    };
	    ChatView.prototype.componentDidUpdate = function (prevProps, prevState) {
	        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
	    };
	    ChatView.prototype.render = function () {
	        var whoMe = this.props.cc.clientSession.clientID;
	        var whoMap = this.props.cc.userMap;
	        var chatHistory = this.props.cc.chatArray.map(function (chatEntry, i) {
	            var sWho = whoMap[chatEntry[0]];
	            if (!sWho || sWho == '')
	                sWho = chatEntry[0] == whoMe ? 'me' : 'anon';
	            return (React.createElement("li", { key: i },
	                sWho,
	                ": ",
	                chatEntry[1]));
	        });
	        return (React.createElement("div", { className: "chatcontainer" },
	            React.createElement("div", { id: "chatbox", className: "chatbox" },
	                React.createElement("ol", null, chatHistory)),
	            React.createElement("input", { className: "chatinput", id: "chat", type: "text", value: this.state.text, onChange: this.handleChange, onKeyPress: this.handleReturn })));
	    };
	    return ChatView;
	}(React.Component));
	exports.ChatView = ChatView;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var IP = __webpack_require__(29);
	var NameView = (function (_super) {
	    __extends(NameView, _super);
	    function NameView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }
	    NameView.prototype.handleClick = function (e) {
	        this.props.nc.editName();
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    NameView.prototype.render = function () {
	        var p = this.props.nc.propsName;
	        return (React.createElement("div", { onClick: this.handleClick },
	            React.createElement("hr", null),
	            React.createElement(IP.InputView, { bImg: p.bImg, bFocus: p.bFocus, bActive: p.bActive, valEdit: p.valEdit, val: p.val, done: p.done, update: p.update }),
	            React.createElement("hr", null)));
	    };
	    return NameView;
	}(React.Component));
	exports.NameView = NameView;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var QueryView = (function (_super) {
	    __extends(QueryView, _super);
	    function QueryView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }
	    QueryView.prototype.handleClick = function (e) {
	        this.props.queryControl.fire(e.currentTarget.id == "ok");
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    QueryView.prototype.render = function () {
	        var p = this.props.queryControl.props;
	        if (p.query) {
	            var sYes = p.yes ? p.yes : "Yes";
	            var sNo = p.no ? p.no : "No";
	            return (React.createElement("div", { className: 'query' },
	                React.createElement("img", { className: "floating", src: '/ShowMaybe.png' }),
	                React.createElement("div", null,
	                    p.query,
	                    React.createElement("br", null),
	                    React.createElement("br", null),
	                    React.createElement("button", { id: 'ok', onClick: this.handleClick }, sYes),
	                    "\u00A0",
	                    React.createElement("button", { id: 'cancel', onClick: this.handleClick }, sNo))));
	        }
	        else
	            return null;
	    };
	    return QueryView;
	}(React.Component));
	exports.QueryView = QueryView;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var $ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var hideOnClickOutside = null;
	function removeClickListener() {
	    $('html').off('click', hideOnClickOutside);
	}
	function addClickListener() {
	    $('html').on('click', hideOnClickOutside);
	}
	var MenuView = (function (_super) {
	    __extends(MenuView, _super);
	    function MenuView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleClick = _this.handleClick.bind(_this);
	        _this.handleHtmlClick = _this.handleHtmlClick.bind(_this);
	        _this.cancel = _this.cancel.bind(_this);
	        hideOnClickOutside = _this.handleHtmlClick;
	        _this.bVisible = false;
	        _this.bAdded = false;
	        return _this;
	    }
	    MenuView.prototype.handleClick = function (e) {
	        this.props.menuControl.fire(e.currentTarget.id);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    MenuView.prototype.handleHtmlClick = function (e) {
	        if (!$(e.target).closest('#capturemenu').length) {
	            if ($('#capturemenu')) {
	                removeClickListener();
	                this.cancel();
	            }
	        }
	    };
	    MenuView.prototype.cancel = function () {
	        this.props.menuControl.doneEdits(false);
	    };
	    MenuView.prototype.componentDidUpdate = function (prevProps, prevState) {
	        if (this.bVisible && !this.bAdded) {
	            addClickListener();
	            this.bAdded = true;
	        }
	        if (!this.bVisible && this.bAdded) {
	            removeClickListener();
	            this.bAdded = false;
	        }
	    };
	    MenuView.prototype.render = function () {
	        var p = this.props.menuControl.props;
	        if (p.choices) {
	            this.bVisible = true;
	            var menuStyle = { position: 'absolute', left: p.absx, top: p.absy };
	            var choicesBlock = [];
	            for (var i = 0; i < p.choices.length; i++)
	                choicesBlock.push(React.createElement("div", { id: p.choices[i][0], className: 'menuchoice', onClick: this.handleClick }, p.choices[i][1]));
	            return (React.createElement("div", { id: 'capturemenu', className: "menu", style: menuStyle }, choicesBlock));
	        }
	        else {
	            this.bVisible = false;
	            return null;
	        }
	    };
	    return MenuView;
	}(React.Component));
	exports.MenuView = MenuView;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var $ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ScratchView = (function (_super) {
	    __extends(ScratchView, _super);
	    function ScratchView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleCaptureSelection = _this.handleCaptureSelection.bind(_this);
	        return _this;
	    }
	    ScratchView.prototype.handleChange = function (event) {
	        var el = $('#scratchpad')[0];
	        this.props.sc.notifyLocalChange(event.target.value, el.selectionStart, el.selectionEnd);
	    };
	    ScratchView.prototype.handleCaptureSelection = function (event) {
	        var el = $('#scratchpad')[0];
	        this.props.sc.notifyLocalChange(event.target.value, el.selectionStart, el.selectionEnd);
	    };
	    ScratchView.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("textarea", { id: 'scratchpad', ref: function (textarea) { return _this.props.sc.captureElementCB(textarea); }, onChange: this.handleChange, onKeyUp: this.handleCaptureSelection, onMouseUp: this.handleCaptureSelection }));
	    };
	    return ScratchView;
	}(React.Component));
	exports.ScratchView = ScratchView;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var ClientActions = __webpack_require__(10);
	var SessionView = (function (_super) {
	    __extends(SessionView, _super);
	    function SessionView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleClick = _this.handleClick.bind(_this);
	        _this.handleClickNewScratch = _this.handleClickNewScratch.bind(_this);
	        _this.handleClickNewChess = _this.handleClickNewChess.bind(_this);
	        _this.handleClickNewPlan = _this.handleClickNewPlan.bind(_this);
	        _this.handleClickNewAgree = _this.handleClickNewAgree.bind(_this);
	        return _this;
	    }
	    SessionView.prototype.handleClick = function (e) {
	        this.props.sc.actions.fire(ClientActions.JoinSession, e.currentTarget.id);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    SessionView.prototype.handleClickNewScratch = function (e) {
	        this.props.sc.actions.fire(ClientActions.NewScratch);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    SessionView.prototype.handleClickNewChess = function (e) {
	        this.props.sc.actions.fire(ClientActions.NewChess);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    SessionView.prototype.handleClickNewPlan = function (e) {
	        this.props.sc.actions.fire(ClientActions.NewPlan);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    SessionView.prototype.handleClickNewAgree = function (e) {
	        this.props.sc.actions.fire(ClientActions.NewAgree);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    SessionView.prototype.render = function () {
	        var user = this.props.sc.user;
	        var sessionColumns = [];
	        if (user.sessions && user.sessions.length > 0) {
	            var sessionCells = [];
	            // Name
	            sessionCells.push(React.createElement("div", { className: 'row sessioncell' },
	                React.createElement("b", null, "Name")));
	            for (var i = 0; i < user.sessions.length; i++) {
	                var s = user.sessions[i];
	                sessionCells.push(React.createElement("div", { className: 'row sessioncell' }, s.sessionName));
	            }
	            sessionColumns.push(React.createElement("div", { className: 'column' }, sessionCells));
	            // Type
	            sessionCells = [];
	            sessionCells.push(React.createElement("div", { className: 'row sessioncell' },
	                React.createElement("b", null, "Type")));
	            for (var i = 0; i < user.sessions.length; i++) {
	                var s = user.sessions[i];
	                sessionCells.push(React.createElement("div", { className: 'row sessioncell' }, s.sessionType));
	            }
	            sessionColumns.push(React.createElement("div", { className: 'column' }, sessionCells));
	            // Active
	            sessionCells = [];
	            sessionCells.push(React.createElement("div", { className: 'row sessioncell' },
	                React.createElement("b", null, "Active")));
	            for (var i = 0; i < user.sessions.length; i++) {
	                var s = user.sessions[i];
	                sessionCells.push(React.createElement("div", { className: 'row sessioncell' }, String(s.clientCount) + ' active'));
	            }
	            sessionColumns.push(React.createElement("div", { className: 'column' }, sessionCells));
	            // Join
	            sessionCells = [];
	            sessionCells.push(React.createElement("div", { className: 'row sessioncell' }, "\u00A0"));
	            for (var i = 0; i < user.sessions.length; i++) {
	                var s = user.sessions[i];
	                sessionCells.push(React.createElement("div", { className: 'row sessioncell' },
	                    React.createElement("button", { className: 'actionButton', onClick: this.handleClick, id: s.sessionID }, "Join")));
	            }
	            sessionColumns.push(React.createElement("div", { className: 'column' }, sessionCells));
	        }
	        else {
	            sessionColumns.push(React.createElement("div", null, "No Sessions"));
	        }
	        return (React.createElement("div", null,
	            React.createElement("div", null,
	                "Available Sessions:",
	                React.createElement("br", null),
	                React.createElement("br", null)),
	            React.createElement("div", { className: 'row' }, sessionColumns),
	            React.createElement("div", null,
	                React.createElement("br", null),
	                React.createElement("button", { className: 'actionButton', onClick: this.handleClickNewScratch }, "New Text"),
	                "\u00A0",
	                React.createElement("button", { className: 'actionButton', onClick: this.handleClickNewChess }, "New Chess"),
	                "\u00A0",
	                React.createElement("button", { className: 'actionButton', onClick: this.handleClickNewAgree }, "New Agreed"),
	                "\u00A0",
	                React.createElement("button", { className: 'actionButton', onClick: this.handleClickNewPlan }, "New Plan"))));
	    };
	    return SessionView;
	}(React.Component));
	exports.SessionView = SessionView;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(2);
	var IP = __webpack_require__(29);
	var ClientActions = __webpack_require__(10);
	var AgreeView = (function (_super) {
	    __extends(AgreeView, _super);
	    function AgreeView(props) {
	        var _this = _super.call(this, props) || this;
	        _this.handleChoiceClick = _this.handleChoiceClick.bind(_this);
	        _this.handleUserClick = _this.handleUserClick.bind(_this);
	        _this.handleSelectClick = _this.handleSelectClick.bind(_this);
	        return _this;
	    }
	    AgreeView.prototype.handleChoiceClick = function (e) {
	        var _this = this;
	        var agreeControl = this.props.agreeControl;
	        agreeControl.doneEdits(true);
	        if (e.currentTarget.id == '')
	            agreeControl.editChoice();
	        else {
	            var choice_1 = [e.currentTarget.id, '', '', ''];
	            var props = { query: 'Delete choice?',
	                callback: function (b) { if (b)
	                    _this.props.agreeControl.notifyLocal_setChoice(choice_1); } };
	            agreeControl.actions.fire(ClientActions.Query, props);
	        }
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    AgreeView.prototype.handleUserClick = function (e) {
	        var _this = this;
	        var agreeControl = this.props.agreeControl;
	        agreeControl.doneEdits(true);
	        if (e.currentTarget.id == '')
	            agreeControl.editUser();
	        else {
	            var sid_1 = e.currentTarget.id;
	            var props = { query: 'Delete user?',
	                callback: function (b) { if (b)
	                    _this.props.agreeControl.notifyLocal_setUser(sid_1); } };
	            agreeControl.actions.fire(ClientActions.Query, props);
	        }
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    AgreeView.prototype.handleSelectClick = function (e) {
	        var agreeControl = this.props.agreeControl;
	        var agree = agreeControl.agree;
	        agreeControl.doneEdits(true);
	        agreeControl.notifyLocal_setSelect(e.currentTarget.id, agree.nextSelection(e.currentTarget.id));
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };
	    AgreeView.prototype.render = function () {
	        var agreeControl = this.props.agreeControl;
	        var agree = agreeControl.agree;
	        var rows = [];
	        var row = [];
	        // Header Row
	        row.push(React.createElement("div", { className: 'agreeCell agreeCorner agreeRowHeader' }));
	        for (var i = 0; i < agree.choices.length; i++) {
	            var c = agree.choices[i];
	            row.push(React.createElement("div", { className: 'agreeCell agreeColHeader', id: c[0], onClick: this.handleChoiceClick }, c[2]));
	        }
	        var p = agreeControl.propsChoice;
	        row.push(React.createElement("div", { className: 'agreeCell agreeColHeader', id: '', onClick: this.handleChoiceClick },
	            React.createElement(IP.InputView, { bImg: p.bImg, bFocus: p.bFocus, bActive: p.bActive, valEdit: p.valEdit, val: p.val, done: p.done, update: p.update })));
	        rows.push(React.createElement("div", { className: 'tablerow' }, row));
	        // Row for each user
	        var users = agree.getUserList();
	        for (var j = 0; j < users.length; j++) {
	            var u = users[j];
	            row = [];
	            row.push(React.createElement("div", { className: 'agreeCell agreeRowHeader', id: u.id, onClick: this.handleUserClick }, u.name));
	            for (var k = 0; k < agree.choices.length; k++) {
	                var c = agree.choices[k];
	                var id = u.id + '/' + c[0];
	                var val = agree.selects[id] === undefined ? -1 : agree.selects[id];
	                var classString = 'agreeCell agreeMain';
	                switch (val) {
	                    case -1:
	                        classString += ' ShowOpen';
	                        break;
	                    case 0:
	                        classString += ' ShowNo';
	                        break;
	                    case 1:
	                        classString += ' ShowYes';
	                        break;
	                    case 2:
	                        classString += ' ShowMaybe';
	                        break;
	                    case 3:
	                        classString += ' ShowPicked';
	                        break;
	                }
	                row.push(React.createElement("div", { className: classString, id: id, onClick: this.handleSelectClick }, "\u00A0"));
	            }
	            row.push(React.createElement("div", { className: 'agreeCell agreeEmpty', id: '' }));
	            rows.push(React.createElement("div", { className: 'tablerow' }, row));
	        }
	        // Row for new user
	        p = agreeControl.propsUser;
	        row = [];
	        row.push(React.createElement("div", { className: 'agreeCell agreeRowHeader', id: '', onClick: this.handleUserClick },
	            React.createElement(IP.InputView, { bImg: p.bImg, bFocus: p.bFocus, bActive: p.bActive, valEdit: p.valEdit, val: p.val, done: p.done, update: p.update })));
	        for (var k = 0; k <= agree.choices.length; k++)
	            row.push(React.createElement("div", { className: 'agreeCell agreeEmpty' }));
	        rows.push(React.createElement("div", { className: 'tablerow' }, row));
	        // Full grid
	        return (React.createElement("div", { className: 'agreecontainer' },
	            React.createElement("div", { className: 'table' }, rows)));
	    };
	    return AgreeView;
	}(React.Component));
	exports.AgreeView = AgreeView;


/***/ }
/******/ ]);
//# sourceMappingURL=shareclient.bundle.js.map