import * as fs from 'fs';
import * as OT from '@terrencecrowley/ot-js';
import * as SM from './serversession';
import * as bcrypt from 'bcryptjs';

const StateVersion: number = 4.0;

export class User
{
	ns: string;
	id: string;
	token: string;
	name: string;
	email: string;
	hash: string;
	sessions: any;

	constructor(o?: any)
		{
			if (o != undefined)
				this.fromJSON(o);
			else
			{
				this.ns = '';
				this.id = '';
				this.token = '';
				this.name = '';
				this.email = '';
				this.hash = '';
				this.sessions = {};
			}
		}

	serializedID(): string
		{
			return this.ns + '/' + this.id;
		}

	validPassword(pw: string): boolean
		{
			return bcrypt.compareSync(pw, this.hash);
		}

	toJSON(): any
		{
			let o: any = { sid: this.serializedID(), token: this.token, name: this.name, email: this.email, sessions: this.sessions };
			if (this.hash)
				o.hash = this.hash;
			return o;
		}

	fromJSON(o: any): void
		{
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
		}

	toView(sm: SM.SessionManager): any
		{
			let o: any = { ns: this.ns, id: this.id, name: this.name, sessions: [] };
			let aS: any = o.sessions;
			for (var p in this.sessions)
				if (this.sessions.hasOwnProperty(p))
				{
					let s: SM.Session = sm.findSession(p);
					if (s)
						aS.push(s.toView());
				}

			return o;
		}
}

export class Users
{
	users: User[];
	private context: OT.IExecutionContext;
	private bDirty: boolean;
	private bSaving: boolean;

	// Constructor
	constructor(ctx: OT.IExecutionContext)
		{
			this.context = ctx;
			this.users = [];
			this.bDirty = false;
			this.bSaving = false;
			UserManager = this;
		}

	findByID(ns: string, id: string): User
		{
			for (let i: number = 0; i < this.users.length; i++)
				if (this.users[i].ns == ns && this.users[i].id == id)
					return this.users[i];
			return null;
		}

	findBySerializedID(sid: string): User
		{
			let i: number = sid.indexOf('/');
			if (i == -1)
				return this.findByID('', sid);
			let ns: string = sid.substr(0, i);
			let id: string = sid.substr(i+1);
			for (let i: number = 0; i < this.users.length; i++)
				if (this.users[i].ns == ns && this.users[i].id == id)
					return this.users[i];
			return null;
		}

	createUser(o: any): User
		{
			let u: User = new User(o);
			this.users.push(u);
			this.bDirty = true;
			return u;
		}

	toJSON(): any
		{
			let o: any = { version: StateVersion, users: [] };
			let aUsers: any[] = o.users;
			for (let i: number = 0; i < this.users.length; i++)
				aUsers.push(this.users[i].toJSON());
			return o;
		}

	fromJSON(o: any): void
		{
			if (o.version == StateVersion)
			{
				for (let i: number = 0; i < o.users.length; i++)
					this.users.push(new User(o.users[i]));
			}
			this.bDirty = false;
		}

	save(): void
		{
			try
			{
				if (this.bDirty && !this.bSaving)
				{
					let s: string = JSON.stringify(this);
					this.bSaving = true;
					fs.writeFile('state/users.json', s, (err) => {
							UserManager.bSaving = false;
							UserManager.bDirty = false;
							if (err) throw err;
						});
					this.context.log(0, "UserManager: state saved");
				}
			}
			catch (err)
			{
				this.context.log(0, "UserManager: save state failed: " + err);
			}
		}

	load(): void
		{
			try
			{
				let s: string = fs.readFileSync('state/users.json', 'utf8');
				let o: any = JSON.parse(s);
				if (o.version == StateVersion)
					this.fromJSON(o);
				this.bDirty = false;
			}
			catch (err)
			{
				this.context.log(0, "UserManager: load state failed: " + err);
			}
		}
}

let UserManager: Users;
