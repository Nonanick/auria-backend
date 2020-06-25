import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";

export class UserRole extends EntityClass {
    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),
            // User ID
            {
                schema: {
                    name: "User ID",
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                    title: "@{Auria.Columns.UserRole.UserID.Title}",
                    description: "@{Auria.Columns.UserRole.UserID.Description}",
                }
            },
            // Role ID
            {
                schema: {
                    name: "Role ID",
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                    title: "@{Auria.Columns.UserRole.RoleID.Title}",
                    description: "@{Auria.Columns.UserRole.RoleID.Description}",
                }
            },
            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.UserRole.Name.Title}",
                    description: "@{Auria.Columns.UserRole.Name.Description}",
                }
            },
            // Description
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.UserRole.Description.Title}",
                    description: "@{Auria.Columns.UserRole.Description.Description}",
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