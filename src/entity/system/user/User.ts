import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";

export class User extends EntityClass {

    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Username
            {
                schema: {
                    name: "Username",
                    column_name: "username",
                    sql_type: "VARCHAR",
                    title: "@{Auria.Columns.User.Username.Title}",
                    description: "@{Auria.Columns.User.Username.Description}",
                    nullable: false,
                    column_keys: ["UNI"],
                    status: "active"
                }
            },
            // Password
            {
                schema: {
                    name: "Password",
                    column_name: "password",
                    sql_type: "VARCHAR",
                    title: "@{Auria.Columns.User.Password.Title}",
                    description: "@{Auria.Columns.User.Password.Description}",
                    nullable: false,
                    status: "active",
                    readable: false
                }
            },
            // User Privilege
            {
                schema: {
                    name: "User Privilege",
                    column_name: "user_privilege",
                    sql_type: "INT",
                    nullable: false,
                    default_value: 1,
                    title: "@{Auria.Columns.User.UserPrivilege.Title}",
                    description: "@{Auria.Columns.User.UserPrivilege.Description}",
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