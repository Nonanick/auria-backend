import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { EntityClass } from "../../entity/EntityClass.js";
import { ProcedureAuthority } from "../../entity/standart/procedures/ProcedureAuthority.js";
import { SystemEntityCatalog } from "../../database/schema/SystemEntityCatalog.js";
import { EntityProcedureHistory } from "../../entity/system/index.js";

export type RequestForProcedurePermission = {
    user: User;
    entity: EntityClass;
    procedure: string;
    usingAuthority?: ProcedureAuthority;
};

export class ProcedurePermission {

    protected _system: System;

    constructor(system: System) {
        this._system = system;
    }

    public async checkPermissionToExecuteProcedure(
        {
            user,
            entity,
            procedure,
            usingAuthority
        }:
            RequestForProcedurePermission): Promise<boolean> {
        const usersId: string[] = [];
        let rolesId: string[] = [];

        usersId.push(await user.getId());
        rolesId = [...(await (await user.roles()).getRolesId())];

        if (usingAuthority != null) {
            usersId.push(usingAuthority.user);
            if(usingAuthority.role) {
                if(typeof usingAuthority.role === "string") {
                    rolesId.push(usingAuthority.role);
                }
                if(Array.isArray(usingAuthority.role)) {
                    rolesId = [...rolesId, ...usingAuthority.role];
                }
            }
        }

        return this._system.getConnection()
            .select('*')
            .from(SystemEntityCatalog.EntityProcedurePermission.table_name)
            .whereIn("user_id", usersId)
            .whereIn("role_id", rolesId)
            .where("entity_name", entity.name)
            .where("procedure", procedure)
            .then((permissions) => {
                if (permissions.length > 0)
                    return true;

                return false;
            });
    }
}