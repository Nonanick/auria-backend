var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserAuthentication } from "./auth/UserAuthentication.js";
import { ResourceCatalog } from "../database/resources/ResourceCatalog.js";
import { EventEmitter } from "events";
import { UserRoleRepository } from "./role/UserRoleRepository.js";
export class User extends EventEmitter {
    constructor(system, username) {
        super();
        /**
         * Privilege
         * ----------
         *
         * Rank the user with a privilege score, used mainly to modify system
         * configurations/setting
         */
        this._privilege = UserPrivilege.NORMAL;
        this.system = system;
        this._username = username;
        this._auth = new UserAuthentication(this);
        // @todo CLEAN THIS
        this._privilege = username == "nich" ? UserPrivilege.OWNER : UserPrivilege.GUEST;
        if (this.username !== Guest_Username) {
            this._loadedPromise = system
                .resourceManager()
                .getResource(ResourceCatalog.User.name)
                .createRow(username, "username")
                .then((userRow) => {
                this.userRow = userRow;
                this._privilege = userRow.get("user_privilege");
                return this;
            });
            this._loadedPromise
                .catch((err) => {
                console.error("[User] ERROR! Failed to load user! Error while trying to retrieve its information on the database!", err);
            });
        }
        else {
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
    get privilege() {
        return this._privilege;
    }
    get username() {
        return this._username;
    }
    auth() {
        return this._auth;
    }
    roles() {
        return __awaiter(this, void 0, void 0, function* () {
            const boot = this.boot();
            boot.catch((err) => {
                console.error("Failed to access roles!", err);
                throw err;
            });
            return boot.then(_ => this.rolesRepo);
        });
    }
    loaded() {
        return this._loadedPromise;
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            const loaded = this.loaded();
            loaded.catch((err) => {
                console.error("Failed to get user ID!", err);
                throw err;
            });
            return loaded.then(_ => this.info.get("_id"));
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const loaded = this.loaded();
            loaded.catch((err) => {
                console.error("Failed to get user info!", err);
                throw err;
            });
            return loaded.then(_ => this.info);
        });
    }
    getBootDependencies() {
        return [];
    }
    getBootableName() {
        return `BootOfUser[${this.username}]`;
    }
    getBootFunction() {
        return () => __awaiter(this, void 0, void 0, function* () {
            // Wait for User Row to load
            yield this.loaded();
            // TODO boot user routine
            this.info = yield this.system
                .resourceManager()
                .getResource(ResourceCatalog.UserInfo.name)
                .createRow(this.userRow.get("_id"), "user_id");
            this.rolesRepo = new UserRoleRepository(this.system, this);
            yield this.rolesRepo.build();
            return true;
        });
    }
    isGuest() {
        return this.username === Guest_Username;
    }
    /**
     * Boot
     * ------
     * Load all the information of this user that is only avaliable on the database
     */
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._booted == null) {
                this._booted = Promise.resolve()
                    .then((_) => __awaiter(this, void 0, void 0, function* () {
                    let bootFn = this.getBootFunction();
                    const bootAns = bootFn();
                    if (bootAns instanceof Promise) {
                        yield bootAns;
                    }
                    this.emit(UserEvents.BOOTED, this);
                    return this;
                }));
            }
            return this._booted;
        });
    }
    /**
     * Protected Destroy
     * ------------------
     * Destroy all of this object properties when the code calling it have access to the system that
     * created this user! Prevents ApiEndpoints mistankelly erasing this user as a logged user!
     *
     * @param system The system that created this user!
     */
    destroy(system) {
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
        }
        else {
            console.error("[User] System mismatch! The provided system does not match the creator of this user!");
            return this;
        }
    }
}
export const Guest_Username = "auria-guest";
export var UserPrivilege;
(function (UserPrivilege) {
    UserPrivilege[UserPrivilege["GUEST"] = 1] = "GUEST";
    UserPrivilege[UserPrivilege["NORMAL"] = 2] = "NORMAL";
    UserPrivilege[UserPrivilege["ADMINISTRATOR"] = 5] = "ADMINISTRATOR";
    UserPrivilege[UserPrivilege["MASTER"] = 10] = "MASTER";
    UserPrivilege[UserPrivilege["DEV"] = 100] = "DEV";
    UserPrivilege[UserPrivilege["OWNER"] = 999] = "OWNER";
})(UserPrivilege || (UserPrivilege = {}));
export var UserEvents;
(function (UserEvents) {
    UserEvents["LOADED"] = "loaded";
    UserEvents["BOOTED"] = "booted";
    UserEvents["DESTROY"] = "destroy";
})(UserEvents || (UserEvents = {}));
//# sourceMappingURL=User.js.map