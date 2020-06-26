import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class Connection extends EntityClass {


    constructor() {
        super(EntityCatalog.Connection.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Name
            {
                name: "Name",
                info: {
                    title: "@{Auria.Columns.Connection.Name.Title}",
                    description: "@{Auria.Column.Connection.Name.Description}"
                },
                schema: {
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    column_keys: ["UNI"],
                }
            },
            // Title
            {
                name: "Title",
                info: {
                    title: "@{Auria.Columns.Connection.Title.Title}",
                    description: "@{Auria.Column.Connection.Title.Description}"
                },
                schema: {
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,

                }
            },
            // Host
            {
                name: "Host",
                info: {
                    title: "@{Auria.Columns.Connection.Host.Title}",
                    description: "@{Auria.Column.Connection.Host.Description}"
                },
                schema: {
                    column_name: "host",
                    sql_type: "VARCHAR",
                    nullable: false,
                }
            },
            // Driver
            {
                name: "Driver",
                info: {
                    title: "@{Auria.Columns.Connection.Driver.Title}",
                    description: "@{Auria.Column.Connection.Driver.Description}"
                },
                schema: {
                    column_name: "driver",
                    sql_type: "VARCHAR",
                    nullable: false,
                }
            },
            // Database
            {
                name: "Database",
                info: {
                    title: "@{Auria.Columns.Connection.Database.Title}",
                    description: "@{Auria.Column.Connection.Database.Description}"
                },
                schema: {
                    column_name: "database",
                    sql_type: "VARCHAR",
                    nullable: false,
                }
            },
            // Username
            {
                name: "Username",
                info: {
                    title: "@{Auria.Columns.Connection.Username.Title}",
                    description: "@{Auria.Column.Connection.Username.Description}"
                },
                schema: {
                    column_name: "username",
                    sql_type: "VARCHAR",
                    nullable: false,
                }
            },
            // Password
            {
                name: "Password",
                info: {
                    title: "@{Auria.Columns.Connection.Password.Title}",
                    description: "@{Auria.Column.Connection.Password.Description}",
                },
                schema: {
                    column_name: "password",
                    sql_type: "VARCHAR",
                    nullable: false,
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

    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.Connection.Title}",
            description: "@{Auria.Entity.Connection.Description}",
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.Connection.table_name,
            is_system_entity: true
        });
    }


}