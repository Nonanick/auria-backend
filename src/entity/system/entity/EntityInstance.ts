import { EntityClass } from "../../EntityClass.js";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { EntityInstanceSchema } from "./schema/EntityInstanceSchema.js";

export class EntityInstance extends EntityClass {

    constructor() {
        super();

        this._name = EntityCatalog.Entity.name;

        this.addColumns(
            // ID
            this.buildDefaultIdColumn(),

            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Column.Entity.Name.Title}",
                    description: "@{Auria.Column.Entity.Name.Description}"
                }
            },

            // Table Name
            {
                schema: {
                    name: "Table Name",
                    column_name: "table_name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Column.Entity.TableName.Title}",
                    description: "@{Auria.Column.Entity.TableName.Description}"
                }
            },

            // Connection ID
            {
                schema: {
                    name: "Connection ID",
                    column_name: "connection_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.Entity.ConnectionId.Title}",
                    description: "@{Auria.Column.Entity.ConnectionId.Description}"
                }
            },

            // Title
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Column.Entity.Title.Title}",
                    description: "@{Auria.Column.Entity.Title.Description}"
                },
            },

            //Description 
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "TEXT",
                    nullable: true,
                    title: "@{Auria.Column.Entity.Description.Title}",
                    description: "@{Auria.Column.Entity.Description.Description}"
                },
            },

            //Status
            this.buildDefaultStatusColumn()
        );

    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildSchema() {
        return new EntityInstanceSchema();
    }

    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.Entity.Title}",
            description: "@{Auria.Entity.Description}"
        };
    }

}

