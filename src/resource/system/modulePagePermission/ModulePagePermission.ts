import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";

export class ModulePagePermission extends ResourceClass {

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
                    title: "@{Auria.Columns.ResourcePagePermission.PageID.Title}",
                    description: "@{Auria.Columns.ResourcePagePermission.PageID.Description}",
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
                    title: "@{Auria.Columns.ResourcePagePermission.UserID.Title}",
                    description: "@{Auria.Columns.ResourcePagePermission.UserID.Description}",
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
                    title: "@{Auria.Columns.ResourcePagePermission.RoleID.Title}",
                    description: "@{Auria.Columns.ResourcePagePermission.RoleID.Description}",
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
    protected buildSchema(): ResourceSchema {
        throw new Error("Method not implemented.");
    }

}