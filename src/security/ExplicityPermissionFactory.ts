import { IExplicitPermissionFactory } from "./apiAccess/IExplicitPermissionFactory.js";
import { System } from "../System.js";
import { ApiAccessRule } from "./apiAccess/AccessRule.js";
import { ApiAccessRuleContext } from "./apiAccess/ApiAccessRuleContext.js";
import { IApiAccess } from "../database/schemaInterface/IApiAccess.js";
import { ResourceCatalog } from "../database/schema/ResourceCatalog.js";
import { User, Guest_Username } from "../user/User.js";

export class ExplicitPermissionFactory implements IExplicitPermissionFactory {

    protected system: System;

    constructor(system: System) {
        this.system = system;

    }

    public getAccessRule() {

        return (async (context: ApiAccessRuleContext) => {
            
            if(context.user.username === Guest_Username) {
                return false;
            }
            
            console.log("[Checking user permission]");
            
            let checkApiAccess = this.system.getConnection()
                .select<IApiAccess[]>("_id")
                .from(ResourceCatalog.ApiAccess.table_name)
                .where("user_id", await context.user.getId())
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
        });
    }
}