import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema.js";
import { Column } from "../../../database/schema/Column.js";
import { ResourceClass } from "../../ResourceClass.js";
import { ResourceCatalog } from "../../../database/schema/ResourceCatalog.js";

export class ColumnInstance extends ResourceClass {


    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Resource ID
            {
                schema: {
                    name: "Resource Id",
                    column_name: "resource_id",
                    sql_type: "CHAR",
                    length: 22,
                    column_keys: ["IND"],
                    description: "Reference to Auria resource ID",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.ResourceId.Title}"
                }
            },
            // Name 
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Name.Title}",
                    description: "@{Auria.Columns.Column.Name.Description}"
                }
            },
            // Column Name
            {
                schema: {
                    name: "Column Name",
                    column_name: "column_name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.ColumnName.Title}",
                    description: "@{Auria.Columns.Column.ColumnName.Description}"
                }
            },
            // Title 
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Title.Title}",
                    description: "@{Auria.Columns.Column.Title.Description}"
                }
            },
            // Description 
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "TEXT",
                    nullable: true,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Description.Title}",
                    description: "@{Auria.Columns.Column.Description.Description}"
                }
            },
            // SQL Type
            {
                schema: {
                    name: "SQL Type",
                    column_name: "sql_type",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.SQLType.Title}",
                    description: "@{Auria.Columns.Column.SQLType.Description}"
                }
            },
            // Length 
            {
                schema: {
                    name: "Length",
                    column_name: "length",
                    sql_type: "INTEGER",
                    nullable: true,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Length.Title}",
                    description: "@{Auria.Columns.Column.Length.Description}"
                }
            },
            // Data Type
            {
                schema: {
                    name: "Data Type",
                    column_name: "data_type",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.DataType.Title}",
                    description: "@{Auria.Columns.Column.DataType.Description}"
                }
            },
            // Default Value
            {
                schema: {
                    name: "Default Value",
                    column_name: "default_value",
                    sql_type: "VARCHAR",
                    nullable: true,
                    status: 'active',
                    title: "@{Auria.Columns.Column.DefaultValue.Title}",
                    description: "@{Auria.Columns.Column.DefaultValue.Description}"
                }
            },
            // Nullable
            {
                schema: {
                    name: "Nullable",
                    column_name: "nullable",
                    sql_type: "BOOLEAN",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Nullable.Title}",
                    description: "@{Auria.Columns.Column.Nullable.Description}",
                    default_value: true
                }
            },
            // Column Keys
            {
                schema: {
                    name: "Column Keys",
                    column_name: "column_keys",
                    sql_type: "VARCHAR",
                    nullable: true,
                    status: 'active',
                    title: "@{Auria.Columns.Column.ColumnKeys.Title}",
                    description: "@{Auria.Columns.Column.ColumnKeys.Description}",
                    default_value: ""
                }
            },
            // Readable
            {
                schema: {
                    name: "Readable",
                    column_name: "readable",
                    sql_type: "BOOLEAN",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Readable.Title}",
                    description: "@{Auria.Columns.Column.Readable.Description}",
                    default_value: true
                }
            },
            // Readable
            {
                schema: {
                    name: "Required",
                    column_name: "required",
                    sql_type: "BOOLEAN",
                    nullable: false,
                    status: 'active',
                    title: "@{Auria.Columns.Column.Readable.Title}",
                    description: "@{Auria.Columns.Column.Readable.Description}",
                    default_value: false
                }
            },
            // Reference ID
            {
                schema: {
                    name: "Reference ID",
                    column_name: "reference_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    status: 'active',
                    title: "@{Auria.Columns.Column.ReferenceId.Title}",
                    description: "@{Auria.Columns.Column.ReferenceId.Description}",
                }
            },
            // Status
            this.buildDefaultStatusColumn(),
        );
    }

    public getBootDependencies(): string[] {
        return [`BootOfResource(${ResourceCatalog.Resource.name})`];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }
    protected buildSchema(): ResourceSchema {
        return new Column();
    }

}