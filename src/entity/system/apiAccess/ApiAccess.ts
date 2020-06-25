import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { ApiAccessSchema } from "./schema/ApiAccessSchema.js";

export class ApiAccess extends EntityClass {

    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // URL
            {
                schema: {
                    name: "URL",
                    column_name: "url",
                    sql_type: "VARCHAR",
                    title: "@{Auria.Columns.ApiAccess.URL.Title}",
                    description: "@{Auria.Columns.ApiAccess.URL.Description}",
                    nullable: false,

                },
            },
            // User ID
            {
                schema: {
                    name: "User ID",
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.ApiAccess.UserID.Title}",
                    description: "@{Auria.Columns.ApiAccess.UserID.Description}",
                    nullable: true,
                    column_keys: ["IND"]
                },
            },
            // Role ID
            {
                schema: {
                    name: "Role ID",
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.ApiAccess.RoleID.Title}",
                    description: "@{Auria.Columns.ApiAccess.RoleID.Description}",
                    nullable: true,
                    column_keys: ["IND"]
                },
            },
            // Description
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "TEXT",
                    title: "@{Auria.Columns.ApiAccess.Description.Title}",
                    description: "@{Auria.Columns.ApiAccess.Description.Description}",
                    nullable: true,
                },
            },

            // Status
            this.buildDefaultStatusColumn()
        )
    }
    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildSchema(): EntitySchema {
        return new ApiAccessSchema();
    }

}