import { ResourceClass } from "../../ResourceClass.js";
import { Resource as ResourceSchema } from '../../../database/schema/Resource.js';
import { ResourceCatalog } from "../../../database/schema/ResourceCatalog.js";

export class ResourceInstance extends ResourceClass {

    constructor() {
        super();

        this._name = ResourceCatalog.Resource.name;

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
                    title: "@{Auria.Column.Resource.Name.Title}",
                    description: "@{Auria.Column.Resource.Name.Description}"
                }
            },

            // Table Name
            {
                schema: {
                    name: "Table Name",
                    column_name: "table_name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Column.Resource.TableName.Title}",
                    description: "@{Auria.Column.Resource.TableName.Description}"
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
                    title: "@{Auria.Column.Resource.ConnectionId.Title}",
                    description: "@{Auria.Column.Resource.ConnectionId.Description}"
                }
            },

            // Title
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Column.Resource.Title.Title}",
                    description: "@{Auria.Column.Resource.Title.Description}"
                },
            },

            //Description 
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "TEXT",
                    nullable: true,
                    title: "@{Auria.Column.Resource.Description.Title}",
                    description: "@{Auria.Column.Resource.Description.Description}"
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
        return new ResourceSchema();
    }

}

