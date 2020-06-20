var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User, Guest_Username } from "./User.js";
export class UserManager {
    constructor(system) {
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
    getUser(username, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (this.users.has(username)) {
                user = this.users.get(username);
            }
            else if ((_a = options.loadIfNotExists) !== null && _a !== void 0 ? _a : false) {
                user = yield this.createUser(username);
            }
            else {
                throw new Error("[UserManager] User is not logged in this system and cannot be retrieved!");
            }
            if (options.markAsLoggedIn) {
                if (!this.users.has(username)) {
                    this.users.set(username, user);
                }
            }
            if (options.bootUser) {
                yield user.boot();
            }
            return user;
        });
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
    getOrCreateGuestUser(refererIdentification) {
        // Prevent active guests to be deleted!
        this.renewGuestTimeout(refererIdentification);
        if (this.guests.has(refererIdentification)) {
            return this.guests.get(refererIdentification);
        }
        else {
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
    renewGuestTimeout(refererIdentification) {
        if (this.forgetGuestTimeout.has(refererIdentification)) {
            clearTimeout(this.forgetGuestTimeout.get(refererIdentification));
        }
        this.forgetGuestTimeout.set(refererIdentification, setTimeout(() => {
            this.guests.delete(refererIdentification);
        }, UserManager.FORGET_GUEST_TIMEOUT));
    }
    /**
     * Remove an user from the "logged in" pool
     * -----------------------------------------
     *
     * @param username
     */
    destroyUser(username) {
        if (this.users.has(username)) {
            const user = this.users.get(username);
            user.destroy(this.system);
            this.users.delete(username);
        }
        else {
            console.error(`[UserManager] WARN! User ${username} is not marked as logged in, ignoring destroy request!`);
        }
    }
    allLoggedInUsers() {
        return Array.from(this.users.values());
    }
    createUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User(this.system, username);
            return newUser.loaded();
        });
    }
}
UserManager.FORGET_GUEST_TIMEOUT = 1000 * 60 * 60 * 24 * 2;
//# sourceMappingURL=UserManager.js.map