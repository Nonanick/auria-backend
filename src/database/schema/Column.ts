import { ResourceCatalog } from "./ResourceCatalog.js";
import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class Column extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.Column.name,
            table_name: ResourceCatalog.Column.table_name,
            title: "@{Auria.Resource.Column.Title}",
            description: "@{Auria.Resource.Column.Description}",
            is_system_resource: true
        });

        this.addReferences(
            // Reference ID
            new ReferenceSchema(this, {
                name: "Column_Has_Reference_ID",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name: ResourceCatalog.Column.table_name,
                resource_column_name: 'reference_id',

                // Reference info
                reference_table_name: ResourceCatalog.Reference.table_name,
                reference_column_name: "_id",
            }),
            // Resource ID
            new ReferenceSchema(this, {
                name: "Column_Belong_To_Resource_ID",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name: ResourceCatalog.Column.table_name,
                resource_column_name: 'resource_id',
                
                // Reference info
                reference_table_name: ResourceCatalog.Resource.table_name,
                reference_column_name: "_id",
            })
        )
    }
}