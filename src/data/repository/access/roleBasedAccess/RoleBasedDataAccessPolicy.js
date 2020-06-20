var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class RoleBasedDataAccessPolicy {
    get name() {
        return "RoleBasedDataAccessPolicy";
    }
    ;
    get title() {
        return "@{Auria.DataAccessPolicy.RoleBased.Title}";
    }
    get description() {
        return "@{Auria.DataAccessPolicy.RoleBased.Description}";
    }
    get flags() {
        return [
            {
                name: "ALLOW_PARENT_ROLE",
                title: "@{Auria.DataAccessPolicy.RoleBased.AllowParentTole.Title}",
                description: "@{Auria.DataAccessPolicy.RoleBased.AllowParentRole.Description}"
            },
            {
                name: "ALLOW_SAME_ROLE",
                title: "@{Auria.DataAccessPolicy.RoleBased.AllowSameRole.Title}",
                description: "@{Auria.DataAccessPolicy.RoleBased.AllowSameRole.Description}"
            }
        ];
    }
    getReadPolicy(context, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let includedRoles = this.getIncludedRoles(context.user, options);
            return "";
        });
    }
    getIncludedRoles(user, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options["ALLOW_PARENT_ROLE"] && options["ALLOW_SAME_ROLE"]) {
                return (yield user.roles()).getAccessibleRolesId();
            }
            if (options["ALLOW_PARENT_ROLE"]) {
                let allAcessibleRoles;
            }
        });
    }
    getUpdatePolicy(context, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return "";
        });
    }
    getDeletePolicy(context, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return "";
        });
    }
    onInsert(context, options) {
    }
    on(procedure, context) {
    }
}
//# sourceMappingURL=RoleBasedDataAccessPolicy.js.map