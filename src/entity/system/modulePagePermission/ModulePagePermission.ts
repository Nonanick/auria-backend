import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";

export class ModulePagePermission extends EntityClass {

    constructor() {
        super();

        this.addColumns(
            // ID
            this.buildDefaultIdColumn(),

            // Page ID
            {
                schema: {
                    name: "Page ID",
                    column_name: "page_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityPagePermission.PageID.Title}",
                    description: "@{Auria.Columns.EntityPagePermission.PageID.Description}",
                    nullable: false,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // User ID
            {
                schema: {
                    name: "User ID",
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityPagePermission.UserID.Title}",
                    description: "@{Auria.Columns.EntityPagePermission.UserID.Description}",
                    nullable: true,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // Role ID
            {
                schema: {
                    name: "Role ID",
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityPagePermission.RoleID.Title}",
                    description: "@{Auria.Columns.EntityPagePermission.RoleID.Description}",
                    nullable: true,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // Status
            this.buildDefaultStatusColumn()
        );

    }
    public getBootDependencies(): string[] {
        throw new Error("Method not implemented.");
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    protected buildSchema(): EntitySchema {
        throw new Error("Method not implemented.");
    }

}