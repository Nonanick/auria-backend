var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ResourceCatalog } from "../../database/resources/ResourceCatalog.js";
import { Row } from "../../database/Row.js";
export class UserRoleRepository {
    constructor(system, user) {
        this.roles = {};
        this.system = system;
        this.user = user;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.buildUserRolesPromise == null) {
                this.buildUserRolesPromise = Promise.resolve()
                    // # Query for user roles 
                    .then(this.queryForUserRoles.bind(this))
                    // # Build user roles 
                    .then(this.buildUserRolesFromQueryResult.bind(this));
                this.buildUserRolesPromise.catch((err) => {
                    console.error("[SystemUser] Build user roles failed! " + err);
                    console.error("[SystemUser] Could not build roles of user");
                });
            }
            return this.buildUserRolesPromise;
        });
    }
    getOwnRoles() {
        return Object.assign({}, this.roles);
    }
    getRolesId() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.build().then(_ => Array.from(Object.keys(this.roles)));
        });
    }
    queryForUserRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve()
                .then((_) => __awaiter(this, void 0, void 0, function* () {
                const conn = this.system.getConnection();
                const userRoleTable = ResourceCatalog.UserRole.table_name;
                const roleTable = ResourceCatalog.Role.table_name;
                return conn
                    .select(userRoleTable + "._id as hire_id", userRoleTable + ".role_id", userRoleTable + ".description as hire_description", roleTable + ".name", roleTable + ".title as role_title", roleTable + ".description as role_description", roleTable + ".icon")
                    .from(userRoleTable)
                    .leftJoin(roleTable, roleTable + "._id", userRoleTable + ".role_id")
                    .where(userRoleTable + "._id", yield this.user.getId());
            }));
        });
    }
    buildUserRolesFromQueryResult(res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(res)) {
                res.forEach((userRoleInfo) => {
                    let role = new Row(userRoleInfo);
                    this.roles[role.get("role_id")] = role;
                });
                return this;
            }
            else {
                throw new Error("[SystemUser] Failed to find roles to this user");
            }
        });
    }
}
;
//# sourceMappingURL=UserRoleRepository.js.map