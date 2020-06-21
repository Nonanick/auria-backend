var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ResourceCatalog } from "../../../../database/resources/ResourceCatalog.js";
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
    applyFilter(query, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield (yield context.user.roles()).getRolesId();
            switch (context.procedure) {
                default:
                    query.whereIn(context.resource.getRowPrimaryField(), function () {
                        this.table(ResourceCatalog.ResourceActivity.table_name)
                            .select("resource_row_id")
                            .where("resource_id", context.resource.get("_id"))
                            .whereIn("role_id", roles)
                            .orWhereIn("role_authority", roles);
                    });
            }
            return query;
        });
    }
}
//# sourceMappingURL=RoleBasedDataAccessPolicy.js.map