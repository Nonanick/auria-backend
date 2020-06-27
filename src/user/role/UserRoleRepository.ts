import { User } from "../User.js";
import { System } from "../../System.js";
import { EntityCatalog } from "../../database/schema/EntityCatalog.js";
import { Row } from "../../database/Row.js";

export class UserRoleRepository {

    protected user: User;

    private system: System;

    private buildUserRolesPromise!: Promise<UserRoleRepository>;

    protected roles: { [roleId: string]: Row<IUserRoleInformation> } = {};

    constructor(system: System, user: User) {
        this.system = system;
        this.user = user;
    }

    public async build() {
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
    }

    public getRoles(): { [roleId: string]: Row<IUserRoleInformation> } {
        return { ...this.roles };

    }

    public async getRolesId() : Promise<string[]> {
        return this.build().then(_ => Array.from(Object.keys(this.roles)));
    }

    private async queryForUserRoles() {
        return Promise.resolve()
            .then(async _ => {
                const conn = this.system.getConnection();
                const userRoleTable = EntityCatalog.UserRole.table_name;
                const roleTable = EntityCatalog.Role.table_name;
                return conn
                    .select<IUserRoleInformation[]>(
                        userRoleTable + "._id as hire_id",
                        userRoleTable + ".role_id",
                        userRoleTable + ".description as hire_description",
                        roleTable + ".name",
                        roleTable + ".title as role_title",
                        roleTable + ".description as role_description",
                        roleTable + ".icon"
                    )
                    .from(userRoleTable)
                    .leftJoin(
                        roleTable,
                        roleTable + "._id",
                        userRoleTable + ".role_id"
                    )
                    .where(userRoleTable + "._id", await this.user.getId());
            });
    }

    private async buildUserRolesFromQueryResult(res: IUserRoleInformation[]) {

        if (Array.isArray(res)) {
            res.forEach((userRoleInfo) => {
                let role = new Row<IUserRoleInformation>(userRoleInfo);
                this.roles[role.get("role_id")] = role;
            });
            return this;
        } else {
            throw new Error("[SystemUser] Failed to find roles to this user");
        }
    }

}


export interface IUserRoleInformation {
    /**
     * Hire information is optional because user can have access
     * to a role via hierarchy without being hired as this role 
     */
    hire_id?: number;
    hire_description?: string;
    /**
     * Role information is required
     */
    role_id: number;
    name: string;
    role_title: string;
    role_description: string;
    icon: string;
};