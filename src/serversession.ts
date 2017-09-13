import * as OT from '@terrencecrowley/ot-js';
import * as fs from 'fs';
import * as UM from "./users";
import * as Util from "./util";

const StateVersion: number = 6.0;
const ClientIDForServer: string = '-Server-';

const clientQuiescentTimeout: number = process.env.CLIENT_QUIESCENT_TIMEOUT || 20000; // 20 seconds
const sessionQuiescentTimeout: number = process.env.SESSION_QUIESCENT_TIMEOUT || 6000000; // 100 minutes
const clientMaxCount: number = process.env.CLIENT_MAX_COUNT || 50;
const maxEditLogSize: number = process.env.MAX_EDIT_LOG_SIZE || 500;

export class ServerContext implements OT.IExecutionContext
{
	verbosity: number;

	constructor()
		{
			this.verbosity = process.env.VERBOSITY || 0;
		}

	flagIsSet(flag: string): boolean
		{
			return false;
		}

	flagValue(flag: string): number
		{
			return 0;
		}

	log(verbose: number, s: string): void
		{
			if (verbose <= this.verbosity)
				console.log(s);	
		}
}

export class Client
{
	clientID: string;
	user: UM.User;
	private bDead: boolean;
	private context: ServerContext;
	private lastActive: Date;
	private longPollResponse: any;
	private longPollResponseBody: any;

	// constructor
	constructor(ctx: ServerContext, sid: string, cid: string, u: any)
		{
			this.user = u as UM.User;
			this.user.sessions[sid] = this.users.sessions[sid] + 1;
			this.bDead = false;
			this.clientID = cid;
			this.context = ctx;
			this.lastActive = new Date();
			this.longPollResponse = null;
			this.longPollResponseBody = null;
		}

	
	isZombie(fromDate?: Date, timeout?: number): boolean
		{
			if (this.bDead) return true;

			if (fromDate === undefined) fromDate = new Date();
			if (timeout === undefined) timeout = clientQuiescentTimeout;

			return ((fromDate.getTime() - this.lastActive.getTime()) > timeout);
		}

	markAlive(): Client
		{
			this.lastActive = new Date();
			return this;
		}

	markDead(sid: string): void
		{
			this.bDead = true;
			this.user.sessions[sid] = this.users.sessions[sid] - 1;
			if (this.users.sessions[sid] == 0)
				delete this.user.sessions[sid];
		}

	parkResponse(res: any, body: any): void
		{
			this.longPollResponse = res;
			this.longPollResponseBody = body;
		}

	unparkResponse(): void
		{
			if (this.longPollResponse)
			{
				this.context.log(2, "unparkResponse for client: " + String(this.clientID));
				this.longPollResponse.json(this.longPollResponseBody);
				this.longPollResponse = null;
				this.longPollResponseBody = null;
			}
		}
}

export class Session
{
	sessionID: string;
	serverEngine: OT.OTServerEngine;
	clients: Client[];
	private context: ServerContext;
	private lastActive: Date;
	private clientSequenceNo: number;
	// stats
	private statMaxClients: number;
	private statRequestCount: number;

	// Constructor
	constructor(ctx: ServerContext, sessionType: string)
		{
			this.context = ctx;
			this.sessionID = Util.createGuid();
			this.serverEngine = new OT.OTServerEngine(ctx, this.sessionID);
			this.clients = [];
			this.lastActive = new Date();
			this.clientSequenceNo = 0;
			this.statMaxClients = 0;
			this.statRequestCount = 0;
			this.context.log(0, "session(" + this.sessionID + "): created.");

			// Set sessionType (empty when creating from stored data set with existing meta resource)
			if (sessionType)
			{
				let cedit: OT.OTCompositeResource = new OT.OTCompositeResource(this.sessionID, ClientIDForServer);
				let medit: OT.OTMapResource = new OT.OTMapResource('WellKnownName_meta');
				cedit.edits.push(medit);
				cedit.clock = this.serverEngine.serverClock();
				medit.edits.push([ OT.OpMapSet, 'type', sessionType ]);
				cedit.clientSequenceNo = this.clientSequenceNo++;
				this.serverEngine.addServer(cedit);
			}
		}

	isZombie(fromDate?: Date, timeout?: number): boolean
		{
			if (fromDate === undefined) fromDate = new Date();
			if (timeout === undefined) timeout = sessionQuiescentTimeout;
			return (this.clients.length == 0) && ((fromDate.getTime() - this.lastActive.getTime()) > timeout);
		}

	unparkClients(): void
		{
			for (let i: number = 0; i < this.clients.length; i++)
				this.clients[i].unparkResponse();
		}

	getUserList(): any
		{
			let val: any = this.serverEngine.toValue();
			val = val ? val['WellKnownName_users'] : val;
			if (val == null) val = { };
			return val;
		}

	getUserName(client: Client): any
		{
			let val: any = this.getUserList();
			return val[client.clientID];
		}

	updateUserList(): void
		{
			let now: Date = new Date();
			let val: any = this.getUserList();
			let cedit: OT.OTCompositeResource = new OT.OTCompositeResource(this.sessionID, ClientIDForServer);
			let medit: OT.OTMapResource = new OT.OTMapResource('WellKnownName_users');
			cedit.edits.push(medit);
			cedit.clock = this.serverEngine.serverClock();
			for (let i: number = this.clients.length-1; i >= 0; i--) // backwards since may be deleting
			{
				let c: Client = this.clients[i];
				if (c.isZombie(now))
				{
					if (val[c.clientID] !== undefined)
						medit.edits.push([ OT.OpMapDel, c.clientID, '' ]);
					this.context.log(0, "session(" + this.sessionID + "): removing zombie client(" + c.clientID + ")");
					this.clients.splice(i, 1);
				}
				else
					if (val[c.clientID] === undefined)
						medit.edits.push([ OT.OpMapSet, c.clientID, c.user.name ]);
			}
			if (! medit.isEmpty())
			{
				cedit.clientSequenceNo = this.clientSequenceNo++;
				this.serverEngine.addServer(cedit);
			}
		}

	compress(): void
		{
			// Would probably make more sense to make how we compress dynamic based on how clients are behaving.
			// Also, a better approach would be to just keep composed variants along size the main array and
			// then more slowly age out the finer grained log entries. But just do this for now so the log
			// doesn't grow without bound.
			if (this.serverEngine.logServer.length > maxEditLogSize)
			{
				// Just compress first 20%
				let nCompress: number = Math.floor(maxEditLogSize / 5);
				let cedit: OT.OTCompositeResource = this.serverEngine.logServer[0];
				for (let i: number = 1; i < nCompress; i++)
					cedit.compose(this.serverEngine.logServer[i]);
				this.serverEngine.logServer.splice(1, nCompress-1);
				this.context.log(0, "session(" + this.sessionID + "): compressing log.");
			}
		}

	// Leave
	leaveSession(req: any, res: any): void
		{
			let responseBody: any = { result: 0 };
			if (req.user == null)
			{
				responseBody.result = 1;
				responseBody.message = "No valid user.";
			}
			else if (req.body.clientID == null)
			{
				responseBody.result = 1;
				responseBody.message = "No valid client.";
			}
			else
			{
				let clientID: any = req.body.clientID;
				this.findClient(clientID, req.user).markDead(this.sessionID);
				this.updateUserList();

				responseBody.user = req.user.toView(theManager);
			}
			res.json(responseBody);
		}

	// Connect
	connectSession(req: any, res: any): void
		{
			this.lastActive = new Date();
			this.statRequestCount++;
			let responseBody: any;
			if (this.clients.length >= clientMaxCount)
			{
				responseBody = { "result": 2, "message": 'Too many clients.' };
			}
			else
			{
				let clientID: any = req.body.clientID ? req.body.clientID : Util.createGuid();
				let client: Client = this.findClient(clientID, req.user).markAlive();
				this.context.log(0, "session(" + this.sessionID + "): creating client(" + client.clientID + ")");
				responseBody = { result: 0, clientID: client.clientID, view: this.toView() };
			}
			this.context.log(1, "connectSession: " + JSON.stringify(responseBody));
			res.json(responseBody);
			this.updateUserList();
		}

	private nakedEditList(nextclock: number): any
		{
			let a: OT.OTCompositeResource[];
			if (nextclock === 0)
				a = this.serverEngine.logServer;
			else
			{
				let nLog: number = this.serverEngine.logServer.length;
				let i: number;
				if (nLog == 0)
					return [];
				for (i = nLog-1; i >= 0; i--)
					if (this.serverEngine.logServer[i].clock == nextclock)
						break;
					else if (this.serverEngine.logServer[i].clock < nextclock)
					{
						// FIX: really should fail this request if I requested a nextclock that was compressed out.
						// Really the only valid case this clause is catching is the end of the array case.
						i++;
						break;
					}
				if (i === -1)
					return [];
				a = this.serverEngine.logServer.slice(i);
			}
			let retA: any[] = [];
			for (let i: number = 0; i < a.length; i++)
				retA.push(a[i].toJSON());
			return retA;
		}

	// Client Event
		// IN: { clientID: id, Edit: OT.OTCompositeResource }
		// OUT: { result: 0, EditList:[ OT.OTCompositeResource ] }
	sendEvent(req: any, res: any, body: any): void
		{
			this.lastActive = new Date();
			this.statRequestCount++;
			this.unparkClients();
			let edit: OT.OTCompositeResource = OT.OTCompositeResource.constructFromObject(body["Edit"]);
			let client: Client = this.findClient(body["clientID"], req.user).markAlive();
			let responseBody: any = null;
			let nResult: number = this.serverEngine.addServer(edit);
			if (nResult === OT.clockSuccess)
			{
				// Drain any unsent actions (including this one)
				responseBody = { result: 0,
								 clientID: client.clientID,
								 view: this.toView(),
								 EditList: this.nakedEditList(edit.clock + 1)
								 };
			}
			else
			{
				// Clock unavailable
				responseBody = { result: nResult, "message": "sendEvent: failure: " + nResult };
			}
			this.context.log(1, "sendEvent: " + JSON.stringify(responseBody));
			res.json(responseBody);
		}

	// Receive Event
		// IN: { clientID: id, NextClock: number }
		// OUT: { "result": 0, "EditList": [ OT.OTCompositeResource ] }
	receiveEvent(req: any, res: any, body: any): void
		{
			this.lastActive = new Date();
			this.statRequestCount++;
			let client: Client = this.findClient(body["clientID"], req.user).markAlive();
			let nextClock: number = Number(body["NextClock"]);
			let responseBody: any = null;
			if (nextClock === NaN)
			{
				responseBody = { result: 1, "message": "receiveEvent: invalid clock: " + body["NextClock"] };
			}
			else
			{
				// Send any unsent edits
				responseBody = { result: 0,
							     clientID: client.clientID,
								 view: this.toView(),
								 EditList: this.nakedEditList(nextClock) };
				if (responseBody.EditList.length == 0)
				{
					client.parkResponse(res, responseBody);
					return;
				}
			}
			this.context.log(1, "receiveEvent: " + JSON.stringify(responseBody));
			res.json(responseBody);
		}

	logStats(): void
		{
			this.context.log(0, "session(" + this.sessionID + "): terminating.");
			this.context.log(0, "session(" + this.sessionID + "): MaxClients(" + String(this.statMaxClients) + ")");
			this.context.log(0, "session(" + this.sessionID + "): Requests(" + String(this.statRequestCount) + ")");
		}

	// Helpers
	findClient(cid: string, user: any): Client
		{
			for (let i: number = 0; i < this.clients.length; i++)
			{
				let c: Client = this.clients[i];

				if (c.clientID === cid)
					return c;
			}

			// Create on the fly - may be creating new or recreating a zombie client we've edited out
			this.context.log(0, "session(" + this.sessionID + "): constructing client(" + cid + ")");
			let c: Client = new Client(this.context, this.sessionID, cid, user);
			this.clients.push(c);
			if (this.clients.length > this.statMaxClients) this.statMaxClients = this.clients.length;
			return c;
		}

	toView(): any
		{
			let o: any =
				{
					sessionID: this.sessionID,
					sessionName: this.serverEngine.getName(),
					sessionType: this.serverEngine.getType(),
					lastActive: this.lastActive.toJSON(),
					clientCount: this.clients.length,
					maxClients: this.statMaxClients,
					requestCount: this.statRequestCount
				};
			return o;
		}

	toJSON(): any
		{
			return { 
				sessionID: this.sessionID,
				lastActive: this.lastActive.toJSON(),
				maxClients: this.statMaxClients,
				engine: this.serverEngine.toJSON()
				};
		}

	fromJSON(o: any): void
		{
			this.sessionID = o.sessionID;
			this.lastActive = new Date(o.lastActive);
			this.statMaxClients = o.statMaxClients;
			this.serverEngine.loadFromObject(o.engine);
		}
}

export class SessionManager
{
	private _users: UM.Users;
	private context: ServerContext;
	private sessions: Session[];
	private sessionMap: any;
	private bTimerSet: boolean;
	private bDirty: boolean;
	private bSaving: boolean;
	private nHouseKeeping: number;

	// constructor
	constructor(ctx: ServerContext)
		{
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

	// User management
	get users(): UM.Users
		{
			return this._users;
		}

	// List Session
		// OUT: { "result": 0, "sessions": [ { "session_id": string}* ] }
	listSessions(req: any, res: any): void
		{
			let responseBody: any = { "result": 0 };
			let aSession: Array<any> = [];
			for (let i = 0; i < this.sessions.length; i++)
				aSession.push({ "session_id": this.sessions[i].sessionID });
			responseBody["sessions"] = aSession;
			this.context.log(1, "listSessions: " + JSON.stringify(responseBody));
			res.json(responseBody);
			this.setHousekeepingTimer();
		}

	// User View
		// OUT: { result: 0, user: { user info } }
	userView(req: any, res: any): void
		{
			let responseBody: any = { result: 0 };
			if (req.user == null)
			{
				responseBody.result = 1;
				responseBody.message = "No valid user.";
			}
			else
				responseBody.user = req.user.toView(this);
			res.json(responseBody);
			this.setHousekeepingTimer();
		}

	// Create
		// IN: { sessionType: string }
		// OUT: { result: 0, session_id: string }
	createSession(req: any, res: any, body: any): void
		{
			let session: Session = new Session(this.context, body.sessionType);
			this.sessions.push(session);
			this.sessionMap[session.sessionID] = session;
			let responseBody: any = { result: 0, view: session.toView() };
			this.context.log(1, "createSession: " + JSON.stringify(responseBody));
			res.json(responseBody);
			this.bDirty = true;
			this.setHousekeepingTimer();
		}

	// Connect
		// OUT: { result: [0,1], message: "failure message", clientID: cid, session: { session_info } }
	connectSession(req: any, res: any, session_id: string): void
		{
			let session: Session = this.findSession(session_id);
			if (session)
			{
				session.connectSession(req, res);
				this.bDirty = true;
			}
			else
			{
				let responseBody: any = { "result": 1, "message": "connectSession: no such session: " + session_id };
				this.context.log(1, "connectSession: " + JSON.stringify(responseBody));
				res.json(responseBody);
			}
			this.setHousekeepingTimer();
		}

	// Leave
		// OUT: { result: [0,1], message: "failure message", user: { user info } }
	leaveSession(req: any, res: any, session_id: string): void
		{
			let session: Session = this.findSession(session_id);
			if (session)
			{
				session.leaveSession(req, res);
				this.bDirty = true;
			}
			else
			{
				let responseBody: any = { "result": 1, "message": "leaveSession: no such session: " + session_id };
				this.context.log(1, "leaveSession: " + JSON.stringify(responseBody));
				res.json(responseBody);
			}
			this.setHousekeepingTimer();
		}

	// Send Event
		// IN: { clientID: id, Edit: OT.OTCompositeResource }
		// OUT: { result: 0, EditList:[ OT.OTCompositeResource ] }
	sendEvent(req: any, res: any, session_id: string, body: any): void
		{
			let session: Session = this.findSession(session_id);
			if (session)
			{
				session.sendEvent(req, res, body);
				this.bDirty = true;
			}
			else
			{
				let responseBody: any = { result: 1, "message": "sendEvent: no such session: " + session_id };
				this.context.log(1, "sendEvent: " + JSON.stringify(responseBody));
				res.json(responseBody);
			}
			this.setHousekeepingTimer();
		}

	// Receive Event
		// IN: { clientID: id, NextClock: number }
		// OUT: { "result": 0 "EditList": [ OT.OTCompositeResource ] }
	receiveEvent(req: any, res: any, session_id: string, body: any): void
		{
			let session: Session = this.findSession(session_id);
			if (session)
				session.receiveEvent(req, res, body);
			else
			{
				let responseBody: any = { "result": 1, "message": "receiveEvent: no such session: " + session_id };
				this.context.log(1, "receiveEvent: " + JSON.stringify(responseBody));
				res.json(responseBody);
			}
			this.setHousekeepingTimer();
		}

	// Helpers
	findSession(session_id: string): Session
		{
			let session: Session = this.sessionMap[session_id];
			return session ? session : null;
		}

	// housekeeping Timer
	housekeepingOnTimer(): void
		{
			this.nHouseKeeping++;

			let now: Date = new Date();
			this.bTimerSet = false;

			// Get rid of quiescent clients
			for (let i: number = this.sessions.length-1; i >= 0; i--) // backwards so deleting simplified
			{
				let session: Session = this.sessions[i];

				// Unpark any parked long-poll clients
				session.unparkClients();

				// Update user list
				session.updateUserList();

				// Compress session log
				session.compress();

				// Delete if necessary
				if (session.isZombie(now))
				{
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
		}

	// Set timer for housekeeping
	setHousekeepingTimer(): void
		{
			theManager = this;

			if (!this.bTimerSet && this.sessions.length > 0)
			{
				if (this.sessions.length > 0)
				{
					this.bTimerSet = true;
					setTimeout(function () { theManager.housekeepingOnTimer(); }, 5000);
				}
				else
					this.save();
			}
		}

	toJSON(): any
		{
			let o: any = { version: StateVersion, sessions: { } };
			let oSessions: any = o.sessions;

			for (let i: number = 0; i < this.sessions.length; i++)
			{
				let session: Session = this.sessions[i];

				oSessions[session.sessionID] = session.toJSON();
			}
			return o;
		}

	fromJSON(o: any): void
		{
			// Ignore unknown versions
			let version: number = o['version'];
			if (version === undefined || version != StateVersion)
				return;

			// Load sessions
			o = o['sessions'];
			if (o === undefined)
				return;

			for (var p in o)
				if (o.hasOwnProperty(p))
				{
					let session: Session = new Session(this.context, null);
					//session.sessionID = p;
					session.fromJSON(o[p]);
					this.sessions.push(session);
					this.sessionMap[session.sessionID] = session;
				}
		}

	save(): void
		{
			try
			{
				this.users.save();

				if (this.bDirty && !this.bSaving)
				{
					let s: string = JSON.stringify(this);
					this.bSaving = true;
					fs.writeFile('state/state.json', s, (err) => {
							theManager.bSaving = false;
							theManager.bDirty = false;
							if (err) throw err;
						});
					this.context.log(0, "SessionManager: state saved");
				}
			}
			catch (err)
			{
				this.context.log(0, "SessionManager: save state failed: " + err);
			}
		}

	load(): void
		{
			try
			{
				let s: string = fs.readFileSync('state/state.json', 'utf8');
				let o: any = JSON.parse(s);
				this.fromJSON(o);
				this.bDirty = false;
			}
			catch (err)
			{
				this.context.log(0, "SessionManager: load state failed: " + err);
			}
		}
}

let theManager: SessionManager;
