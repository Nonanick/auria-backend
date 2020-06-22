import { ResourceCatalog } from "./ResourceCatalog.js";
import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class Connection extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.Connection.name,
            table_name: ResourceCatalog.Connection.table_name,
            title: "@{Auria.Resource.Connection.Title}",
            description: "@{Auria.Resource.Connection.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addColumns(
            // Name
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                column_keys: ["IND"],
                title: "@{Auria.Columns.Connection.Name.Title}",
                description: "@{Auria.Column.Connection.Name.Description}"
            }),
            // Title
            new ColumnSchema({
                name: "Title",
                column_name: "title",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Connection.Title.Title}",
                description: "@{Auria.Column.Connection.Title.Description}"
            }),
            // Host
            new ColumnSchema({
                name: "Host",
                column_name: "host",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Connection.Host.Title}",
                description: "@{Auria.Column.Connection.Host.Description}"
            }),
            // Driver
            new ColumnSchema({
                name: "Driver",
                column_name: "driver",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Connection.Driver.Title}",
                description: "@{Auria.Column.Connection.Driver.Description}"
            }),
            // Database
            new ColumnSchema({
                name: "Database",
                column_name: "database",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Connection.Database.Title}",
                description: "@{Auria.Column.Connection.Database.Description}"
            }),
            // Username
            new ColumnSchema({
                name: "Username",
                column_name: "username",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Connection.Username.Title}",
                description: "@{Auria.Column.Connection.Username.Description}"
            }),
            // Password
            new ColumnSchema({
                name: "Password",
                column_name: "password",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Connection.Password.Title}",
                description: "@{Auria.Column.Connection.Password.Description}",
                readable: false
            })
        )
    }
}