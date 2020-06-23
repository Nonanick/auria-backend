import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";
import { PersistentLoginSchema } from "../../../database/schema/PersistentLogin.js";

export class PersistenLogin extends ResourceClass {

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
                    column_keys: ["IND"],
                    nullable: false,
                    title: "@{Auria.Columns.Session.Username.Title}",
                    description: "@{Auria.Columns.Session.Username.Description}",
                }
            },

            // Token
            {
                schema: {
                    name: "Token",
                    column_name: "token",
                    sql_type: "TEXT",
                    nullable: false,
                    title: "@{Auria.Columns.Session.Token.Title}",
                    description: "@{Auria.Columns.Session.Token.Description}",
                }
            },

            // Referer Identification
            {
                schema: {
                    name: "Referer Identification",
                    column_name: "referer_identification",
                    sql_type: "TEXT",
                    nullable: false,
                    title: "@{Auria.Columns.Session.MachineIp.Title}",
                    description: "@{Auria.Columns.Session.MachineIp.Description}",
                    default_value: "IP_NOT_PROVIDED",
                }
            },

            // Login Time
            {
                schema: {
                    name: "Login Time",
                    column_name: "login_time",
                    sql_type: "DATETIME",
                    nullable: false,
                    title: "@{Auria.Columns.Session.LoginTime.Title}",
                    description: "@{Auria.Columns.Session.LoginTime.Description}",
                }
            },

            // Status
            this.buildDefaultStatusColumn()

        );
    }
    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildSchema(): ResourceSchema {
        return new PersistentLoginSchema();
    }

}