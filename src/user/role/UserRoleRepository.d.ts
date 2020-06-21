import { User } from "../User.js";
import { System } from "../../System.js";
import { Row } from "../../database/Row.js";
export declare class UserRoleRepository {
    protected user: User;
    private system;
    private buildUserRolesPromise;
    protected roles: {
        [roleId: string]: Row<IUserRoleInformation>;
    };
    constructor(system: System, user: User);
    build(): Promise<UserRoleRepository>;
    getRoles(): {
        [roleId: string]: Row<IUserRoleInformation>;
    };
    getRolesId(): Promise<string[]>;
    private queryForUserRoles;
    private buildUserRolesFromQueryResult;
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
}
