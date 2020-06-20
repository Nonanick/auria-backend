import { System } from "../System.js";
import { User } from "./User.js";
export declare class UserManager {
    protected static FORGET_GUEST_TIMEOUT: number;
    private system;
    /**
     * Users
     * ------
     * All users that recently request a login method
     * and are now considered "logged in" on the s
     */
    private users;
    /**
     * Guests
     * -------
     * Map that hold all "Guests" that recently used the api
     */
    private guests;
    /**
     * Forget Guest Timeout
     * ---------------------
     * Guest are erased after not using in the API for "FORGET_GUEST_TIMEOUT" (in miliseconds)
     *
     */
    private forgetGuestTimeout;
    constructor(system: System);
    /**
     * Return a System User
     * ---------------------
     * Will try to fetch a user form the system
     * When getUser is called this behaviour is used as default
     *
     * > º Load If Not Exists: Will try to fetch the user from the database
     * > @default false
     *
     * > º Mark as Logged In: Will assign the retrieved user as logged in, and therefore, able to perform request authentications
     * > @default false
     *
     * > º Boot User: If the boot routine should be called on the user, if true the functino will wait until the end of the boot routine
     * > before returning the user
     * > @default false
     *
     * @param username the unique identifier 'username'
     * @param options Set of options for 'getUser'
     */
    getUser(username: string, options: GetUserOptions): Promise<User>;
    /**
     * GET | CREATE Guest User
     * ------------------------
     * Using the referer as the identifier  this function will either:
     *
     * A) Get a guest user that has been created, using the referer as the identifier and if it does not exists (B)
     * B) Create a guest user and store it identifying it by it's "refererIdentification"
     *
     * @param refererIdentification
     */
    getOrCreateGuestUser(refererIdentification: string): User;
    /**
     * Renew Guest "Timeout"
     * ---------------------
     *
     * @param refererIdentification
     */
    protected renewGuestTimeout(refererIdentification: string): void;
    /**
     * Remove an user from the "logged in" pool
     * -----------------------------------------
     *
     * @param username
     */
    destroyUser(username: string): void;
    allLoggedInUsers(): User[];
    protected createUser(username: string): Promise<User>;
}
export interface GetUserOptions {
    loadIfNotExists?: boolean;
    markAsLoggedIn?: boolean;
    bootUser?: boolean;
}
