var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ResourceCatalog } from "../database/resources/ResourceCatalog.js";
import { Guest_Username } from "../user/User.js";
export class ExplicitPermissionFactory {
    constructor(system) {
        this.system = system;
    }
    getAccessRule() {
        return ((context) => __awaiter(this, void 0, void 0, function* () {
            if (context.user.username === Guest_Username) {
                return false;
            }
            console.log("[Checking user permission]");
            let checkApiAccess = this.system.getConnection()
                .select("_id")
                .from(ResourceCatalog.ApiAccess.table_name)
                .where("user_id", yield context.user.getId())
                //.orWhereIn("role_id", await this.getAccessibleRolesIdFromUser(context.user))
                .then((permissions) => {
                console.log("Permissions: ", permissions);
                return permissions.length > 0;
            });
            checkApiAccess.catch((err) => {
                console.error("Failed to find user permission!", err);
                throw err;
            });
            return checkApiAccess;
        }));
    }
    getAccessibleRolesIdFromUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.keys((yield user.roles()).getAccessibleRoles());
        });
    }
}
//# sourceMappingURL=ExplicityPermissionFactory.js.map