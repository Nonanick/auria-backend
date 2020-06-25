import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { ConnectionSchema } from "./schema/ConnectionSchema.js";

export class Connection extends EntityClass {


    constructor() {
        super();
        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    column_keys: ["UNI"],
                    title: "@{Auria.Columns.Connection.Name.Title}",
                    description: "@{Auria.Column.Connection.Name.Description}"
                }
            },
            // Title
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Connection.Title.Title}",
                    description: "@{Auria.Column.Connection.Title.Description}"
                }
            },
            // Host
            {
                schema: {
                    name: "Host",
                    column_name: "host",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Connection.Host.Title}",
                    description: "@{Auria.Column.Connection.Host.Description}"
                }
            },
            // Driver
            {
                schema: {
                    name: "Driver",
                    column_name: "driver",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Connection.Driver.Title}",
                    description: "@{Auria.Column.Connection.Driver.Description}"
                }
            },
            // Database
            {
                schema: {
                    name: "Database",
                    column_name: "database",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Connection.Database.Title}",
                    description: "@{Auria.Column.Connection.Database.Description}"
                }
            },
            // Username
            {
                schema: {
                    name: "Username",
                    column_name: "username",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Connection.Username.Title}",
                    description: "@{Auria.Column.Connection.Username.Description}"
                }
            },
            // Password
            {
                schema: {
                    name: "Password",
                    column_name: "password",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Connection.Password.Title}",
                    description: "@{Auria.Column.Connection.Password.Description}",
                    readable: false
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

    protected buildSchema(): EntitySchema {
        return new ConnectionSchema();
    }


}