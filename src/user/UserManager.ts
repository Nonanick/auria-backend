import { System } from "../System.js";
import { User, Guest_Username } from "./User.js";

export class UserManager {


    protected static FORGET_GUEST_TIMEOUT = 1000 * 60 * 60 * 24 * 2;

    private system: System;

    /**
     * Users
     * ------
     * All users that recently request a login method
     * and are now considered "logged in" on the s
     */
    private users: Map<string, User>;

    /**
     * Guests
     * -------
     * Map that hold all "Guests" that recently used the api
     */
    private guests: Map<string, User>;

    /**
     * Forget Guest Timeout
     * ---------------------
     * Guest are erased after not using in the API for "FORGET_GUEST_TIMEOUT" (in miliseconds)
     * 
     */
    private forgetGuestTimeout: Map<string, NodeJS.Timeout>;

    constructor(system: System) {
        this.system = system;

        this.users = new Map();
        this.guests = new Map();
        this.forgetGuestTimeout = new Map();
    }

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
    public async getUser(username: string, options: GetUserOptions) {
        let user: User;

        if (this.users.has(username)) {
            user = this.users.get(username)!;
        } else if (options.loadIfNotExists ?? false) {
            user = await this.createUser(username);
        } else {
            throw new Error("[UserManager] User is not logged in this system and cannot be retrieved!");
        }

        if (options.markAsLoggedIn) {
            if (!this.users.has(username)) {
                this.users.set(username, user);
            }
        }

        if (options.bootUser) {
            await user.boot();
        }

        return user;
    }

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
    public getOrCreateGuestUser(refererIdentification: string): User {

        // Prevent active guests to be deleted!
        this.renewGuestTimeout(refererIdentification);

        if (this.guests.has(refererIdentification)) {
            return this.guests.get(refererIdentification)!;
        } else {
            const user = new User(this.system, Guest_Username);
            this.guests.set(refererIdentification, user);
            return user;
        }
    }

    /**
     * Renew Guest "Timeout"
     * ---------------------
     * 
     * @param refererIdentification 
     */
    protected renewGuestTimeout(refererIdentification: string) {
        if (this.forgetGuestTimeout.has(refererIdentification)) {
            clearTimeout(this.forgetGuestTimeout.get(refererIdentification)!);
        }
        this.forgetGuestTimeout.set(
            refererIdentification,
            setTimeout(() => {
                this.guests.delete(refererIdentification);
            }, UserManager.FORGET_GUEST_TIMEOUT)
        );
    }

    /**
     * Remove an user from the "logged in" pool
     * -----------------------------------------
     * 
     * @param username 
     */
    public destroyUser(username: string) {
        if (this.users.has(username)) {
            const user = this.users.get(username)!;
            user.destroy(this.system);
            this.users.delete(username);
        } else {
            console.error(`[UserManager] WARN! User ${username} is not marked as logged in, ignoring destroy request!`);
        }
    }

    public allLoggedInUsers(): User[] {
        return Array.from(this.users.values());
    }

    protected async createUser(username: string): Promise<User> {
        const newUser = new User(this.system, username);
        return newUser.loaded();
    }

}

export interface GetUserOptions {
    loadIfNotExists?: boolean;
    markAsLoggedIn?: boolean;
    bootUser?: boolean;
}