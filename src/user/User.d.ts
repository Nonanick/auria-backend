/// <reference types="node" />
import { System } from "../System.js";
import { AuriaRow } from "../database/resources/default/AuriaRow.js";
import { UserAuthentication } from "./auth/UserAuthentication.js";
import { Bootable } from "../boot/Bootable.js";
import { IUserInfo } from "../database/rowData/IUserInfo.js";
import { EventEmitter } from "events";
import { UserRoleRepository } from "./role/UserRoleRepository.js";
export declare class User extends EventEmitter implements Bootable {
    /**
     * Loaded Promise
     * --------------
     *
     * Since the user can be instantiated only using its username
     *
     */
    protected _loadedPromise: Promise<User>;
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
    private system;
    /**
     * Username
     * ---------
     * Holds the user username
     */
    private _username;
    /**
     * Interface
     * ---------
     * Holds the interface this user can access
     */
    protected interface: any;
    protected rolesRepo: UserRoleRepository;
    /**
     * Privilege
     * ----------
     *
     * Rank the user with a privilege score, used mainly to modify system
     * configurations/setting
     */
    private _privilege;
    /**
     * User Row
     * --------
     *
     * Easy way to modify this user information
     */
    private userRow;
    private _booted;
    get privilege(): number;
    get username(): string;
    auth(): UserAuthentication;
    protected info: AuriaRow<IUserInfo>;
    constructor(system: System, username: string);
    roles(): Promise<UserRoleRepository>;
    loaded(): Promise<User>;
    getId(): Promise<string>;
    getUserInfo(): Promise<AuriaRow<IUserInfo>>;
    getBootDependencies(): string[];
    getBootableName(): string;
    getBootFunction(): () => boolean | Promise<boolean>;
    isGuest(): boolean;
    /**
     * Boot
     * ------
     * Load all the information of this user that is only avaliable on the database
     */
    boot(): Promise<User>;
    /**
     * Protected Destroy
     * ------------------
     * Destroy all of this object properties when the code calling it have access to the system that
     * created this user! Prevents ApiEndpoints mistankelly erasing this user as a logged user!
     *
     * @param system The system that created this user!
     */
    destroy(system: System): this | undefined;
}
export declare const Guest_Username = "auria-guest";
export declare enum UserPrivilege {
    "GUEST" = 1,
    "NORMAL" = 2,
    "ADMINISTRATOR" = 5,
    "MASTER" = 10,
    "DEV" = 100,
    "OWNER" = 999
}
export declare enum UserEvents {
    LOADED = "loaded",
    BOOTED = "booted",
    DESTROY = "destroy"
}
