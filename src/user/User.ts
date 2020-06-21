import { System } from "../System.js";
import { AuriaRow } from "../database/resources/default/AuriaRow.js";
import { UserAuthentication } from "./auth/UserAuthentication.js";
import { Bootable } from "../boot/Bootable.js";
import { ResourceCatalog } from "../database/resources/ResourceCatalog.js";
import { IUserInfo } from "../database/rowData/IUserInfo.js";
import { EventEmitter } from "events";
import { IUser } from "../database/rowData/IUser.js";
import { UserRoleRepository } from "./role/UserRoleRepository.js";
import { UserDataRepository } from './data/UserDataRepository.js';

export class User extends EventEmitter implements Bootable {


    /**
     * Loaded Promise
     * --------------
     * 
     * Since the user can be instantiated only using its username
     * 
     */
    protected _loadedPromise!: Promise<User>;

    /**
     * User Authentication
     * --------------------
     * 
     * Object responsible for managing 'access' authentication
     * Auria uses Access Token with an expire of 5 minutes and a Refresh Token 
     * that expires in 7 days, each time a new "login" method is called the old 
     * RefreshToken becomes invalid, even if it's not expired!
     * 
     */
    protected _auth: UserAuthentication;


    /**
     * System
     * -------
     * 
     * The system this user is logged in to
     */
    private system: System;

    /**
     * Username
     * ---------
     * Holds the user username
     */
    private _username: string;

    /**
     * Interface
     * ---------
     * Holds the interface this user can access
     */
    protected interface: any;

    protected rolesRepo!: UserRoleRepository;

    /**
     * Privilege
     * ----------
     * 
     * Rank the user with a privilege score, used mainly to modify system 
     * configurations/setting
     */
    private _privilege: number = UserPrivilege.NORMAL;

    /**
     * User Row
     * --------
     * 
     * Easy way to modify this user information
     */
    private userRow!: AuriaRow<IUser>;

    private _booted!: Promise<User>;

    private _data : UserDataRepository;

    public get privilege(): number {
        return this._privilege;
    }

    public get username(): string {
        return this._username;
    }

    public auth(): UserAuthentication {
        return this._auth;
    }

    protected info!: AuriaRow<IUserInfo>;


    constructor(system: System, username: string) {
        super();

        this.system = system;
        this._username = username;
        this._auth = new UserAuthentication(this);
        this._data = new UserDataRepository(this, this.system);

        // @todo CLEAN THIS
        this._privilege = username == "nich" ? UserPrivilege.OWNER : UserPrivilege.GUEST;

        if (this.username !== Guest_Username) {

            this._loadedPromise = system
                .resourceManager()
                .getResource(ResourceCatalog.User.name)
                .createRow<IUser>(username, "username")
                .then((userRow) => {
                    this.userRow = userRow;
                    this._privilege = userRow.get("user_privilege");
                    return this;
                });

            this._loadedPromise
                .catch((err) => {
                    console.error("[User] ERROR! Failed to load user! Error while trying to retrieve its information on the database!", err);
                });
        } else {
            // Rejected promise if GUEST
            this._loadedPromise = new Promise((resolve, reject) => {
                console.log("[GuestUser] Guests users don't have access to these info!");
                reject();
            });
            this._booted = new Promise((resolve, reject) => {
                console.log("[GuestUser] Guests don't have access to roles and auth!");
            });
            this._privilege = UserPrivilege.GUEST;
        }
    }

    public async roles(): Promise<UserRoleRepository> {
        const boot = this.boot();
        boot.catch((err) => {
            console.error("Failed to access roles!", err);
            throw err;
        });
        return boot.then(_ => this.rolesRepo);
    }

    public loaded(): Promise<User> {
        return this._loadedPromise;
    }

    public async getId(): Promise<string> {
        const loaded = this.loaded();
        loaded.catch((err) => {
            console.error("Failed to get user ID!", err);
            throw err;
        });
        return loaded.then(_ => this.info.get("_id"));
    }

    public async getUserInfo(): Promise<AuriaRow<IUserInfo>> {
        const loaded = this.loaded();
        loaded.catch((err) => {
            console.error("Failed to get user info!", err);
            throw err;
        });
        return loaded.then(_ => this.info);
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootableName(): string {
        return `BootOfUser[${this.username}]`;
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return async () => {
            // Wait for User Row to load
            await this.loaded();

            // TODO boot user routine
            this.info = await this.system
                .resourceManager()
                .getResource(ResourceCatalog.UserInfo.name)
                .createRow<IUserInfo>(this.userRow.get("_id"), "user_id");

            this.rolesRepo = new UserRoleRepository(this.system, this);
            await this.rolesRepo.build();

            return true;
        };
    }

    public isGuest(): boolean {
        return this.username === Guest_Username;
    }

    /**
     * Boot
     * ------
     * Load all the information of this user that is only avaliable on the database
     */
    public async boot(): Promise<User> {
        if (this._booted == null) {
            this._booted = Promise.resolve()
                .then(async _ => {
                    let bootFn = this.getBootFunction();
                    const bootAns = bootFn();
                    if (bootAns instanceof Promise) {
                        await bootAns;
                    }
                    this.emit(UserEvents.BOOTED, this);
                    return this;
                });
        }
        return this._booted;
    }

    /**
     * Protected Destroy
     * ------------------
     * Destroy all of this object properties when the code calling it have access to the system that
     * created this user! Prevents ApiEndpoints mistankelly erasing this user as a logged user!
     * 
     * @param system The system that created this user!
     */
    public destroy(system: System) {
        if (system === this.system) {

            // Warn about user destruction
            this.emit(UserEvents.DESTROY);
            this.removeAllListeners();
            delete this.system;
            delete this.userRow;
            delete this._auth;
            delete this._booted;
            delete this._loadedPromise;
            delete this.interface;
        } else {
            console.error("[User] System mismatch! The provided system does not match the creator of this user!");
            return this;
        }
    }
}

export const Guest_Username = "auria-guest";

export enum UserPrivilege {
    "GUEST" = 1,
    "NORMAL" = 2,
    "ADMINISTRATOR" = 5,
    "MASTER" = 10,
    "DEV" = 100,
    "OWNER" = 999
}

export enum UserEvents {
    LOADED = "loaded",
    BOOTED = "booted",
    DESTROY = "destroy",
}
